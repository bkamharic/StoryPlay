import React from 'react';

const StorySkeletonCard: React.FC = () => {
  return (
    <div className="bg-white border-2 border-orange-200 rounded-xl overflow-hidden pulse">
      <div className="h-56 bg-gray-200"></div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-10 bg-gray-200 rounded-lg mt-2"></div>
      </div>
    </div>
  );
};

export default StorySkeletonCard;