import { useCategoryStore } from '@/stores/categoryStore';
import React, { useEffect } from 'react';

const BrandFilter: React.FC = () => {
  const {category,allCategory}= useCategoryStore()

  const fetchCategory = async()=>{
    await allCategory()
  }

  useEffect(()=>{
    fetchCategory()
  },[])

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold">Category</h2>
      
      <div className="space-y-2">
        {category?.map((brand,index) => (
          <label key={index} className="flex items-center">
            <input type="checkbox" className="mr-2" />
            {brand.name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default BrandFilter;
