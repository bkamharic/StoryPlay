import { Character } from '../types';

export const characters: Character[] = [
  {
    id: 'abebe',
    name: 'Abebe',
    description: 'A curious and friendly young boy who loves adventures with his dog.',
    spriteUrls: {
      idle: 'char-abebe-idle',
      wave: 'char-abebe-wave',
    },
    age: '6-8',
    personality: 'Adventurous, Kind',
  },
  {
    id: 'jonny',
    name: 'Jonny',
    description: "Abebe's loyal and playful dog.",
    spriteUrls: {
      idle: 'char-jonny-idle',
      talk: 'char-jonny-talk', // Barking
    },
    age: '3 (dog years)',
    personality: 'Loyal, Playful',
  },
  {
    id: 'almaz',
    name: 'Almaz',
    description: 'A young girl who loves going to the market to buy fresh fruits and vegetables.',
    spriteUrls: {
      idle: 'char-almaz-idle',
    },
    age: '7-9',
    personality: 'Cheerful, Helpful',
  },
  {
    id: 'lia',
    name: 'Lia',
    description: 'A smart and determined girl who loves solving mysteries.',
    spriteUrls: {
      idle: 'char-lia-idle',
      walk: 'char-lia-walk',
    },
    age: '8-10',
    personality: 'Intelligent, Brave',
  },
  {
    id: 'bona',
    name: 'Bona',
    description: "Lia's clever and trusty dog, great at finding lost things.",
    spriteUrls: {
      idle: 'char-bona-idle',
    },
    age: '5 (dog years)',
    personality: 'Clever, Trustworthy',
  },
  {
    id: 'dawit',
    name: 'Dawit',
    description: 'A friendly boy who loves to play in the park.',
    spriteUrls: {
      idle: 'char-dawit-idle',
    },
    age: '7-9',
    personality: 'Friendly, Energetic',
  },
  {
    id: 'desta',
    name: 'Desta',
    description: 'A cheerful girl who enjoys making new friends.',
    spriteUrls: {
      idle: 'char-desta-idle',
    },
    age: '7-9',
    personality: 'Cheerful, Kind',
  },
  {
    id: 'marta',
    name: 'Marta',
    description: 'A helpful young girl who loves to assist her mother in the kitchen.',
    spriteUrls: {
      idle: 'char-marta-idle',
    },
    age: '7-9',
    personality: 'Helpful, Kind',
  },
  {
    id: 'abel',
    name: 'Abel',
    description: 'A young boy getting ready for bed.',
    spriteUrls: {
      idle: 'char-abel-idle',
    },
    age: '5-7',
    personality: 'Calm, Sweet',
  },
];
