import { AgeGroup } from '../types/user';

interface Response {
  text: string;
  followUp?: string[];
}

const getAgeSpecificResponse = (input: string, ageGroup: AgeGroup): Response => {
  const normalizedInput = input.toLowerCase();

  // Common responses across all age groups
  if (normalizedInput.includes('hello') || normalizedInput.includes('hi')) {
    return {
      text: getGreeting(ageGroup),
      followUp: ['How are you feeling today?', 'Would you like to talk about something specific?'],
    };
  }

  // Age-specific responses
  switch (ageGroup) {
    case 'kids':
      return getKidsResponse(normalizedInput);
    case 'teen':
      return getTeenResponse(normalizedInput);
    case 'young':
      return getYoungResponse(normalizedInput);
    case 'adult':
      return getAdultResponse(normalizedInput);
    default:
      return { text: "I'm here to listen and help. What's on your mind?" };
  }
};

const getGreeting = (ageGroup: AgeGroup): string => {
  switch (ageGroup) {
    case 'kids':
      return "Hi there, friend! 🌈 I'm so happy to see you!";
    case 'teen':
      return "Hey! 🌟 Great to see you here!";
    case 'young':
      return "Hello! 💫 Welcome back!";
    case 'adult':
      return "Welcome! 🌱 How can I assist you today?";
    default:
      return "Hello! How can I help you today?";
  }
};

const getKidsResponse = (input: string): Response => {
  if (input.includes('sad')) {
    return {
      text: "It's okay to feel sad sometimes! 🌈 Would you like to play a fun game or draw something together?",
      followUp: ['We could play a happy game!', 'Or maybe tell me about your favorite toy?'],
    };
  }
  if (input.includes('happy')) {
    return {
      text: "That's wonderful! 🎈 Your happiness makes me happy too! Want to share what made you happy?",
    };
  }
  return {
    text: "Let's have a fun time together! 🌟 Would you like to play, talk, or maybe draw something?",
  };
};

const getTeenResponse = (input: string): Response => {
  if (input.includes('stress') || input.includes('worried')) {
    return {
      text: "I hear you. School and life can be pretty intense sometimes. 🌟 Let's break this down together and find ways to make it more manageable.",
      followUp: ['What specifically is causing you stress?', 'Would you like to learn some quick stress-relief techniques?'],
    };
  }
  if (input.includes('friends') || input.includes('social')) {
    return {
      text: "Friendships and social situations can be complicated. 🤝 Remember, it's okay to be yourself and set boundaries.",
    };
  }
  return {
    text: "I'm here to listen and support you. What's on your mind? 🌟",
  };
};

const getYoungResponse = (input: string): Response => {
  if (input.includes('career') || input.includes('job')) {
    return {
      text: "Career decisions can feel overwhelming. 💫 Let's explore your interests and options together.",
      followUp: ['What kind of work interests you?', 'Would you like to discuss career planning strategies?'],
    };
  }
  if (input.includes('anxiety') || input.includes('pressure')) {
    return {
      text: "I understand the pressure you're feeling. Let's work on some practical strategies to manage this anxiety.",
    };
  }
  return {
    text: "I'm here to support your journey. What would you like to discuss? 💫",
  };
};

const getAdultResponse = (input: string): Response => {
  if (input.includes('work') || input.includes('balance')) {
    return {
      text: "Finding work-life balance can be challenging. 🌱 Let's explore ways to create more harmony in your daily routine.",
      followUp: ['How do you currently manage your time?', 'Would you like to learn about effective stress management techniques?'],
    };
  }
  if (input.includes('relationship') || input.includes('family')) {
    return {
      text: "Relationships require care and attention. Let's discuss what's on your mind and find constructive approaches.",
    };
  }
  return {
    text: "I'm here to provide support and guidance. What specific aspects would you like to focus on? 🌱",
  };
};

export const generateResponse = async (
  input: string,
  ageGroup: AgeGroup
): Promise<Response> => {
  try {
    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    return {
      text: data.reply,
    };
  } catch (error) {
    console.error("Error fetching from backend:", error);
    return {
      text: "Oops! I couldn't reach Menti right now. Please try again shortly.",
    };
  }
};
