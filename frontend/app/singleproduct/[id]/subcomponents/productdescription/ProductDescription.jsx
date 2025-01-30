
// components/ProductCard.js
export default function ProductDescription({ title, description, imageSrc }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden xl:flex xl:gap-[2rem]">
      <div className="">
        <h2 className="text-xl font-light mb-2">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
}
