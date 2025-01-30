
export const products = [
  // Product 1
  {
    id: 1,
    ribbon: { text: 'Trending', color: 'bg-red-500' },
    image: '/images/ProductsImage/Bottol.jpg',
    ArrayImages: ['/images/ProductsImage/Bottol.jpg', '/images/ProductsImage/BrushWithPacket.jpg', '/images/ProductsImage/CloseDiary.jpg', '/images/ProductsImage/Comb.jpg'],
    name: 'Eco-Friendly Bamboo Bottle',
    description: 'A stylish, eco-friendly bamboo water bottle to stay hydrated sustainably.',
    edition: '',
    price: 500,
    discount: 20,
    rating: 4.8,
    category: 'Trending',
    specifications: {
      general: [
        { label: "Sales Package", value: "1 Bamboo Bottle" },
        { label: "Model Name", value: "Eco-Friendly Bamboo Bottle" },
        { label: "Part Number", value: "BB123" },
        { label: "Color", value: "Natural Bamboo" },
        { label: "Material", value: "Bamboo" },
        { label: "Capacity", value: "500ml" },
        { label: "Dimensions", value: "7 x 7 x 20 cm" },
        { label: "Weight", value: "200g" },
        { label: "Type", value: "Water Bottle" }
      ]
    }
  },
  
  // Product 2
  {
    id: 2,
    ribbon: { text: 'Bestselling', color: 'bg-purple-500' },
    image: '/images/ProductsImage/BrushWithPacket.jpg',
    ArrayImages: ['/images/ProductsImage/BrushWithPacket.jpg', '/images/ProductsImage/Bottol.jpg', '/images/ProductsImage/CloseDiary.jpg', '/images/ProductsImage/Comb.jpg'],
    name: 'Bamboo Toothbrush',
    description: 'A biodegradable bamboo toothbrush with a protective cover for hygiene.',
    edition: '',
    price: 100,
    discount: 30,
    rating: 4.8,
    category: 'Hospitality',
    specifications: {
      general: [
        { label: "Sales Package", value: "1 Bamboo Toothbrush" },
        { label: "Model Name", value: "Eco Bamboo Toothbrush" },
        { label: "Part Number", value: "BT123" },
        { label: "Color", value: "Natural Bamboo" },
        { label: "Material", value: "Bamboo" },
        { label: "Dimensions", value: "18 x 2 x 1 cm" },
        { label: "Weight", value: "15g" },
        { label: "Type", value: "Toothbrush" }
      ]
    }
  },

  // Product 3
  {
    id: 3,
    ribbon: { text: "Teacher's Pick", color: 'bg-yellow-500' },
    image: '/images/ProductsImage/CloseDiary.jpg',
    ArrayImages: ['/images/ProductsImage/CloseDiary.jpg', '/images/ProductsImage/Comb.jpg', '/images/ProductsImage/Comb.jpg', '/images/ProductsImage/BrushWithStand.jpg'],
    name: 'Bamboo Diary',
    description: 'A beautifully crafted bamboo diary for your notes and ideas.',
    edition: '',
    price: 200,
    discount: 25,
    rating: 4.8,
    category: 'Hospitality',
    specifications: {
      general: [
        { label: "Sales Package", value: "1 Bamboo Diary" },
        { label: "Model Name", value: "Eco Bamboo Diary" },
        { label: "Part Number", value: "BD123" },
        { label: "Color", value: "Brown" },
        { label: "Material", value: "Bamboo" },
        { label: "Dimensions", value: "20 x 14 x 2 cm" },
        { label: "Weight", value: "150g" },
        { label: "Type", value: "Diary" }
      ]
    }
  },

  // Product 4
  {
    id: 4,
    ribbon: { text: 'Limited Offer', color: 'bg-red-500' },
    image: '/images/ProductsImage/Comb.jpg',
    ArrayImages: ['/images/ProductsImage/Comb.jpg', '/images/ProductsImage/Comb.jpg', '/images/ProductsImage/BrushWithPacket.jpg', '/images/ProductsImage/Bottol.jpg'],
    name: 'Bamboo Hair Comb',
    description: 'A gentle bamboo comb for healthy hair and reduced static.',
    edition: '',
    price: 199,
    discount: 24,
    rating: 4.9,
    category: 'Household',
    specifications: {
      general: [
        { label: "Sales Package", value: "1 Bamboo Hair Comb" },
        { label: "Model Name", value: "Eco Bamboo Hair Comb" },
        { label: "Part Number", value: "BHC123" },
        { label: "Color", value: "Natural Bamboo" },
        { label: "Material", value: "Bamboo" },
        { label: "Dimensions", value: "16 x 4 x 1 cm" },
        { label: "Weight", value: "30g" },
        { label: "Type", value: "Hair Comb" }
      ]
    }
  },

  // Product 5
  {
    id: 5,
    ribbon: { text: 'Limited Offer', color: 'bg-red-500' },
    image: '/images/ProductsImage/Comb.jpg',
    ArrayImages: ['/images/ProductsImage/Comb.jpg', '/images/ProductsImage/Comb.jpg', '/images/ProductsImage/BrushWithStand.jpg', '/images/ProductsImage/Bottol.jpg'],
    name: 'Bamboo Hair Comb',
    description: 'A gentle bamboo comb for healthy hair and reduced static.',
    edition: '',
    price: 199,
    discount: 24,
    rating: 4.9,
    category: 'Decorative',
    specifications: {
      general: [
        { label: "Sales Package", value: "1 Bamboo Hair Comb" },
        { label: "Model Name", value: "Eco Bamboo Hair Comb" },
        { label: "Part Number", value: "BHC123" },
        { label: "Color", value: "Natural Bamboo" },
        { label: "Material", value: "Bamboo" },
        { label: "Dimensions", value: "16 x 4 x 1 cm" },
        { label: "Weight", value: "30g" },
        { label: "Type", value: "Hair Comb" }
      ]
    }
  },

  // Product 6
  {
    id: 6,
    ribbon: { text: 'New Arrival', color: 'bg-blue-500' },
    image: '/images/ProductsImage/BrushWithStand.jpg',
    ArrayImages: ['/images/ProductsImage/BrushWithStand.jpg', '/images/ProductsImage/Comb.jpg', '/images/ProductsImage/CloseDiary.jpg', '/images/ProductsImage/Bottol.jpg'],
    name: 'Bamboo Toothbrush',
    description: 'An eco-friendly bamboo toothbrush paired with a sleek bamboo stand.',
    edition: '',
    price: 299,
    discount: 15,
    rating: 4.7,
    category: 'trending',
    specifications: {
      general: [
        { label: "Sales Package", value: "1 Bamboo Toothbrush + 1 Bamboo Stand" },
        { label: "Model Name", value: "Eco Bamboo Toothbrush with Stand" },
        { label: "Part Number", value: "BT123" },
        { label: "Color", value: "Natural Bamboo" },
        { label: "Material", value: "Bamboo" },
        { label: "Dimensions", value: "18 x 2 x 1 cm" },
        { label: "Weight", value: "20g" },
        { label: "Type", value: "Toothbrush" }
      ]
    }
  },

  // Product 7
  {
    id: 7,
    ribbon: { text: 'Special Edition', color: 'bg-green-500' },
    image: '/images/ProductsImage/BrushWithStand.jpg',
    ArrayImages: ['/images/ProductsImage/BrushWithStand.jpg', '/images/ProductsImage/Comb.jpg', '/images/ProductsImage/CloseDiary.jpg', '/images/ProductsImage/Bottol.jpg'],
    name: 'Bamboo Hair Brush',
    description: 'A stylish bamboo hairbrush with a comfortable grip and gentle bristles.',
    edition: 'Special Edition',
    price: 399,
    discount: 10,
    rating: 4.5,
    category: 'Decorative',
    specifications: {
      general: [
        { label: "Sales Package", value: "1 Bamboo Hair Brush" },
        { label: "Model Name", value: "Eco Bamboo Hair Brush" },
        { label: "Part Number", value: "BHB123" },
        { label: "Color", value: "Natural Bamboo" },
        { label: "Material", value: "Bamboo" },
        { label: "Dimensions", value: "23 x 7 x 3 cm" },
        { label: "Weight", value: "80g" },
        { label: "Type", value: "Hair Brush" }
      ]
    }
  },
  {
    id: 8,
    ribbon: { text: 'Best Seller', color: 'bg-green-500' },
    image: '/images/ProductsImage/Bottol.jpg',
    ArrayImages: ['/images/ProductsImage/Bottol.jpg', '/images/ProductsImage/BrushWithPacket.jpg', '/images/ProductsImage/CloseDiary.jpg', '/images/ProductsImage/Comb.jpg'],
    name: 'Bamboo Travel Kit',
    description: 'A compact bamboo travel kit containing essential toiletries.',
    edition: '',
    price: 799,
    discount: 25,
    rating: 4.6,
    category: 'trending',
    specifications: {
      general: [
        { label: "Sales Package", value: "1 Bamboo Travel Kit" },
        { label: "Model Name", value: "Eco Bamboo Travel Kit" },
        { label: "Part Number", value: "BKT123" },
        { label: "Color", value: "Natural Bamboo" },
        { label: "Material", value: "Bamboo" },
        { label: "Dimensions", value: "18 x 10 x 5 cm" },
        { label: "Weight", value: "250g" },
        { label: "Type", value: "Travel Kit" }
      ]
    }
  },

  // Product 9
  {
    id: 9,
    ribbon: { text: 'Limited Edition', color: 'bg-red-500' },
    image: '/images/ProductsImage/BrushWithPacket.jpg',
    ArrayImages: ['/images/ProductsImage/BrushWithPacket.jpg', '/images/ProductsImage/Bottol.jpg', '/images/ProductsImage/CloseDiary.jpg', '/images/ProductsImage/Comb.jpg'],
    name: 'Bamboo Cutlery Set',
    description: 'A sustainable bamboo cutlery set with a travel case, perfect for eco-conscious travelers.',
    edition: 'Limited Edition',
    price: 650,
    discount: 15,
    rating: 4.7,
    category: 'Decorative',
    specifications: {
      general: [
        { label: "Sales Package", value: "1 Bamboo Cutlery Set" },
        { label: "Model Name", value: "Eco Bamboo Cutlery Set" },
        { label: "Part Number", value: "BCS123" },
        { label: "Color", value: "Natural Bamboo" },
        { label: "Material", value: "Bamboo" },
        { label: "Dimensions", value: "20 x 5 x 3 cm" },
        { label: "Weight", value: "150g" },
        { label: "Type", value: "Cutlery Set" }
      ]
    }
  },

  // Product 10
  {
    id: 10,
    ribbon: { text: 'Exclusive', color: 'bg-yellow-500' },
    image: '/images/ProductsImage/CloseDiary.jpg',
    ArrayImages: ['/images/ProductsImage/CloseDiary.jpg', '/images/ProductsImage/Comb.jpg', '/images/ProductsImage/BrushWithStand.jpg', '/images/ProductsImage/Bottol.jpg'],
    name: 'Bamboo Makeup Brush',
    description: 'A soft and eco-friendly bamboo makeup brush for flawless application.',
    edition: 'Exclusive',
    price: 450,
    discount: 10,
    rating: 4.8,
    category: 'Decorative',
    specifications: {
      general: [
        { label: "Sales Package", value: "1 Bamboo Makeup Brush" },
        { label: "Model Name", value: "Eco Bamboo Makeup Brush" },
        { label: "Part Number", value: "BMB123" },
        { label: "Color", value: "Natural Bamboo" },
        { label: "Material", value: "Bamboo, Synthetic Hair" },
        { label: "Dimensions", value: "15 x 3 x 3 cm" },
        { label: "Weight", value: "30g" },
        { label: "Type", value: "Makeup Brush" }
      ]
    }
  },

  // Product 11
  {
    id: 11,
    ribbon: { text: 'On Sale', color: 'bg-pink-500' },
    image: '/images/ProductsImage/Comb.jpg',
    ArrayImages: ['/images/ProductsImage/Comb.jpg', '/images/ProductsImage/BrushWithStand.jpg', '/images/ProductsImage/CloseDiary.jpg', '/images/ProductsImage/Bottol.jpg'],
    name: 'Bamboo Toothbrush Stand',
    description: 'A sleek and minimalist bamboo stand for storing your toothbrush hygienically.',
    edition: '',
    price: 350,
    discount: 20,
    rating: 4.5,
    category: 'trending',
    specifications: {
      general: [
        { label: "Sales Package", value: "1 Bamboo Toothbrush Stand" },
        { label: "Model Name", value: "Eco Bamboo Toothbrush Stand" },
        { label: "Part Number", value: "BTS123" },
        { label: "Color", value: "Natural Bamboo" },
        { label: "Material", value: "Bamboo" },
        { label: "Dimensions", value: "10 x 5 x 2 cm" },
        { label: "Weight", value: "50g" },
        { label: "Type", value: "Toothbrush Stand" }
      ]
    }
  },

  // Product 12
  {
    id: 12,
    ribbon: { text: 'New Arrival', color: 'bg-blue-500' },
    image: '/images/ProductsImage/BrushWithStand.jpg',
    ArrayImages: ['/images/ProductsImage/BrushWithStand.jpg', '/images/ProductsImage/Comb.jpg', '/images/ProductsImage/CloseDiary.jpg', '/images/ProductsImage/Bottol.jpg'],
    name: 'Bamboo Soap Dish',
    description: 'A sustainable bamboo soap dish for keeping your soap dry and clean.',
    edition: '',
    price: 199,
    discount: 5,
    rating: 4.4,
    category: 'Decorative',
    specifications: {
      general: [
        { label: "Sales Package", value: "1 Bamboo Soap Dish" },
        { label: "Model Name", value: "Eco Bamboo Soap Dish" },
        { label: "Part Number", value: "BSD123" },
        { label: "Color", value: "Natural Bamboo" },
        { label: "Material", value: "Bamboo" },
        { label: "Dimensions", value: "12 x 8 x 3 cm" },
        { label: "Weight", value: "70g" },
        { label: "Type", value: "Soap Dish" }
      ]
    }
  },

  // Product 13
  {
    id: 13,
    ribbon: { text: 'Best Seller', color: 'bg-green-500' },
    image: '/images/ProductsImage/Comb.jpg',
    ArrayImages: ['/images/ProductsImage/Comb.jpg', '/images/ProductsImage/BrushWithPacket.jpg', '/images/ProductsImage/Bottol.jpg', '/images/ProductsImage/CloseDiary.jpg'],
    name: 'Bamboo Lunch Box',
    description: 'An eco-friendly bamboo lunch box to carry your meals in style.',
    edition: '',
    price: 799,
    discount: 18,
    rating: 4.8,
    category: 'Hospitality',
    specifications: {
      general: [
        { label: "Sales Package", value: "1 Bamboo Lunch Box" },
        { label: "Model Name", value: "Eco Bamboo Lunch Box" },
        { label: "Part Number", value: "BLB123" },
        { label: "Color", value: "Natural Bamboo" },
        { label: "Material", value: "Bamboo" },
        { label: "Dimensions", value: "20 x 12 x 7 cm" },
        { label: "Weight", value: "250g" },
        { label: "Type", value: "Lunch Box" }
      ]
    }
  },

  // Product 14
  {
    id: 14,
    ribbon: { text: 'Exclusive', color: 'bg-yellow-500' },
    image: '/images/ProductsImage/CloseDiary.jpg',
    ArrayImages: ['/images/ProductsImage/CloseDiary.jpg', '/images/ProductsImage/Comb.jpg', '/images/ProductsImage/BrushWithStand.jpg', '/images/ProductsImage/Bottol.jpg'],
    name: 'Bamboo Coffee Mug',
    description: 'A stylish bamboo coffee mug for enjoying your favorite beverages.',
    edition: 'Exclusive',
    price: 599,
    discount: 12,
    rating: 4.6,
    category: 'trending',
    specifications: {
      general: [
        { label: "Sales Package", value: "1 Bamboo Coffee Mug" },
        { label: "Model Name", value: "Eco Bamboo Coffee Mug" },
        { label: "Part Number", value: "BCCM123" },
        { label: "Color", value: "Natural Bamboo" },
        { label: "Material", value: "Bamboo" },
        { label: "Dimensions", value: "12 x 10 x 8 cm" },
        { label: "Weight", value: "150g" },
        { label: "Type", value: "Coffee Mug" }
      ]
    }
  },
  {
    id: 15,
    ribbon: { text: 'Hot Item', color: 'bg-orange-500' },
    image: '/images/ProductsImage/BrushWithPacket.jpg',
    ArrayImages: ['/images/ProductsImage/BrushWithPacket.jpg', '/images/ProductsImage/Bottol.jpg', '/images/ProductsImage/CloseDiary.jpg', '/images/ProductsImage/Comb.jpg'],
    name: 'Bamboo Toothbrush',
    description: 'An eco-friendly bamboo toothbrush with soft bristles for gentle cleaning.',
    edition: '',
    price: 150,
    discount: 10,
    rating: 4.3,
    category: 'trending',
    specifications: {
      general: [
        { label: "Sales Package", value: "1 Bamboo Toothbrush" },
        { label: "Model Name", value: "Eco Bamboo Toothbrush" },
        { label: "Part Number", value: "BTB123" },
        { label: "Color", value: "Natural Bamboo" },
        { label: "Material", value: "Bamboo, Nylon" },
        { label: "Dimensions", value: "19 x 2 x 2 cm" },
        { label: "Weight", value: "20g" },
        { label: "Type", value: "Toothbrush" }
      ]
    }
  },

  // Product 16
  {
    id: 16,
    ribbon: { text: 'Best Seller', color: 'bg-green-500' },
    image: '/images/ProductsImage/Comb.jpg',
    ArrayImages: ['/images/ProductsImage/Comb.jpg', '/images/ProductsImage/BrushWithStand.jpg', '/images/ProductsImage/CloseDiary.jpg', '/images/ProductsImage/Bottol.jpg'],
    name: 'Bamboo Hair Comb',
    description: 'A smooth bamboo hair comb that prevents static and is gentle on hair.',
    edition: '',
    price: 199,
    discount: 15,
    rating: 4.7,
    category: 'Hospitality',
    specifications: {
      general: [
        { label: "Sales Package", value: "1 Bamboo Hair Comb" },
        { label: "Model Name", value: "Eco Bamboo Hair Comb" },
        { label: "Part Number", value: "BHC123" },
        { label: "Color", value: "Natural Bamboo" },
        { label: "Material", value: "Bamboo" },
        { label: "Dimensions", value: "18 x 5 x 1 cm" },
        { label: "Weight", value: "30g" },
        { label: "Type", value: "Hair Comb" }
      ]
    }
  },

  // Product 17
  {
    id: 17,
    ribbon: { text: 'On Sale', color: 'bg-pink-500' },
    image: '/images/ProductsImage/Bottol.jpg',
    ArrayImages: ['/images/ProductsImage/Bottol.jpg', '/images/ProductsImage/BrushWithPacket.jpg', '/images/ProductsImage/CloseDiary.jpg', '/images/ProductsImage/Comb.jpg'],
    name: 'Bamboo Water Bottle',
    description: 'A durable and sustainable bamboo water bottle for keeping your drinks cold or hot.',
    edition: '',
    price: 899,
    discount: 20,
    rating: 4.9,
    category: 'trending',
    specifications: {
      general: [
        { label: "Sales Package", value: "1 Bamboo Water Bottle" },
        { label: "Model Name", value: "Eco Bamboo Water Bottle" },
        { label: "Part Number", value: "BWB123" },
        { label: "Color", value: "Natural Bamboo" },
        { label: "Material", value: "Bamboo, Stainless Steel" },
        { label: "Dimensions", value: "25 x 8 x 8 cm" },
        { label: "Weight", value: "350g" },
        { label: "Type", value: "Water Bottle" }
      ]
    }
  },

  // Product 18
  {
    id: 18,
    ribbon: { text: 'Exclusive', color: 'bg-yellow-500' },
    image: '/images/ProductsImage/BrushWithStand.jpg',
    ArrayImages: ['/images/ProductsImage/BrushWithStand.jpg', '/images/ProductsImage/Comb.jpg', '/images/ProductsImage/CloseDiary.jpg', '/images/ProductsImage/Bottol.jpg'],
    name: 'Bamboo Organizer Box',
    description: 'A stylish bamboo organizer to keep your desk clutter-free and organized.',
    edition: 'Exclusive',
    price: 499,
    discount: 25,
    rating: 4.6,
    category: 'Household',
    specifications: {
      general: [
        { label: "Sales Package", value: "1 Bamboo Organizer Box" },
        { label: "Model Name", value: "Eco Bamboo Organizer Box" },
        { label: "Part Number", value: "BOB123" },
        { label: "Color", value: "Natural Bamboo" },
        { label: "Material", value: "Bamboo" },
        { label: "Dimensions", value: "20 x 10 x 10 cm" },
        { label: "Weight", value: "200g" },
        { label: "Type", value: "Organizer Box" }
      ]
    }
  },

  // Product 19
  {
    id: 19,
    ribbon: { text: 'Hot Item', color: 'bg-orange-500' },
    image: '/images/ProductsImage/BrushWithPacket.jpg',
    ArrayImages: ['/images/ProductsImage/BrushWithPacket.jpg', '/images/ProductsImage/Bottol.jpg', '/images/ProductsImage/CloseDiary.jpg', '/images/ProductsImage/Comb.jpg'],
    name: 'Bamboo Serving Tray',
    description: 'A bamboo serving tray for serving drinks, snacks, and meals with style.',
    edition: '',
    price: 799,
    discount: 10,
    rating: 4.5,
    category: 'Household',
    specifications: {
      general: [
        { label: "Sales Package", value: "1 Bamboo Serving Tray" },
        { label: "Model Name", value: "Eco Bamboo Serving Tray" },
        { label: "Part Number", value: "BST123" },
        { label: "Color", value: "Natural Bamboo" },
        { label: "Material", value: "Bamboo" },
        { label: "Dimensions", value: "40 x 30 x 3 cm" },
        { label: "Weight", value: "500g" },
        { label: "Type", value: "Serving Tray" }
      ]
    }
  },

  // Product 20
  {
    id: 20,
    ribbon: { text: 'Limited Edition', color: 'bg-red-500' },
    image: '/images/ProductsImage/Comb.jpg',
    ArrayImages: ['/images/ProductsImage/Comb.jpg', '/images/ProductsImage/BrushWithStand.jpg', '/images/ProductsImage/CloseDiary.jpg', '/images/ProductsImage/Bottol.jpg'],
    name: 'Bamboo Shoe Rack',
    description: 'A compact and stylish bamboo shoe rack to organize your footwear neatly.',
    edition: 'Limited Edition',
    price: 999,
    discount: 15,
    rating: 4.7,
    category: 'Hospitality',
    specifications: {
      general: [
        { label: "Sales Package", value: "1 Bamboo Shoe Rack" },
        { label: "Model Name", value: "Eco Bamboo Shoe Rack" },
        { label: "Part Number", value: "BSR123" },
        { label: "Color", value: "Natural Bamboo" },
        { label: "Material", value: "Bamboo" },
        { label: "Dimensions", value: "60 x 30 x 25 cm" },
        { label: "Weight", value: "2.5kg" },
        { label: "Type", value: "Shoe Rack" }
      ]
    }
  },
  {
    id: 21,
    ribbon: { text: 'Best Seller', color: 'bg-green-500' },
    image: '/images/ProductsImage/BrushWithPacket.jpg',
    ArrayImages: ['/images/ProductsImage/BrushWithPacket.jpg', '/images/ProductsImage/Comb.jpg', '/images/ProductsImage/CloseDiary.jpg', '/images/ProductsImage/Bottol.jpg'],
    name: 'Bamboo Cutting Board',
    description: 'A sturdy and eco-friendly bamboo cutting board for your kitchen.',
    edition: '',
    price: 799,
    discount: 5,
    rating: 4.8,
    category: 'Household',
    specifications: {
      general: [
        { label: "Sales Package", value: "1 Bamboo Cutting Board" },
        { label: "Model Name", value: "Eco Bamboo Cutting Board" },
        { label: "Part Number", value: "BCC123" },
        { label: "Color", value: "Natural Bamboo" },
        { label: "Material", value: "Bamboo" },
        { label: "Dimensions", value: "40 x 30 x 2 cm" },
        { label: "Weight", value: "700g" },
        { label: "Type", value: "Cutting Board" }
      ]
    }
  },

  // Product 22
  {
    id: 22,
    ribbon: { text: 'Limited Edition', color: 'bg-red-500' },
    image: '/images/ProductsImage/Comb.jpg',
    ArrayImages: ['/images/ProductsImage/Comb.jpg', '/images/ProductsImage/BrushWithStand.jpg', '/images/ProductsImage/CloseDiary.jpg', '/images/ProductsImage/Bottol.jpg'],
    name: 'Bamboo Salad Bowl',
    description: 'An elegant bamboo salad bowl for serving your favorite salads.',
    edition: 'Limited Edition',
    price: 599,
    discount: 15,
    rating: 4.4,
    category: 'Household',
    specifications: {
      general: [
        { label: "Sales Package", value: "1 Bamboo Salad Bowl" },
        { label: "Model Name", value: "Eco Bamboo Salad Bowl" },
        { label: "Part Number", value: "BSB123" },
        { label: "Color", value: "Natural Bamboo" },
        { label: "Material", value: "Bamboo" },
        { label: "Dimensions", value: "25 x 25 x 10 cm" },
        { label: "Weight", value: "400g" },
        { label: "Type", value: "Salad Bowl" }
      ]
    }
  }
];

export const productCategories = [
  { title: 'Trending Products', category: 'trending', showSliderButton: true, ribbon: true },
  { title: 'Household Products', category: 'Household', ribbon: false },
  { title: 'Hospitality Products', category: 'Hospitality', ribbon: false },
  { title: 'Decorative Products', category: 'Decorative', ribbon: false },
];

const specificationsData = {
  general: [
    { label: "Sales Package", value: "1 Wooden Comb" },
    { label: "Model Name", value: "Handcrafted Wooden Comb" },
    { label: "Part Number", value: "WC123" },
    { label: "Color", value: "Brown" },
    { label: "Portable", value: "Yes" },
    { label: "Material", value: "Wood" },
    { label: "Dimensions", value: "8 x 2 inches" },
    { label: "Weight", value: "50g" },
    { label: "Type", value: "Hair Comb" }
  ]
};