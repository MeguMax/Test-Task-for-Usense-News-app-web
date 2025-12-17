import React from 'react';

const SkeletonCard: React.FC = () => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="skeleton h-48"></div>
            <div className="p-4 space-y-3">
                <div className="skeleton h-4 w-3/4"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-3 w-full"></div>
                <div className="skeleton h-3 w-5/6"></div>
                <div className="flex gap-2 mt-4">
                    <div className="skeleton h-10 flex-1"></div>
                    <div className="skeleton h-10 w-12"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
