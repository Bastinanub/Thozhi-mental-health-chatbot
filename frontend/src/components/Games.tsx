import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';
import Phaser from 'phaser';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Games: React.FC = () => {
  const [activeGame, setActiveGame] = useState<string>('memory');
  const ageGroup = useSelector((state: RootState) => state.auth.ageGroup);

  useEffect(() => {
    if (activeGame === 'memory') {
      initMemoryGame();
    } else if (activeGame === 'breathing') {
      initBreathingGame();
    } else if (activeGame === 'mood') {
      initMoodGame();
    }
  }, [activeGame, ageGroup]);

  const getAgeSpecificContent = () => {
    switch (ageGroup) {
      case 'kids':
        return {
          cards: ['🦁', '🐯', '🐼', '🐨', '🐵', '🦊', '🦁', '🐯', '🐼', '🐨', '🐵', '🦊'],
          colors: {
            primary: 0xff9ecd,
            secondary: 0xffcb77,
            text: 0x2d3748,
          },
          breathingTheme: {
            title: 'Bubble Breathing',
            character: '🦋',
            background: '🌈',
            instructions: [
              'Watch the butterfly float!',
              'Breathe in as it flies up',
              'Hold your breath at the top',
              'Breathe out as it comes down',
              'Press Space to start'
            ]
          },
          moodTheme: {
            title: "My Feelings Garden 🌸",
            background: '🌺',
            prompts: [
              "How does your heart feel?",
              "What makes you smile today?",
              "What makes you feel safe?",
              "Who helps you feel better?"
            ]
          }
        };
      case 'teen':
        return {
          cards: ['🎮', '🎧', '📱', '🎵', '🎨', '🎬', '🎮', '🎧', '📱', '🎵', '🎨', '🎬'],
          colors: {
            primary: 0x9b59b6,
            secondary: 0x3498db,
            text: 0x2d3748,
          },
          breathingTheme: {
            title: 'Chill Zone',
            character: '🌊',
            background: '🌙',
            instructions: [
              'Watch the waves flow',
              'Breathe in with the rise',
              'Hold at the peak',
              'Release with the fall',
              'Press Space to begin'
            ]
          },
          moodTheme: {
            title: "Mood Canvas 🎨",
            background: '🌌',
            prompts: [
              "What's on your mind?",
              "What music matches your mood?",
              "What would help right now?",
              "Who would you like to talk to?"
            ]
          }
        };
      case 'young':
        return {
          cards: ['💻', '📚', '💡', '🎯', '💪', '🌟', '💻', '📚', '💡', '🎯', '💪', '🌟'],
          colors: {
            primary: 0x2ecc71,
            secondary: 0x3498db,
            text: 0x2d3748,
          },
          breathingTheme: {
            title: 'Focus Flow',
            character: '💫',
            background: '🌅',
            instructions: [
              'Follow the energy flow',
              'Inhale as it rises',
              'Hold at the center',
              'Exhale as it descends',
              'Press Space to start'
            ]
          },
          moodTheme: {
            title: "Mindful Moments 🌱",
            background: '🌿',
            prompts: [
              "What's your energy level?",
              "What's your biggest challenge?",
              "What's your current goal?",
              "What would bring balance?"
            ]
          }
        };
      default: // adult
        return {
          cards: ['🧘', '📈', '💭', '🎯', '⚖️', '🌱', '🧘', '📈', '💭', '🎯', '⚖️', '🌱'],
          colors: {
            primary: 0x34495e,
            secondary: 0x2c3e50,
            text: 0x2d3748,
          },
          breathingTheme: {
            title: 'Mindful Breathing',
            character: '✨',
            background: '🌳',
            instructions: [
              'Center your awareness',
              'Inhale mindfully',
              'Hold with presence',
              'Release with intention',
              'Press Space to begin'
            ]
          },
          moodTheme: {
            title: "Emotional Awareness 🌿",
            background: '🍃',
            prompts: [
              "What emotions are present?",
              "What triggered these feelings?",
              "What needs attention?",
              "What would support growth?"
            ]
          }
        };
    }
  };

  const initMemoryGame = () => {
    const content = getAgeSpecificContent();
    
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: 'game-container',
      width: 800,
      height: 600,
      backgroundColor: '#f3f4f6',
      scene: {
        preload: preload,
        create: create,
      },
    };

    const game = new Phaser.Game(config);

    function preload(this: Phaser.Scene) {
      this.cards = content.cards;
    }

    function create(this: Phaser.Scene) {
      // Add gradient background
      const gradient = this.add.graphics();
      gradient.fillGradientStyle(content.colors.primary, content.colors.primary, 
        content.colors.secondary, content.colors.secondary, 1);
      gradient.fillRect(0, 0, 800, 600);

      const cards = this.cards;
      let selectedCards: any[] = [];
      let canClick = true;
      let matches = 0;
      let attempts = 0;

      // Add score display
      const scoreText = this.add.text(400, 50, 'Matches: 0 | Attempts: 0', {
        fontSize: '24px',
        color: '#ffffff',
      }).setOrigin(0.5);

      const shuffledCards = [...cards].sort(() => Math.random() - 0.5);

      for (let i = 0; i < 12; i++) {
        const x = (i % 4) * 120 + 200;
        const y = Math.floor(i / 4) * 120 + 150;

        const cardBg = this.add.rectangle(x + 30, y + 30, 80, 80, 0xffffff, 0.9);
        cardBg.setInteractive();

        const card = this.add.text(x + 30, y + 30, '❓', {
          fontSize: '48px',
        }).setOrigin(0.5);

        cardBg.on('pointerover', () => {
          if (canClick && card.text === '❓') {
            cardBg.setFillStyle(0xeeeeee);
          }
        });

        cardBg.on('pointerout', () => {
          if (card.text === '❓') {
            cardBg.setFillStyle(0xffffff);
          }
        });

        cardBg.on('pointerdown', () => {
          if (!canClick || card.text !== '❓') return;

          card.setText(shuffledCards[i]);
          selectedCards.push({ card, cardBg, index: i });

          if (selectedCards.length === 2) {
            canClick = false;
            attempts++;
            scoreText.setText(`Matches: ${matches} | Attempts: ${attempts}`);

            if (shuffledCards[selectedCards[0].index] === shuffledCards[selectedCards[1].index]) {
              matches++;
              selectedCards.forEach(({ cardBg }) => {
                cardBg.setFillStyle(0x9eebcf);
              });
              selectedCards = [];
              canClick = true;

              if (matches === 6) {
                const stars = Math.max(1, Math.min(3, Math.ceil((12 - attempts) / 4)));
                const starsText = '⭐'.repeat(stars);
                
                this.add.rectangle(400, 300, 400, 200, 0xffffff, 0.9);
                this.add.text(400, 270, 'Congratulations! 🎉', {
                  fontSize: '32px',
                  color: '#2d3748',
                }).setOrigin(0.5);
                this.add.text(400, 330, `${starsText}\nAttempts: ${attempts}`, {
                  fontSize: '24px',
                  color: '#2d3748',
                  align: 'center',
                }).setOrigin(0.5);
              }
            } else {
              setTimeout(() => {
                selectedCards.forEach(({ card, cardBg }) => {
                  card.setText('❓');
                  cardBg.setFillStyle(0xffffff);
                });
                selectedCards = [];
                canClick = true;
              }, 1000);
            }
          }
        });
      }
    }

    return () => {
      game.destroy(true);
    };
  };

  const initBreathingGame = () => {
    const content = getAgeSpecificContent();
    
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: 'game-container',
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scene: {
        create: create,
        update: update
      }
    };

    const game = new Phaser.Game(config);

    function create(this: Phaser.Scene) {
      // Create a gradient background
      const gradient = this.add.graphics();
      gradient.fillGradientStyle(content.colors.primary, content.colors.primary, 
        content.colors.secondary, content.colors.secondary, 1);
      gradient.fillRect(0, 0, 800, 600);

      // Add floating particles in the background
      const particles = this.add.particles(0, 0, {
        quantity: 2,
        frequency: 500,
        lifespan: 3000,
        gravityY: -50,
        scale: { start: 0.6, end: 0 },
        alpha: { start: 0.6, end: 0 },
        blendMode: 'ADD',
        emitZone: {
          type: 'random',
          source: new Phaser.Geom.Rectangle(0, 600, 800, 100)
        }
      });

      // Add the character that will guide breathing
      const character = this.add.text(400, 300, content.breathingTheme.character, {
        fontSize: '64px'
      }).setOrigin(0.5);

      // Add visual path for the character
      const path = new Phaser.Curves.Path(400, 400);
      path.ellipseTo(100, 150, 0, 360, true, 0);

      // Add breathing guide circle
      const guide = this.add.circle(400, 300, 100, 0xffffff, 0.2);
      
      // Add instruction text
      const instructionText = this.add.text(400, 500, 'Press Space to Start', {
        fontSize: '24px',
        color: '#ffffff'
      }).setOrigin(0.5);

      // Add progress indicators
      const progressBg = this.add.graphics();
      progressBg.lineStyle(20, 0x000000, 0.3);
      progressBg.strokeCircle(400, 300, 150);

      const progress = this.add.graphics();

      // Add stats
      const statsText = this.add.text(50, 50, 'Cycles: 0\nStreak: 0', {
        fontSize: '24px',
        color: '#ffffff'
      });

      let isBreathing = false;
      let cycles = 0;
      let streak = 0;
      let phase = 'inhale';
      let progressValue = 0;

      // Handle space key
      this.input.keyboard.on('keydown-SPACE', () => {
        if (!isBreathing) {
          isBreathing = true;
          startBreathingCycle();
        }
      });

      const startBreathingCycle = () => {
        cycles++;
        statsText.setText(`Cycles: ${cycles}\nStreak: ${streak}`);

        // Create the breathing animation timeline
        const timeline = this.tweens.timeline({
          onComplete: () => {
            if (isBreathing) {
              startBreathingCycle();
            }
          }
        });

        // Inhale phase
        timeline.add({
          targets: character,
          y: 200,
          scaleX: 1.5,
          scaleY: 1.5,
          duration: 4000,
          ease: 'Sine.easeInOut',
          onStart: () => {
            phase = 'inhale';
            instructionText.setText('Breathe In...');
          }
        });

        // Hold phase
        timeline.add({
          targets: character,
          y: 200,
          duration: 4000,
          onStart: () => {
            phase = 'hold';
            instructionText.setText('Hold...');
          }
        });

        // Exhale phase
        timeline.add({
          targets: character,
          y: 400,
          scaleX: 1,
          scaleY: 1,
          duration: 4000,
          ease: 'Sine.easeInOut',
          onStart: () => {
            phase = 'exhale';
            instructionText.setText('Breathe Out...');
          }
        });
      };

      this.add.text(400, 100, content.breathingTheme.title, {
        fontSize: '32px',
        color: '#ffffff'
      }).setOrigin(0.5);

      // Store scene variables
      this.character = character;
      this.progress = progress;
      this.progressValue = progressValue;
      this.phase = phase;
    }

    function update(this: Phaser.Scene) {
      // Update progress circle
      this.progressValue += 0.01;
      if (this.progressValue >= 1) this.progressValue = 0;

      this.progress.clear();
      this.progress.lineStyle(20, 0xffffff, 0.8);
      this.progress.beginPath();
      this.progress.arc(400, 300, 150, 
        Phaser.Math.DegToRad(-90), 
        Phaser.Math.DegToRad(-90 + 360 * this.progressValue));
      this.progress.strokePath();

      // Add subtle floating animation to character
      if (this.phase === 'hold') {
        this.character.x = 400 + Math.sin(this.progressValue * Math.PI * 2) * 10;
      }
    }

    return () => {
      game.destroy(true);
    };
  };

  const initMoodGame = () => {
    const content = getAgeSpecificContent();
    
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: 'game-container',
      width: 800,
      height: 600,
      scene: {
        create: create
      }
    };

    const game = new Phaser.Game(config);

    function create(this: Phaser.Scene) {
      // Create a dynamic background
      const gradient = this.add.graphics();
      gradient.fillGradientStyle(content.colors.primary, content.colors.primary, 
        content.colors.secondary, content.colors.secondary, 1);
      gradient.fillRect(0, 0, 800, 600);

      // Add floating elements
      const particles = this.add.particles(0, 0, {
        quantity: 1,
        frequency: 1000,
        lifespan: 5000,
        gravityY: -30,
        scale: { start: 0.8, end: 0 },
        alpha: { start: 0.6, end: 0 },
        blendMode: 'ADD',
        emitZone: {
          type: 'random',
          source: new Phaser.Geom.Rectangle(0, 600, 800, 100)
        }
      });

      // Add title
      this.add.text(400, 50, content.moodTheme.title, {
        fontSize: '32px',
        color: '#ffffff'
      }).setOrigin(0.5);

      // Create mood wheel
      const wheelRadius = 150;
      const centerX = 400;
      const centerY = 300;
      const moodColors = [0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082];
      const moodLabels = ['Angry', 'Excited', 'Happy', 'Peaceful', 'Sad', 'Anxious'];
      const moodIntensities = ['Mild', 'Moderate', 'Intense'];

      // Draw mood wheel segments
      moodColors.forEach((color, index) => {
        const angle = (index / moodColors.length) * Math.PI * 2;
        const nextAngle = ((index + 1) / moodColors.length) * Math.PI * 2;

        const segment = this.add.graphics();
        segment.lineStyle(2, 0xffffff);
        segment.fillStyle(color, 0.3);
        segment.beginPath();
        segment.moveTo(centerX, centerY);
        segment.arc(centerX, centerY, wheelRadius, angle, nextAngle);
        segment.closePath();
        segment.fill();
        segment.stroke();

        // Add mood labels
        const labelX = centerX + Math.cos(angle + Math.PI / moodColors.length) * (wheelRadius + 30);
        const labelY = centerY + Math.sin(angle + Math.PI / moodColors.length) * (wheelRadius + 30);
        
        const label = this.add.text(labelX, labelY, moodLabels[index], {
          fontSize: '18px',
          color: '#ffffff'
        }).setOrigin(0.5);

        // Make segments interactive
        const hitArea = new Phaser.Geom.Polygon([
          centerX, centerY,
          centerX + Math.cos(angle) * wheelRadius,
          centerY + Math.sin(angle) * wheelRadius,
          centerX + Math.cos(nextAngle) * wheelRadius,
          centerY + Math.sin(nextAngle) * wheelRadius
        ]);

        segment.setInteractive(hitArea, Phaser.Geom.Polygon.Contains);

        segment.on('pointerover', () => {
          segment.clear();
          segment.lineStyle(2, 0xffffff);
          segment.fillStyle(color, 0.6);
          segment.beginPath();
          segment.moveTo(centerX, centerY);
          segment.arc(centerX, centerY, wheelRadius, angle, nextAngle);
          segment.closePath();
          segment.fill();
          segment.stroke();
        });

        segment.on('pointerout', () => {
          segment.clear();
          segment.lineStyle(2, 0xffffff);
          segment.fillStyle(color, 0.3);
          segment.beginPath();
          segment.moveTo(centerX, centerY);
          segment.arc(centerX, centerY, wheelRadius, angle, nextAngle);
          segment.closePath();
          segment.fill();
          segment.stroke();
        });

        segment.on('pointerdown', () => {
          // Show intensity selector
          showIntensitySelector(this, moodLabels[index], color);
        });
      });

      // Add prompts
      let currentPromptIndex = 0;
      const promptText = this.add.text(400, 500, content.moodTheme.prompts[0], {
        fontSize: '24px',
        color: '#ffffff',
        align: 'center'
      }).setOrigin(0.5);

      // Add navigation buttons
      const prevButton = this.add.text(300, 550, '◀', {
        fontSize: '32px',
        color: '#ffffff'
      }).setInteractive();

      const nextButton = this.add.text(500, 550, '▶', {
        fontSize: '32px',
        color: '#ffffff'
      }).setInteractive();

      prevButton.on('pointerdown', () => {
        currentPromptIndex = (currentPromptIndex - 1 + content.moodTheme.prompts.length) % content.moodTheme.prompts.length;
        promptText.setText(content.moodTheme.prompts[currentPromptIndex]);
      });

      nextButton.on('pointerdown', () => {
        currentPromptIndex = (currentPromptIndex + 1) % content.moodTheme.prompts.length;
        promptText.setText(content.moodTheme.prompts[currentPromptIndex]);
      });

      // Function to show intensity selector
      function showIntensitySelector(scene: Phaser.Scene, mood: string, color: number) {
        // Clear any existing intensity selector
        scene.children.list
          .filter(child => child.name === 'intensity-element')
          .forEach(child => child.destroy());

        // Create intensity buttons
        moodIntensities.forEach((intensity, index) => {
          const button = scene.add.rectangle(600, 200 + index * 60, 120, 40, color, 0.3);
          button.setName('intensity-element');
          
          const text = scene.add.text(600, 200 + index * 60, intensity, {
            fontSize: '18px',
            color: '#ffffff'
          }).setOrigin(0.5);
          text.setName('intensity-element');

          button.setInteractive();
          
          button.on('pointerover', () => {
            button.setFillStyle(color, 0.6);
          });

          button.on('pointerout', () => {
            button.setFillStyle(color, 0.3);
          });

          button.on('pointerdown', () => {
            // Show selection feedback
            const feedback = scene.add.text(400, 400, 
              `You're feeling ${intensity.toLowerCase()} ${mood.toLowerCase()}`, {
              fontSize: '24px',
              color: '#ffffff',
              backgroundColor: '#000000',
              padding: { x: 16, y: 8 }
            }).setOrigin(0.5);
            feedback.setName('intensity-element');

            // Add suggestion based on selection
            const suggestions = {
              Angry: 'Try taking deep breaths or going for a walk',
              Excited: 'Channel this energy into something creative',
              Happy: 'Share your joy with someone you care about',
              Peaceful: 'Take a moment to appreciate this feeling',
              Sad: 'Be gentle with yourself, this too shall pass',
              Anxious: 'Ground yourself by focusing on your surroundings'
            };

            const suggestion = scene.add.text(400, 450,
              suggestions[mood as keyof typeof suggestions], {
              fontSize: '18px',
              color: '#ffffff',
              backgroundColor: '#000000',
              padding: { x: 16, y: 8 }
            }).setOrigin(0.5);
            suggestion.setName('intensity-element');

            // Clear feedback after delay
            scene.time.delayedCall(5000, () => {
              scene.children.list
                .filter(child => child.name === 'intensity-element')
                .forEach(child => child.destroy());
            });
          });
        });
      }
    }

    return () => {
      game.destroy(true);
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      <div className="flex items-center mb-6">
        <Gamepad2 className="w-8 h-8 text-green-500" />
        <h2 className="text-2xl font-bold ml-3">Games & Activities</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveGame('memory')}
            className={`px-6 py-3 rounded-lg transition-colors ${
              activeGame === 'memory'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Memory Match
          </button>
          <button
            onClick={() => setActiveGame('breathing')}
            className={`px-6 py-3 rounded-lg transition-colors ${
              activeGame === 'breathing'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Breathing Exercise
          </button>
          <button
            onClick={() => setActiveGame('mood')}
            className={`px-6 py-3 rounded-lg transition-colors ${
              activeGame === 'mood'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Mood Tracker
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">
            {activeGame === 'memory' && 'Memory Match Game'}
            {activeGame === 'breathing' && 'Breathing Exercise'}
            {activeGame === 'mood' && 'Mood Tracker'}
          </h3>
          <p className="text-gray-600 mb-4">
            {activeGame === 'memory' && 'Exercise your memory by matching pairs of cards. Find all matching pairs to win!'}
            {activeGame === 'breathing' && 'Follow the character and prompts for a guided breathing exercise. Press Space to begin.'}
            {activeGame === 'mood' && 'Explore and track your emotions using the interactive mood wheel. Select how you feel and get personalized suggestions.'}
          </p>
          <div id="game-container" className="w-full h-[600px] rounded-lg overflow-hidden"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default Games;