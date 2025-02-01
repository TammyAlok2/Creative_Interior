'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useProductDataStore } from '@/stores/productStore';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';

const LargeDeviceSearch = () => {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(-1); // Track highlighted index
    const { allProduct } = useProductDataStore();
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
                setHighlightIndex(-1);
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
        } catch (error) {
            console.error('Error during search:', error);
            router.push('/allproducts');
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearch(suggestion.name);
        setShowSuggestions(false);
        router.push(`/wallpaper/multiple/${suggestion.id}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setHighlightIndex((prevIndex) =>
                prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
            );
        } else if (e.key === 'ArrowUp') {
            setHighlightIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
            );
        } else if (e.key === 'Enter' && highlightIndex >= 0) {
            e.preventDefault();
            handleSuggestionClick(suggestions[highlightIndex]);
        }
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

        return suggestions.map((suggestion, index) => (
            <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`w-full px-4 py-2 text-left focus:outline-none ${
                    highlightIndex === index ? 'bg-gray-100' : 'hover:bg-gray-100'
                }`}
            >
                {suggestion.name}
            </button>
        ));
    };

    return (
        <div ref={searchRef} className="hidden lg:flex items-center space-x-4 relative">
            <form onSubmit={handleSearch} className="relative flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setShowSuggestions(true);
                        setHighlightIndex(-1); // Reset highlight when typing
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={handleKeyDown} // Listen for arrow key navigation
                    className="w-48 xl:w-64 px-4 py-2 border rounded-lg"
                />
                <button 
                    type="submit" 
                    className="bg-black text-white p-2 rounded-lg"
                >
                    <Search className="w-5 h-5" />
                </button>

                {showSuggestions && (
                    <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg z-50 max-h-60 overflow-y-auto">
                        {renderSuggestionsList()}
                    </div>
                )}
            </form>
        </div>
    );
};

export default LargeDeviceSearch;
