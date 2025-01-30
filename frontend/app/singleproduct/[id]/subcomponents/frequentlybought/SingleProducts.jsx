
const CartSummary = ({ totalPrice, itemCount }) => {
    return (
        <div className="mt-6">
            <div className="flex justify-between text-xl font-semibold">
                <span>{itemCount} Items</span>
                <span>₹{totalPrice}</span>
                <div className="flex space-x-4 justify-between">
                    <button className="px-[3rem] py-3 bg-gray-200 text-gray-dark font-bold rounded hover:bg-gray-light focus:outline-none focus:ring-2 focus:ring-gray-400">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default CartSummary;
