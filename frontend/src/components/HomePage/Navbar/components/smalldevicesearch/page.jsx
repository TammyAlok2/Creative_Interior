'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useProductDataStore } from '@/stores/productStore';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';

const SmallDeviceSearch = ({ setIsSearchOpen, isSearchOpen }) => {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const { allProduct } = useProductDataStore();
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchSuggestions = debounce(async (query) => {
        if (query.length < 2) {
            setSuggestions([]);
            setNoResults(false);
            return;
        }

        setIsLoading(true);
        setNoResults(false);

        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const response = await allProduct({ search: query });
            const products = response?.products || [];
            setSuggestions(products.map(product => ({
                id: product._id,
                name: product.name
            })));
            setNoResults(products.length === 0);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
            setNoResults(true);
        } finally {
            setIsLoading(false);
        }
    }, 300);

    useEffect(() => {
        fetchSuggestions(search);
    }, [search]);

    const handleSearch = async (e) => {
        e.preventDefault();
        
        if (!search.trim()) return;
        
        try {
            const response = await allProduct({ search });
            const products = response?.products || [];
            
            if (products.length > 0) {
                router.push(`/wallpaper/multiple/${products[0]._id}`);
            } else {
                router.push('/allproducts');
            }
            setShowSuggestions(false);
            setIsSearchOpen(false);
        } catch (error) {
            console.error('Error during search:', error);
            router.push('/allproducts');
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearch(suggestion.name);
        setShowSuggestions(false);
        setIsSearchOpen(false);
        router.push(`/wallpaper/multiple/${suggestion.id}`);
    };

    const LoadingSpinner = () => (
        <div className="flex items-center justify-center py-4">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    const renderSuggestionsList = () => {
        if (isLoading) {
            return (
                <div className="px-4 py-3 text-gray-500 text-center">
                    <LoadingSpinner />
                </div>
            );
        }

        if (noResults) {
            return (
                <div className="px-4 py-3 text-gray-500 text-center">
                    No products found
                </div>
            );
        }

        return suggestions.map((suggestion) => (
            <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
            >
                {suggestion.name}
            </button>
        ));
    };

    return (
        <div>
            {/* Mobile Search Bar */}
            <div
                ref={searchRef}
                className={`lg:hidden absolute left-0 top-[3.3rem] right-0 bg-white px-4 py-2 shadow-md transition-all duration-300 ease-in-out ${
                    isSearchOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-full opacity-0 pointer-events-none"
                }`}
            >
                <form onSubmit={handleSearch} className="flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                    <button 
                        type="submit" 
                        className="bg-black text-white p-2 rounded-lg flex-shrink-0"
                    >
                        <Search className="w-5 h-5" />
                    </button>

                    {isSearchOpen && showSuggestions && (
                        <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg z-50 max-h-60 overflow-y-auto">
                            {renderSuggestionsList()}
                        </div>
                    )}
                </form>
            </div>

            {/* mobile search button */}
            <button
                className="lg:hidden hover:text-orange-orange500"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
                <Search className="w-6 h-6" />
            </button>
        </div>
    );
};

export default SmallDeviceSearch;