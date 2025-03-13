import useCart from "../hooks/useCart"
import MainLayout from "../Layout/MainLayout"

const Cart = () => {
    const {addToCart,removeFromCart,cartItems,decreaseQuantity} = useCart();
    return(
        <MainLayout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems && cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                                    <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-md" />
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-semibold">{item.title}</h3>
                                        <p className="text-gray-600 mt-1">${item.price}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => decreaseQuantity(item)}
                                            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 rounded-full transition-colors duration-200"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-600 rounded-full transition-colors duration-200"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500 text-lg">Your cart is empty</p>
                            </div>
                        )}
                    </div>
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">
                                        ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors duration-200">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </MainLayout>
    )
}

export default Cart;