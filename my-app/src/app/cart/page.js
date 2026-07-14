"use client";
import { useState, useEffect } from "react";

function CartPage() {
  // 1. Create state to hold the cart data and loading/error states
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Use useEffect to fetch data once when the component mounts
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cart", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch cart: ${response.statusText}`);
        }

        const data = await response.json();
        setCartItems(data); // Assuming your API returns an array of items
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []); // Empty dependency array ensures this runs only once

  // 3. Handle loading and error states gracefully
  if (loading) return <div className="p-4 text-center">Loading your cart...</div>;
  if (error) return <div className="p-4 text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Cart</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Product</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {/* 4. Map over the fetched cart items to display them */}
            {cartItems.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  Your cart is empty.
                </td>
              </tr>
            ) : (
              cartItems.map((item) => (
                <tr key={item.id} className="text-center hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{item.productName}</td>
                  <td className="py-2 px-4 border-b">${item.price.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">{item.quantity}</td>
                  <td className="py-2 px-4 border-b">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CartPage;