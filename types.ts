
export enum Level {
  Beginner4_6 = 'Beginner4_6',
  Emerging7_9 = 'Emerging7_9',
  FluentPrep10_12 = 'FluentPrep10_12',
}

export enum UsageLevel {
  K = 'K',
  Primary = 'Primary',
  Upper = 'Upper',
}

export enum Category {
  Greetings = 'Greetings',
  Family = 'Family',
  Animals = 'Animals',
  Colors = 'Colors',
  Numbers = 'Numbers',
  Food = 'Food',
  Body = 'Body',
  Actions = 'Actions',
  Nature = 'Nature',
  School = 'School',
  Emotions = 'Emotions',
  Clothing = 'Clothing',
  Other = 'Other',
}

export enum ChallengeType {
  ListenRepeat = 'ListenRepeat',
  FillBlank = 'FillBlank',
  Reorder = 'Reorder',
  Compose = 'Compose',
}

export enum PublishStatus {
  Draft = 'Draft',
  Published = 'Published',
  Archived = 'Archived',
}

export enum DifficultyHint {
  Simple = 'Simple',
  Moderate = 'Moderate',
  Advanced = 'Advanced',
}

export enum AssetType {
  Image = 'Image',
  AudioMp3 = 'AudioMp3',
  Svg = 'Svg',
  Pdf = 'Pdf',
}

export interface Asset {
  id: string;
  type: AssetType;
  url: string;
  tags?: string[];
  filename?: string;
  sampleRate?: number;
  voiceCredit?: string;
  description?: string;
  usageContext?: string;
  amharicTitle?: string;
  englishTitle?: string;
}

export interface ImageSource {
  iconName?: string;
  openMojiCode?: string;
  emojiUnicode?: string;
  imageId?: string;
  iconUrl?: string;
}

export interface Flashcard extends ImageSource {
  id: string;
  amharic: string;
  english: string;
  category: Category;
  level: Level;
  audioId?: string;
  usageLevel?: UsageLevel;
  exampleSentence?: string;
  sampleRate?: number;
  voiceCredit?: string;
  geez?: string;
}

export interface TapVocabulary {
  word: string;
  definition: string;
  audioUrl: string;
}

export interface ExtensionPanel {
  type: 'comprehension';
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Panel {
  panelId: string;
  order: number;
  textVariants: { [key in Level]: string };
  textEnglishVariants: { [key in Level]: string };
  audioVariants?: { [key in Level]?: string }; 
  illustrationId?: string;
  targetWords?: string[];
  tapVocabulary?: TapVocabulary[];
  difficultyHint?: DifficultyHint;
  challengeType?: ChallengeType;
  scaffoldHints?: string[];
  challengeAnswer?: string;
  recordSlotId?: string;
}

export interface Character {
  id: string;
  name: string;
  description?: string;
  spriteUrls?: {
    idle?: string;
    wave?: string;
    walk?: string;
    talk?: string;
  };
  defaultVoice?: string;
  age?: string;
  personality?: string;
}

export interface Scene {
  sceneId: string;
  order: number;
  backgroundImageId: string;
  characters?: string[];
  panels: Panel[];
}

export interface Story {
  id: string;
  level: Level;
  title: string;
  targetWords: string[];
  scenes: Scene[];
  coverImageId: string;
  icon?: string;
  grammarFocus?: string;
  estimatedTime?: { [key in Level]: number };
  publishStatus?: PublishStatus;
  extensionPanels?: ExtensionPanel[];
}

export enum Rarity {
  Common = 'Common',
  Rare = 'Rare',
  Epic = 'Epic',
  Legendary = 'Legendary',
}

export type BadgeCriteriaType = 'firstRecording' | 'storyComplete' | 'wordMastery' | 'streakDays' | 'perfectScore' | 'helpOthers';

export interface BadgeCriteria {
  type: BadgeCriteriaType;
  threshold?: number;
  description: string;
  storyId?: string;
  category?: Category;
}

export interface Badge {
  id: string;
  name: string;
  iconId: string;
  description: string;
  criteria: BadgeCriteria;
  levelTier: Level | 'All';
  rarity: Rarity;
}


export interface Recording {
  id: string;
  userId: string;
  storyId: string;
  panelId: string;
  audioUrl: string;
  score: number;
  reviewedByParent: boolean;
  approved: boolean;
  attempts: number;
  duration?: number;
  notes: string;
  created_date: string;
}

export interface EarnedBadge {
  badgeId: string;
  earnedDate: string;
}

export interface UserProgress {
  userId: string;
  displayName: string;
  avatarId?: string;
  currentLevel: Level;
  storiesCompleted: string[];
  wordsMasteredByLevel: {
    [Level.Beginner4_6]: string[];
    [Level.Emerging7_9]: string[];
    [Level.FluentPrep10_12]: string[];
  };
  badges: EarnedBadge[];
  adaptiveScore: number;
  streakDays: number;
  lastActiveDate: string;
  totalRecordings: number;
  averageScore: number;
  parentUserId: string;
}

export enum AssessmentType {
  LevelPlacement = "LevelPlacement",
  StoryCompletion = "StoryCompletion",
  VocabularyCheck = "VocabularyCheck",
  ReadingFluency = "ReadingFluency",
}

export interface Assessment {
  id: string;
  userId: string;
  type: AssessmentType;
  score: number;
  recommendedNextLevel?: Level;
  details: Record<string, any>;
  timestamp: string;
}

export interface ForumPost {
  id: string;
  author: {
    name: string;
    avatarId: string;
  };
  timestamp: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  tag: 'Question' | 'Tip' | 'Success Story';
}

export interface ParentResource {
  id: string;
  title: string;
  url: string;
  icon: ImageSource;
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
}

export interface Printable {
  id: string;
  title: string;
  description: string;
  thumbnailAssetId: string;
  fileAssetId: string;
  tags: Array<'Coloring' | 'Worksheet' | 'Craft'>;
}

export interface Avatar {
  id: string;
  name: string;
  assetId?: string;
  openMojiCode?: string;
  iconUrl?: string;
  color: string;
}
