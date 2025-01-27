const reviews = [
  {
    id: 1,
    name: "Sudhanshu Sekhar Singh",
    rating: 5,
    date: "9 Jan, 2025",
    title: "Beautiful Roller Blinds",
    text: "I am in complete awe with how the overall look turned out. While designing the perfect home decor, I came across Magicedecor and I am so grateful that I did! They have a vast collection of wallpaper and blind designs.",
    image: "/images/SingleProduct/Review/Review1.png",
    verified: true,
  },
  {
    id: 2,
    name: "Manikarnika Ranawat",
    rating: 4,
    date: "30 Dec, 2024",
    title: "3D Magic",
    text: "I purchased a 3D effect wallpaper from Magicedecor, and it exceeded my expectations! The design is stunning, adding depth and elegance to my room.",
    image: "/images/SingleProduct/Review/Review2.png",
    verified: true,
  },
  {
    id: 3,
    name: "Arjun Chandravanshi",
    rating: 5,
    date: "12 Dec, 2024",
    title: "Quality Wallpaper Material",
    text: "The wallpaper quality is excellent, and the installation service was smooth and hassle-free. Highly recommended!",
    image: "/images/SingleProduct/Review/Review1.png",
    verified: true,
  },
  {
    id: 4,
    name: "Sudhanshu Sekhar Singh",
    rating: 5,
    date: "9 Jan, 2025",
    title: "Beautiful Roller Blinds",
    text: "I am in complete awe with how the overall look turned out. While designing the perfect home decor, I came across Magicedecor and I am so grateful that I did! They have a vast collection of wallpaper and blind designs.",
    image: "/images/SingleProduct/Review/Review1.png",
    verified: true,
  },
  {
    id: 5,
    name: "Manikarnika Ranawat",
    rating: 4,
    date: "30 Dec, 2024",
    title: "3D Magic",
    text: "I purchased a 3D effect wallpaper from Magicedecor, and it exceeded my expectations! The design is stunning, adding depth and elegance to my room.",
    image: "/images/SingleProduct/Review/Review2.png",
    verified: true,
  },
  {
    id: 6,
    name: "Arjun Chandravanshi",
    rating: 5,
    date: "12 Dec, 2024",
    title: "Quality Wallpaper Material",
    text: "The wallpaper quality is excellent, and the installation service was smooth and hassle-free. Highly recommended!",
    image: "/images/SingleProduct/Review/Review3.png",
    verified: true,
  },
];

export default function UserReviews() {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100">
      {/* Left Section (Sticky) */}
      <div className="md:w-1/3 w-full md:sticky top-[5em] h-fit bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <p className="text-4xl font-bold text-orange-500">4.9</p>
        <p className="text-yellow-500 text-lg flex">{"★★★★★"}</p>
        <p className="text-gray-500 text-sm">Based on 84 reviews</p>
        <h3 className="mt-6 font-semibold">Review this product</h3>
        <p className="text-gray-500 text-sm mb-4">
          Share your thoughts with other customers
        </p>
        <button className="border border-gray-400 px-4 py-2 rounded-lg hover:bg-gray-100">
          Write a Review
        </button>
      </div>

      {/* Right Section (Scrollable) */}
      <div className="md:w-2/3 w-full flex flex-col gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row gap-4">
            <img
              src={review.image}
              alt={review.title}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div>
              <h4 className="font-bold">{review.name}</h4>
              <p className="text-yellow-500">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </p>
              <p className="text-gray-500 text-sm">
                {review.verified && "✔ Verified Purchase;"} Reviewed on {review.date}
              </p>
              <h5 className="mt-2 font-semibold">{review.title}</h5>
              <p className="text-gray-600 text-sm">{review.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
