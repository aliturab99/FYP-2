import React from 'react';

const DownTime = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Website Temporarily Down</h1>
                <p className="text-gray-700 mb-4">
                    Our website <span className="font-semibold">Med Magic</span> is currently unavailable due to ongoing maintainance.
                </p>
                <p className="text-gray-700 mb-4">
                    We appreciate your patience
                </p>
            </div>
        </div>
    );
};

export default DownTime;