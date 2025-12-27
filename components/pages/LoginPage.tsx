
import React, { useState } from 'react';
import { useUserProgress } from '../../context/UserProgressContext';
import { BookOpen } from 'lucide-react';

const LoginPage: React.FC = () => {
    const [name, setName] = useState('');
    const { login } = useUserProgress();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            login(name.trim());
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
            <div className="w-full max-w-md mx-auto text-center bg-white/90 border-2 border-orange-200 rounded-2xl shadow-xl p-8 fade-in">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-lg mx-auto mb-6 transform rotate-[-15deg]">
                    <BookOpen className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2 font-amharic-pretty">እንኳን ደህና መጡ!</h1>
                <p className="text-xl text-gray-700 mb-6">Welcome to StoryPlay!</p>
                <p className="text-gray-600 mb-8">Please log in to continue.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your first name"
                        className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg text-lg text-center focus:border-orange-400 focus:outline-none"
                        required
                        aria-label="First Name"
                    />
                    <button
                        type="submit"
                        className="w-full button-gradient hover:button-gradient text-white shadow-lg py-3 text-lg rounded-xl font-bold transition-transform transform hover:scale-105"
                    >
                        Login & Start Learning
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
