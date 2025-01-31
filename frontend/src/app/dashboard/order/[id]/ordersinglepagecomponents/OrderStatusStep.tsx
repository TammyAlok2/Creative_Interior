import React from 'react';

interface OrderStatusStepProps {
  status: string;
  date?: string;
  color?: string;
  isCurrent?: boolean;
}

export default function OrderStatusStep({
  status,
  date,
  color = "gray",
  isCurrent = false,
}: OrderStatusStepProps) {
  const isActive = color === "green" || isCurrent;

  return (
    <div className="flex flex-col max-sm:h-[5rem] items-center w-full sm:w-[25%] relative px-2 sm:px-0">
      {/* Line */}
      <div
        className={`hidden sm:block w-full h-0.5 ${
          isActive ? "bg-green-500" : "bg-gray-300"
        } absolute top-2 left-0`}
      ></div>

      {/* Vertical Line for Mobile */}
      <div
        className={`h-full max-[574px]:z-10 max-[574px]:ml-[.4rem] w-0.5 ${
          isActive ? "bg-green-500" : "bg-gray-300"
        } absolute top-0 left-2 -z-10`}
      ></div>

      {/* Content Container */}
      <div className="flex sm:flex-col items-start sm:items-center w-full">
        {/* Dot */}
        <div
          className={`h-4 w-4 rounded-full ${
            isActive
              ? "bg-green-500 border-green-700"
              : "bg-gray-300 border-gray-400"
          } border-2 z-10 shrink-0`}
        ></div>

        {/* Text Container */}
        <div className="flex flex-col sm:items-center ml-4 sm:ml-0">
          {/* Status */}
          <p
            className={`font-semibold text-center text-sm mt-0 sm:mt-1 ${
              isActive ? "text-green-600" : "text-gray-600"
            }`}
          >
            {status}
          </p>

          {/* Date */}
          {date && (
            <p className="text-gray-500 text-xs sm:text-center">
              {date}
            </p>
          )}

          {/* Current Status Highlight */}
          {isCurrent && (
            <p className="text-xs text-blue-600 font-medium mt-0.5 sm:mt-1">
              In Progress
            </p>
          )}
        </div>
      </div>
    </div>
  );
}