
import React, { useState, useMemo } from 'react';
import { assets } from '../../data/assets';
import { Asset, AssetType } from '../../types';
import { Download, CheckCircle, FileText, Lock, Copy, List, ExternalLink, HardDriveUpload } from 'lucide-react';

const AssetManifestPage: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [authError, setAuthError] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordInput === 'admin') {
            setIsAuthenticated(true);
            setAuthError('');
        } else {
            setAuthError('Incorrect password');
        }
    };

    // WordPress Upload List Helper - Expanded to catch all crucial story/flashcard assets
    const recentUploads = useMemo(() => {
        return assets.filter(a => 
            // Story Illustrations (ill- prefix)
            (a.id.includes('ill-') && a.type === AssetType.Image) || 
            // Story Covers (cover- prefix)
            (a.id.startsWith('cover-') && a.type === AssetType.Image) ||
            // Character Sprites (char- prefix)
            (a.id.startsWith('char-') && a.type === AssetType.Image) ||
            // Flashcard Images (img- prefix)
            a.id.startsWith('img-') || 
            // All Flashcard/Vocabulary Audio (aud- prefix)
            a.id.startsWith('aud-') ||
            a.type === AssetType.AudioMp3
        ).sort((a, b) => a.filename?.localeCompare(b.filename || '') || 0);
    }, []);

    const copyUploadList = () => {
        const text = recentUploads.map(a => `[ ] ${a.filename} -> ${a.url}`).join('\n');
        navigator.clipboard.writeText(text).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] fade-in px-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-orange-200 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><Lock className="w-8 h-8 text-red-500" /></div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin Access Required</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="Enter password" title="Hint: admin" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none" />
                        {authError && <p className="text-red-500 text-sm font-bold">{authError}</p>}
                        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow-md">Unlock</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">Asset Manifest</h1>
            
            {/* WordPress Upload Assistant */}
            <div className="bg-white border-2 border-green-200 rounded-xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <HardDriveUpload className="text-green-600" /> 
                            WordPress Upload Assistant
                        </h2>
                        <p className="text-sm text-gray-600">Complete checklist of all {recentUploads.length} files required for a full deployment.</p>
                    </div>
                    <button onClick={copyUploadList} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                        {copySuccess ? <CheckCircle size={18} /> : <Copy size={18} />}
                        {copySuccess ? 'Copied Checklist' : 'Copy Checklist'}
                    </button>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 max-h-[600px] overflow-y-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b text-gray-400 font-bold uppercase text-[10px] sticky top-0 bg-gray-50 z-10">
                                <th className="pb-2">Filename</th>
                                <th className="pb-2">Destination Path</th>
                                <th className="pb-2">Status</th>
                            </tr>
                        </thead>
                        <tbody className="font-mono">
                            {recentUploads.map((a, i) => (
                                <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-white transition-colors">
                                    <td className="py-2 text-green-700 font-bold">{a.filename}</td>
                                    <td className="py-2 text-gray-500 truncate max-w-md">{a.url}</td>
                                    <td className="py-2"><span className="text-[10px] bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded font-bold uppercase">Pending</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-blue-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-blue-800"><List /> Resource Overview</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between p-3 bg-blue-50 rounded-lg"><span>Total Assets Registered:</span><span className="font-bold">{assets.length}</span></div>
                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg"><span>Image Files:</span><span className="font-bold">{assets.filter(a => a.type === AssetType.Image).length}</span></div>
                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg"><span>Audio Files:</span><span className="font-bold">{assets.filter(a => a.type === AssetType.AudioMp3).length}</span></div>
                    </div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold mb-4 text-orange-800 flex items-center gap-2"><FileText /> Full Manifest Export</h3>
                    <div className="space-y-4">
                        <button className="w-full flex items-center justify-between bg-white p-4 rounded-xl border border-orange-200 hover:shadow-md transition-all">
                            <span className="font-bold text-gray-700">Full Audio Manifest (CSV)</span>
                            <Download size={20} className="text-orange-500" />
                        </button>
                        <button className="w-full flex items-center justify-between bg-white p-4 rounded-xl border border-orange-200 hover:shadow-md transition-all">
                            <span className="font-bold text-gray-700">Image Generation List (CSV)</span>
                            <Download size={20} className="text-orange-500" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssetManifestPage;
