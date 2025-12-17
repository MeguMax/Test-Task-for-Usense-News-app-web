import React from 'react';

interface LoadingSpinnerProps {
    fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ fullScreen = false }) => {
    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center z-50">
                <div className="relative w-20 h-20">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="mt-4 text-gray-600 font-medium">Loading news...</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-[400px]">
            <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
