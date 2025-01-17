'use client'
import Image from 'next/image';
import Link from 'next/link';

const BlogCard = ({ date, category, title, author, comments, excerpt,image }) => {
// working 

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
      {/* Image Container with fixed aspect ratio */}
      <div className="relative w-full pt-[75%]">
        <div className="absolute top-4 left-4 bg-white py-1 px-3 rounded-md shadow-md">
          <div className="text-xl font-bold">{date.day}</div>
          <div className="text-sm uppercase">{date.month}</div>
        </div>
        <Image
          src={image}
          alt={title}
          fill
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-orange-500 font-medium mb-2 uppercase tracking-wider text-sm">
          {category}
        </div>
        
        <Link 
          href="#" 
          className="text-xl font-semibold mb-3 hover:text-orange-500 transition-colors duration-300 line-clamp-2"
        >
          {title}
        </Link>
        
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <span>By: {author}</span>
          <span className="mx-2">•</span>
          <span>{comments} Comments</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
          {excerpt}
        </p>
        
        <Link 
          href="#" 
          className="inline-flex items-center text-black hover:text-orange-500 transition-colors duration-300 font-medium"
        >
          READ MORE
          <svg 
            className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

const BlogSection = () => {
  const blogPosts = [
    {
      date: { day: '30', month: 'MAY' },
      category: 'DINING CHAIR',
      title: 'Traveling Solo Is Awesome',
      author: 'creative',
      comments: '1 Comment',
      image:'/images/Category/category1.jpg',
      excerpt: 'In mattis scelerisque magna, ut tincidunt ex. Quisque nibh urna, pretium in tristique in, bibendum sed libero. Pellentesque mauris nunc, pretium non erat non...'
    },
    {
      date: { day: '30', month: 'MAY' },
      category: 'DINING CHAIR',
      title: 'A Beautiful Sunday Morning',
      author: 'creative',
      comments: '0 Comments',

      image:'/images/Category/category2.jpg',
      excerpt: 'In mattis scelerisque magna, ut tincidunt ex. Quisque nibh urna, pretium in tristique in, bibendum sed libero. Pellentesque mauris nunc, pretium non erat non...'
    },
    {
      date: { day: '30', month: 'MAY' },
      category: 'DINING CHAIR',
      title: 'Kitchen Inspired On Japanese',
      author: 'creative',
      comments: '0 Comments',
      image:'/images/Category/category3.jpg',
      excerpt: 'In mattis scelerisque magna, ut tincidunt ex. Quisque nibh urna, pretium in tristique in, bibendum sed libero. Pellentesque mauris nunc, pretium non erat non...'
    }
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">From Our Blog</h2>
        <p className="text-gray-600">See how our customers have styled davici products in their home</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <BlogCard
            key={index}
            date={post.date}
            category={post.category}
            title={post.title}
            author={post.author}
            comments={post.comments}
            excerpt={post.excerpt}
            image = {post.image}
          />
        ))}
      </div>
    </section>
  );
};

export default BlogSection;