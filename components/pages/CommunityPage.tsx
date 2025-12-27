
import React, { useState } from 'react';
import { Users, MessageSquare, ThumbsUp, Star, BookText, Calendar, Link, Megaphone, Pencil } from 'lucide-react';
import { forumPosts as initialForumPosts, parentResources, communityEvents } from '../../data/community';
import { ForumPost } from '../../types';
import DynamicIcon from '../ui/DynamicIcon';
import { getAsset } from '../../data/assets';
import NewPostModal from '../community/NewPostModal';
import { useUserProgress } from '../../context/UserProgressContext';


const tagStyles: { [key in ForumPost['tag']]: string } = {
  'Question': 'tag-question',
  'Tip': 'tag-tip',
  'Success Story': 'tag-success',
};

const CommunityPage: React.FC = () => {
    const [posts, setPosts] = useState<ForumPost[]>(initialForumPosts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { progress } = useUserProgress();

    const handleNewPostSubmit = (postData: Omit<ForumPost, 'id' | 'author' | 'timestamp' | 'likes' | 'comments'>) => {
        const newPost: ForumPost = {
            id: `post-${Date.now()}`,
            author: {
                name: progress.displayName,
                avatarId: progress.avatarId || 'avatar-monkey', // fallback avatar
            },
            timestamp: 'Just now',
            likes: 0,
            comments: 0,
            ...postData,
        };
        setPosts(prevPosts => [newPost, ...prevPosts]);
        setIsModalOpen(false);
    };


    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="fade-in">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-amharic-pretty">
                            የማህበረሰብ ማዕከል
                        </h1>
                        <p className="text-lg text-gray-600">Community Hub</p>
                    </div>
                </div>
                <p className="text-gray-600">
                    Connect with other learners, share tips, and grow together.
                </p>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Forum Feed */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                           <Megaphone className="text-blue-600" />
                           Discussion Forum
                        </h2>
                        <button onClick={() => setIsModalOpen(true)} className="button-gradient hover:button-gradient text-white shadow-md px-4 py-2 rounded-lg font-medium flex items-center text-sm">
                            <Pencil size={16} className="mr-2"/>
                            New Post
                        </button>
                    </div>

                    {posts.map((post, index) => {
                        const avatarAsset = getAsset(post.author.avatarId);
                        return (
                        <div key={post.id} className="bg-white/80 backdrop-blur-sm border-2 border-orange-200 rounded-xl p-6 fade-in" style={{ animationDelay: `${index * 0.1}s`}}>
                            <div className="flex items-start gap-4">
                                <img src={avatarAsset?.url} alt={post.author.name} className="w-10 h-10 rounded-full bg-gray-200" />
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                        <div>
                                            <p className="font-bold text-gray-800">{post.author.name}</p>
                                            <p className="text-xs text-gray-500">{post.timestamp}</p>
                                        </div>
                                        <span className={`border text-xs font-semibold px-2 py-1 rounded-md ${tagStyles[post.tag]}`}>{post.tag}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                                    <p className="text-gray-700 text-sm mb-4">{post.content}</p>
                                    <div className="flex items-center gap-4 text-gray-500">
                                        <button className="flex items-center gap-1 hover:text-red-500 text-red-400"><ThumbsUp size={16} /> {post.likes}</button>
                                        <button className="flex items-center gap-1 hover:text-blue-500 text-blue-400"><MessageSquare size={16} /> {post.comments}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )})}
                </div>
                
                {/* Side Column */}
                <div className="space-y-8">
                     {/* Learner Spotlight */}
                    <div className="bg-white/80 backdrop-blur-sm border-2 border-yellow-300 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                           <Star className="text-yellow-500" />
                           Learner Spotlight
                        </h3>
                        <div className="flex items-center gap-4">
                            <img src={getAsset('avatar-liya-g')?.url} alt="Liya" className="w-14 h-14 rounded-full border-2 border-yellow-400 bg-gray-200" />
                            <div>
                                <p className="font-bold">Liya G.</p>
                                <p className="text-sm text-gray-600">Earned the "Author Legend" badge this week!</p>
                            </div>
                        </div>
                    </div>

                    {/* Parent Resources */}
                    <div className="bg-white/80 backdrop-blur-sm border-2 border-green-200 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                           <BookText className="text-green-600" />
                           Parent Resources
                        </h3>
                        <ul className="space-y-3">
                           {parentResources.map(res => (
                               <li key={res.id}>
                                   <a href={res.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-green-700 group">
                                       <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                           <DynamicIcon source={res.icon} className="w-5 h-5 text-green-600" />
                                       </div>
                                       <span className="text-sm font-medium group-hover:underline">{res.title}</span>
                                   </a>
                               </li>
                           ))}
                        </ul>
                    </div>

                    {/* Upcoming Events */}
                    <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                           <Calendar className="text-purple-600" />
                           Upcoming Events
                        </h3>
                        <div className="space-y-4">
                          {communityEvents.map(evt => (
                            <div key={evt.id}>
                                <p className="font-semibold text-gray-800">{evt.title}</p>
                                <p className="text-sm text-gray-600">{evt.date} @ {evt.time}</p>
                                <p className="text-xs text-gray-500 mt-1">{evt.description}</p>
                            </div>
                          ))}
                        </div>
                    </div>
                </div>
            </div>
            <NewPostModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleNewPostSubmit}
            />
        </div>
    );
};

export default CommunityPage;