
import { ForumPost, ParentResource, CommunityEvent } from '../types';

export const forumPosts: ForumPost[] = [
  {
    id: 'post-1',
    author: { name: 'Abebe T.', avatarId: 'avatar-abebe-t' },
    timestamp: '2 hours ago',
    title: 'How do you practice plural nouns?',
    content: 'My child is having a bit of trouble with plural nouns in Amharic. Any fun games or activities you recommend? We loved the "Market Visit" story!',
    likes: 12,
    comments: 4,
    tag: 'Question',
  },
  {
    id: 'post-2',
    author: { name: 'Hana G.', avatarId: 'avatar-hana-g' },
    timestamp: '1 day ago',
    title: 'Success! My daughter read her first story!',
    content: 'Just wanted to share that my 6-year-old, Liya, just finished "Abebe\'s Dog" all by herself. She was so proud! This app has been a game-changer for us. Thank you!',
    likes: 35,
    comments: 8,
    tag: 'Success Story',
  },
  {
    id: 'post-3',
    author: { name: 'Samuel B.', avatarId: 'avatar-samuel-b' },
    timestamp: '3 days ago',
    title: 'Tip: Using flashcards before bedtime story',
    content: 'We\'ve found that doing 5-10 flashcards related to a story right before we read it helps with comprehension and confidence. It gets my son excited to hear the words he just learned!',
    likes: 22,
    comments: 6,
    tag: 'Tip',
  },
];

export const parentResources: ParentResource[] = [
  {
    id: 'res-1',
    title: 'Benefits of Bilingualism in Early Childhood',
    url: '#',
    icon: { iconName: 'Globe' },
  },
  {
    id: 'res-2',
    title: 'Fun Amharic Songs for Kids (YouTube Playlist)',
    url: '#',
    icon: { iconName: 'Music' },
  },
  {
    id: 'res-3',
    title: 'Printable Amharic Alphabet (Fidel) Chart',
    url: '#',
    icon: { iconName: 'Languages' },
  },
];

export const communityEvents: CommunityEvent[] = [
    {
        id: 'evt-1',
        title: 'Virtual Story Time: "The Lost Secret"',
        date: 'Saturday, Nov 18',
        time: '10:00 AM PST',
        description: 'Join us for a live reading of one of our advanced stories!'
    },
    {
        id: 'evt-2',
        title: 'Parent Q&A with Dr. Alemayehu',
        date: 'Wednesday, Nov 22',
        time: '4:00 PM PST',
        description: 'Ask questions about language acquisition and learning strategies.'
    }
];

// Data for Printables Page Community Showcase
export const printableOfTheWeekId = 'p-3'; // Animal Names Matching Game

export const storyPlayStar = {
  name: 'Liya G.',
  avatarId: 'avatar-monkey',
  achievement: 'Completed 5 stories and mastered 20 new words this week!',
};

export interface GallerySubmission {
  id: string;
  imageAssetId: string;
  studentName: string;
  printableId: string;
}

export const gallerySubmissions: GallerySubmission[] = [
  { id: 'gal-1', imageAssetId: 'gallery-abebe-colored', studentName: 'Daniel', printableId: 'p-1' },
  { id: 'gal-2', imageAssetId: 'gallery-animals-cutout', studentName: 'Hana', printableId: 'p-3' },
  { id: 'gal-3', imageAssetId: 'gallery-numbers-practice', studentName: 'Samuel', printableId: 'p-2' },
  { id: 'gal-4', imageAssetId: 'gallery-abebe-creative', studentName: 'Liya', printableId: 'p-1' },
  { id: 'gal-5', imageAssetId: 'gallery-numbers-colored', studentName: 'Yosef', printableId: 'p-2' },
  { id: 'gal-6', imageAssetId: 'gallery-animals-family', studentName: 'Meron', printableId: 'p-3' },
];
