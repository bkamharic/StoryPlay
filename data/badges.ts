
import { Badge, Level, Rarity, Category } from '../types';

export const badges: Badge[] = [
  {
    id: 'badge-1',
    name: 'Word Collector',
    description: 'Awarded for learning new Amharic vocabulary.',
    iconId: 'BookCopy', // Lucide Icon
    levelTier: Level.Beginner4_6,
    rarity: Rarity.Common,
    criteria: {
      type: 'wordMastery',
      threshold: 10,
      description: 'Master 10 new words.'
    },
  },
  {
    id: 'badge-2',
    name: 'Story Starter',
    description: 'Awarded for completing stories and beginning your reading journey.',
    iconId: 'Rocket', // Lucide Icon
    levelTier: Level.Beginner4_6,
    rarity: Rarity.Common,
    criteria: {
      type: 'storyComplete',
      threshold: 1,
      description: 'Complete your first story.'
    },
  },
  {
    id: 'badge-3',
    name: 'Animal Friend',
    description: 'Awarded for learning about Amharic animal names.',
    iconId: 'PawPrint', // Lucide Icon
    levelTier: Level.Emerging7_9,
    rarity: Rarity.Rare,
    criteria: {
      type: 'wordMastery',
      category: Category.Animals,
      threshold: 9, // Corresponds to the 9 animal flashcards
      description: 'Master all 9 animal flashcards.'
    },
  },
  {
    id: 'badge-4',
    name: 'Confident Speaker',
    description: 'Awarded for practicing your pronunciation skills.',
    iconId: 'Mic', // Lucide Icon
    levelTier: Level.FluentPrep10_12,
    rarity: Rarity.Epic,
    criteria: {
      type: 'firstRecording', // The type is generic, the threshold defines the amount
      threshold: 5,
      description: 'Submit 5 voice recordings.'
    },
  },
  {
    id: 'badge-5',
    name: 'Market Master',
    description: 'Awarded for exploring stories about daily life in Ethiopia.',
    iconId: 'ShoppingBasket', // Lucide Icon
    levelTier: Level.Emerging7_9,
    rarity: Rarity.Rare,
    criteria: {
      type: 'storyComplete',
      storyId: 'story-2-emerging',
      threshold: 1, 
      description: 'Complete the "Almaz Went to the Market" story.'
    },
  },
  {
    id: 'badge-6',
    name: 'Color Champion',
    description: 'Awarded for mastering the colors of the world in Amharic.',
    iconId: 'Palette', // Lucide Icon
    levelTier: Level.Beginner4_6,
    rarity: Rarity.Common,
    criteria: {
      type: 'wordMastery',
      category: Category.Colors,
      threshold: 8, // Corresponds to the 8 color flashcards
      description: 'Master all the color flashcards.'
    },
  },
  {
    id: 'badge-7',
    name: 'Number Ninja',
    description: 'Awarded for beginning your journey with Amharic numbers.',
    iconId: 'Calculator', // Lucide Icon
    levelTier: Level.Beginner4_6,
    rarity: Rarity.Common,
    criteria: {
      type: 'wordMastery',
      category: Category.Numbers,
      threshold: 10, // For mastering 1-10
      description: 'Master the numbers one through ten.'
    },
  },
  {
    id: 'badge-8',
    name: 'Author Legend',
    description: 'Awarded for tackling the most advanced stories.',
    iconId: 'Medal', // Lucide Icon
    levelTier: Level.FluentPrep10_12,
    rarity: Rarity.Legendary,
    criteria: {
      type: 'storyComplete',
      threshold: 3, 
      description: 'Complete 3 stories.'
    },
  },
];
