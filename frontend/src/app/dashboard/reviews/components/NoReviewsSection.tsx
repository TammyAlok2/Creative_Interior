import Image from "next/image";
import React from "react";

interface NoReviewsSectionProps {
  data: {
    title: string;
    description: string;
    imageSrc: string;
  };
}

const NoReviewsSection: React.FC<NoReviewsSectionProps> = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-white border rounded-lg mb-6">
      <Image width={250} height={200} src={data.imageSrc} alt="No Reviews" className="mb-4" />
      <h2 className="text-lg font-semibold text-gray-700">{data.title}</h2>
      <p className="text-sm text-gray-500">{data.description}</p>
    </div>
  );
};

export default NoReviewsSection;
