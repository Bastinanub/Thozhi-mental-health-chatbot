import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const Articles: React.FC = () => {
  const articles = [
    {
      title: "Understanding Stress and Its Impact",
      content: `
## Understanding Stress and Its Impact

Stress is your body's natural response to challenges or demands. While some stress can be motivating, chronic stress can affect both your physical and mental health.

### Common Signs of Stress:
- Headaches
- Difficulty sleeping
- Changes in appetite
- Mood changes
- Difficulty concentrating

### Healthy Ways to Cope:
1. Practice deep breathing
2. Exercise regularly
3. Maintain a consistent sleep schedule
4. Talk to friends or family
5. Try mindfulness meditation

Remember: It's okay to seek professional help when stress becomes overwhelming.
      `,
    },
    {
      title: "Building Healthy Relationships",
      content: `
## Building Healthy Relationships

Strong relationships are fundamental to our mental well-being. They provide support, understanding, and a sense of belonging.

### Key Elements of Healthy Relationships:
- Clear communication
- Mutual respect
- Trust and honesty
- Healthy boundaries
- Support for each other's growth

### Tips for Nurturing Relationships:
1. Practice active listening
2. Express gratitude regularly
3. Spend quality time together
4. Respect personal space
5. Address conflicts constructively

Remember: Every relationship is unique and requires effort from all parties involved.
      `,
    },
    {
      title: "Mindfulness for Beginners",
      content: `
## Mindfulness for Beginners

Mindfulness is the practice of being present and fully engaged with whatever we're doing at the moment, free from distraction or judgment.

### Benefits of Mindfulness:
- Reduced stress and anxiety
- Improved focus and concentration
- Better emotional regulation
- Enhanced self-awareness
- Better sleep quality

### Simple Mindfulness Exercises:
1. Focus on your breath for 5 minutes
2. Practice mindful walking
3. Observe your surroundings using all senses
4. Do one thing at a time, fully focused
5. Practice gratitude meditation

Remember: Start small and be patient with yourself as you develop this skill.
      `,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      <div className="flex items-center mb-6">
        <BookOpen className="w-8 h-8 text-yellow-500" />
        <h2 className="text-2xl font-bold ml-3">Articles & Journals</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        {articles.map((article, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-xl"
          >
            <article className="prose prose-lg max-w-none">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </article>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Articles;