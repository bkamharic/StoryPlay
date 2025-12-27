
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Printer, Download, UploadCloud, Paperclip, X, AlertTriangle, Star, Camera, Award } from 'lucide-react';
import { printables } from '../../data/printables';
import { getAsset } from '../../data/assets';
import DynamicIcon from '../ui/DynamicIcon';
import { gallerySubmissions, storyPlayStar, printableOfTheWeekId } from '../../data/community';

interface UploadedFile {
    name: string;
    size: string;
    type: string;
}

const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const PrintablesPage: React.FC = () => {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [uploadError, setUploadError] = useState<string | null>(null);

    // State for the math challenge
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [isChallengeSolved, setIsChallengeSolved] = useState(false);

    const printableWeek = useMemo(() => printables.find(p => p.id === printableOfTheWeekId), []);
    
    // Generate the math problem on component mount
    useEffect(() => {
        const n1 = Math.floor(Math.random() * 10) + 1; 
        const n2 = Math.floor(Math.random() * 10) + 1; 
        setNum1(n1);
        setNum2(n2);
    }, []);

    const correctAnswer = num1 + num2;

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const answer = e.target.value;
        setUserAnswer(answer);
        if (parseInt(answer, 10) === correctAnswer) {
            setIsChallengeSolved(true);
        } else {
            setIsChallengeSolved(false);
        }
    };

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setUploadError(null);
        if (event.target.files) {
            const files = Array.from(event.target.files) as File[];
            const newValidFiles: UploadedFile[] = [];

            for (const file of files) {
                if (file.size > MAX_FILE_SIZE_BYTES) {
                    setUploadError(`File "${file.name}" is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`);
                    event.target.value = ''; 
                    return;
                }
                if (!ALLOWED_FILE_TYPES.includes(file.type)) {
                    setUploadError(`File type for "${file.name}" is not supported. Please upload images (JPG, PNG, GIF) or PDFs.`);
                    event.target.value = '';
                    return;
                }
                newValidFiles.push({
                    name: file.name,
                    size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                    type: file.type,
                });
            }

            setUploadedFiles(prev => [...prev, ...newValidFiles]);
            event.target.value = '';
        }
    }, []);
    
    const removeFile = (fileName: string) => {
        setUploadedFiles(prev => prev.filter(f => f.name !== fileName));
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="fade-in">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-2">
                        <Printer className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-amharic-pretty drop-shadow-sm">
                            ተግባራት እና የሚታተሙ
                        </h1>
                        <p className="text-lg text-gray-600 font-bold">Activities & Printables</p>
                    </div>
                </div>
                <p className="text-gray-600 max-w-2xl">
                    Extend your learning with fun, hands-on activities. Download, print, and share your creations!
                </p>
            </div>
            
            {/* Downloadables Section */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Download className="text-cyan-600" />
                    Printable Gallery
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {printables.map((printable, index) => {
                        const thumbnailAsset = getAsset(printable.thumbnailAssetId);
                        const fileAsset = getAsset(printable.fileAssetId);
                        return (
                             <div key={printable.id} className="bg-white hover:shadow-2xl transition-all border-4 border-orange-100 rounded-[2rem] overflow-hidden group h-full flex flex-col fade-in shadow-lg" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="aspect-[3/2] bg-amber-50 flex items-center justify-center overflow-hidden p-4">
                                     <div className="w-full h-full bg-white rounded-2xl shadow-inner border-2 border-orange-50 flex items-center justify-center overflow-hidden">
                                        {thumbnailAsset ? (
                                            <DynamicIcon source={{ imageId: thumbnailAsset.id }} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        ) : (
                                            <Printer className="w-12 h-12 text-orange-200" />
                                        )}
                                     </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow bg-white">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {printable.tags.map(tag => (
                                            <span key={tag} className="bg-cyan-100 text-cyan-800 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-cyan-200">{tag}</span>
                                        ))}
                                    </div>
                                    <h3 className="font-bold text-xl text-gray-800 mb-2 leading-tight">{printable.title}</h3>
                                    <p className="text-sm text-gray-600 mb-6 flex-grow">{printable.description}</p>
                                    
                                    {fileAsset ? (
                                        <a 
                                            href={fileAsset.url} 
                                            download={fileAsset.filename} 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-xl px-4 py-3 rounded-2xl font-bold flex items-center justify-center transition-all border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 mt-auto"
                                        >
                                            <Download className="w-5 h-5 mr-2" />
                                            Download PDF
                                        </a>
                                    ) : (
                                        <div className="bg-red-50 p-3 rounded-xl border border-red-100 text-red-500 text-xs font-bold text-center mt-auto">
                                            Resource file not found
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Community Showcase Section */}
            <div className="bg-white/80 backdrop-blur-sm border-4 border-yellow-200 rounded-[2.5rem] p-8 shadow-xl">
                 <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Camera className="text-yellow-600" />
                    Student Success Gallery
                </h2>
                <div className="grid lg:grid-cols-3 gap-10">
                    <div className="space-y-8">
                        {/* Printable of the Week */}
                        {printableWeek && (
                             <div className="bg-white border-4 border-orange-100 rounded-3xl overflow-hidden shadow-lg transform -rotate-1">
                                <div className="p-3 bg-gradient-to-r from-orange-400 to-red-500 text-white text-center font-black uppercase tracking-tighter italic text-sm">
                                    Printable of the Week
                                </div>
                                <div className="aspect-[3/2] bg-gray-50 flex items-center justify-center overflow-hidden">
                                    <DynamicIcon source={{ imageId: printableWeek.thumbnailAssetId }} className="w-full h-full object-cover"/>
                                </div>
                                <div className="p-5">
                                     <h3 className="font-bold text-gray-800 mb-1">{printableWeek.title}</h3>
                                     <p className="text-xs text-gray-500 mb-4 line-clamp-2">{printableWeek.description}</p>
                                     <a href={getAsset(printableWeek.fileAssetId)?.url} download={getAsset(printableWeek.fileAssetId)?.filename} className="w-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg py-2.5 rounded-xl font-bold flex items-center justify-center transition-all text-sm border-b-4 border-orange-700 active:border-b-0 active:translate-y-1">
                                        <Download size={16} className="mr-2" />
                                        Get Template
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* StoryPlay Star */}
                        <div className="bg-purple-50 border-4 border-purple-100 rounded-3xl p-6 shadow-md relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                            <h3 className="font-black text-purple-800 mb-4 flex items-center gap-2 uppercase tracking-wide text-sm italic">
                                <Award className="text-purple-600" /> StoryPlay Star
                            </h3>
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-16 h-16 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-white flex-shrink-0">
                                    <img src={getAsset(storyPlayStar.avatarId)?.url} alt={storyPlayStar.name} className="w-full h-full object-contain"/>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 text-lg">{storyPlayStar.name}</p>
                                    <p className="text-xs text-purple-700 font-medium italic leading-tight">"{storyPlayStar.achievement}"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="flex justify-between items-end mb-6">
                            <h3 className="font-bold text-xl text-gray-800">Community Showcase</h3>
                            <span className="text-sm font-bold text-gray-400">Featured Artists</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {gallerySubmissions.map((submission, index) => {
                                const printable = printables.find(p => p.id === submission.printableId);
                                return (
                                <div key={submission.id} className="bg-white p-2 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all gallery-item relative group aspect-square">
                                    <div className="w-full h-full rounded-xl overflow-hidden bg-gray-50">
                                        <img src={getAsset(submission.imageAssetId)?.url} alt={`Artwork by ${submission.studentName}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                    <div className="overlay absolute inset-2 rounded-xl flex items-end p-4 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                                        <div className="text-white">
                                            <p className="font-black text-sm">{submission.studentName}</p>
                                            <p className="text-[10px] opacity-90 font-medium truncate max-w-[120px]">{printable?.title}</p>
                                        </div>
                                    </div>
                                </div>
                            )})}
                        </div>
                    </div>
                </div>
            </div>

            {/* Upload Section */}
             <div className="bg-white border-4 border-green-100 rounded-[3rem] overflow-hidden shadow-xl mb-10">
                 <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div>
                            <h2 className="text-3xl font-black text-gray-800 mb-2 flex items-center gap-3">
                                <UploadCloud className="text-green-500 w-10 h-10" />
                                Show & Tell!
                            </h2>
                            <p className="text-gray-600 font-medium">Upload your finished work to be featured in our student gallery.</p>
                        </div>
                        
                        <div className={`transition-all duration-500 p-4 rounded-3xl border-2 ${isChallengeSolved ? 'bg-green-50 border-green-400' : 'bg-orange-50 border-orange-200'}`}>
                            <p className="text-xs font-black uppercase tracking-widest mb-2 text-center text-gray-500">Security Check</p>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-inner border-2 border-gray-100">
                                    <span className="text-xl font-black text-gray-700">{num1}</span>
                                    <span className="text-xl font-black text-orange-500">+</span>
                                    <span className="text-xl font-black text-gray-700">{num2}</span>
                                    <span className="text-xl font-black text-gray-400">=</span>
                                    <input
                                        type="number"
                                        value={userAnswer}
                                        onChange={handleAnswerChange}
                                        placeholder="?"
                                        className={`w-16 text-center text-xl font-black border-2 rounded-xl p-1 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all ${
                                            isChallengeSolved ? 'border-green-500 text-green-600' : 'border-orange-300 text-orange-600'
                                        }`}
                                    />
                                </div>
                                {isChallengeSolved && <div className="bg-green-500 text-white p-2 rounded-full shadow-lg animate-bounce"><Star size={20} fill="currentColor"/></div>}
                            </div>
                        </div>
                    </div>
                    
                    <div className={`relative rounded-[2rem] border-4 border-dashed p-10 text-center transition-all ${isChallengeSolved ? 'bg-green-50/50 border-green-300' : 'bg-gray-50 border-gray-200 opacity-60 grayscale'}`}>
                        <label htmlFor="file-upload" className={`cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-2xl px-10 py-5 rounded-[2rem] font-black text-xl inline-flex items-center transition-all transform hover:scale-105 active:scale-95 border-b-8 border-green-800 active:border-b-0 ${!isChallengeSolved ? 'pointer-events-none' : ''}`}>
                            <UploadCloud size={32} className="mr-3"/>
                            Choose Your Art
                        </label>
                        <input id="file-upload" type="file" multiple onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg, image/gif, application/pdf" disabled={!isChallengeSolved} />
                        <p className="text-sm text-gray-500 mt-6 font-bold">Allowed: Images & PDFs (Up to 5MB)</p>
                        {!isChallengeSolved && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-50/20 backdrop-blur-[1px] rounded-[1.8rem]">
                                <p className="bg-white/90 px-6 py-2 rounded-full shadow-md font-bold text-orange-600 flex items-center gap-2">
                                    <AlertTriangle size={16}/> Solve math above to unlock
                                </p>
                            </div>
                        )}
                    </div>

                    {uploadError && (
                        <div className="mt-6 p-4 bg-red-100 border-2 border-red-200 text-red-700 rounded-2xl text-sm font-bold flex items-center justify-center gap-3 animate-pulse">
                            <AlertTriangle size={24} />
                            {uploadError}
                        </div>
                    )}

                    {uploadedFiles.length > 0 && (
                        <div className="mt-10 fade-in">
                            <h3 className="font-black text-gray-800 text-lg mb-4 uppercase tracking-tight">Your Portfolio Ready to Send:</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {uploadedFiles.map((file, index) => (
                                    <div key={index} className="bg-white border-2 border-green-100 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-4 min-w-0">
                                            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0 text-green-600">
                                                <Paperclip size={24} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-sm text-gray-800 truncate">{file.name}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase">{file.size} · {file.type.split('/')[1]}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => removeFile(file.name)} className="bg-red-50 hover:bg-red-100 text-red-500 p-2 rounded-xl transition-colors">
                                            <X size={20} strokeWidth={3} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-[2rem] shadow-xl transition-all transform hover:scale-[1.02] border-b-8 border-blue-900 active:border-b-0 active:translate-y-2 uppercase tracking-widest">
                                Submit to Teacher 🚀
                            </button>
                        </div>
                    )}
                 </div>
             </div>
        </div>
    );
};

export default PrintablesPage;
