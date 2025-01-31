import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';

interface SummaryHeaderProps {
    toggleSummary: () => void;
    OrderDetailsData: any;
}

const SummaryHeader: React.FC<SummaryHeaderProps> = ({ toggleSummary ,OrderDetailsData }) => {
    return (
        <div className=''>
            {/* <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold opacity-[0.9]">Order Summary</h2>
                <button onClick={toggleSummary} className="text-lg font-bold">
                    <IoCloseOutline className='text-3xl' />
                </button>
            </div> */}
            <p className='mt-3 text-xs font-semibold text-gray-medium opacity-[.7]'>{OrderDetailsData.length} items in your cart</p>
        </div>
    );
};

export default SummaryHeader;
