type ReviewImagesProps = {
    images: string[];
  };
  
  const ReviewImages = ({ images }: ReviewImagesProps) => (
    <div className="flex mt-6 space-x-2 overflow-x-auto">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Review ${index}`}
          className="w-24 h-24 object-cover rounded-lg"
        />
      ))}
    </div>
  );
  
  export default ReviewImages;
  