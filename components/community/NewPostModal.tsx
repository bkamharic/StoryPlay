
import React, { useState } from 'react';
import { X, Send, MessageSquare, Lightbulb, Star } from 'lucide-react';
import { ForumPost } from '../../types';

interface NewPostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (post: Omit<ForumPost, 'id' | 'author' | 'timestamp' | 'likes' | 'comments'>) => void;
}

const NewPostModal: React.FC<NewPostModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTag] = useState<'Question' | 'Tip' | 'Success Story'>('Question');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!title.trim() || !content.trim()) {
            setError('Please fill in both title and content.');
            return;
        }
        setError('');
        onSubmit({ title, content, tag });
        // Reset form for next time
        setTitle('');
        setContent('');
        setTag('Question');
    };

    const tagOptions: { value: ForumPost['tag']; label: string; icon: React.ElementType }[] = [
        { value: 'Question', label: 'Question', icon: MessageSquare },
        { value: 'Tip', label: 'Tip', icon: Lightbulb },
        { value: 'Success Story', label: 'Success Story', icon: Star },
    ];
    
    const tagStyles = {
        'Question': 'bg-blue-100 text-blue-800 border-blue-300',
        'Tip': 'bg-green-100 text-green-800 border-green-300',
        'Success Story': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 fade-in">
            <div className="w-full max-w-lg mx-auto bg-white/90 border-2 border-orange-200 rounded-2xl shadow-xl p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-600 p-1 rounded-full transition-colors">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Create a New Post</h2>
                
                <div className="space-y-4">
                    <div>
                        <label htmlFor="post-title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            id="post-title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter a clear and concise title"
                            className="w-full px-4 py-2 border-2 border-orange-200 rounded-lg focus:border-orange-400 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="post-content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                        <textarea
                            id="post-content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Share your thoughts, ask a question, or tell us about your success!"
                            rows={5}
                            className="w-full px-4 py-2 border-2 border-orange-200 rounded-lg focus:border-orange-400 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tag</label>
                        <div className="flex flex-wrap gap-2">
                             {tagOptions.map(opt => (
                                <button
                                    key={opt.value}
                                    onClick={() => setTag(opt.value)}
                                    className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg border-2 transition-all ${
                                        tag === opt.value ? `${tagStyles[opt.value]} ring-2 ring-offset-1 ring-orange-500` : 'bg-white border-gray-300 hover:bg-gray-100'
                                    }`}
                                >
                                    <opt.icon size={16} />
                                    {opt.label}
                                </button>
                             ))}
                        </div>
                    </div>
                    
                    {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                    <button
                        onClick={handleSubmit}
                        className="w-full button-gradient hover:button-gradient text-white shadow-lg py-3 text-lg rounded-xl font-bold transition-transform transform hover:scale-105"
                    >
                        <Send size={20} className="inline-block mr-2" />
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewPostModal;
