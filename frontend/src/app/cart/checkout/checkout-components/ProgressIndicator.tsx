import React from 'react';

export default function ProgressIndicator() {
    return (
        <div className="flex items-center space-x-4 mb-6 max-[468px]:hidden">
            <div className="flex items-center space-x-1">
                <span className="text-sm font-semibold text-gray-dark">Address</span>
                <div className="w-4 h-4 bg-orange-orange500 rounded-full"></div>
            </div>
            <div className="w-20 border-t border-gray-mediumLight"></div>
            <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-gray-thin rounded-full"></div>
                <span className="text-sm font-semibold text-gray-mediumLight">Payment Details</span>
            </div>
        </div>
    );
}
