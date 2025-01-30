  
  const CategoryScores = ({ categories }) => (
    <div className="flex justify-around mt-6">
      {Object.entries(categories).map(([key, value]) => (
        <div key={key} className="text-center">
          <div className="text-lg font-semibold">{value.toFixed(1)}</div>
          <div className="text-sm text-gray-500">{key.replace(/([A-Z])/g, " $1")}</div>
        </div>
      ))}
    </div>
  );
  
  export default CategoryScores;
  