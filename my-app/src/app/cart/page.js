"use client";
import { useState, useEffect } from "react";

function CartPage() {
  // جعل القيمة الابتدائية مصفوفة فارغة دائماً لتجنب مشاكل الـ رندر الأولية
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        
        // استخراج مصفوفة العناصر (items) من داخل كائن السلة (cart)
        if (data && data.cart && data.cart.items) {
          setCartItems(data.cart.items);
        } else {
          setCartItems([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading your cart...</div>;
  if (error) return <div className="p-4 text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Cart</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Product</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  Your cart is empty.
                </td>
              </tr>
            ) : (
              cartItems.map((item) => (
                // استخدام الـ _id الخاص بالمنتج كـ key فريد
                <tr key={item._id || item.product?._id} className="text-center hover:bg-gray-50">
                  {/* تم تعديل الحقل هنا ليقرأ title بدلاً من name ليطابق الـ Schema */}
                  <td className="py-2 px-4 border-b">{item.product?.title || "Unknown Product"}</td>
                  <td className="py-2 px-4 border-b">${Number(item.price).toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">{item.quantity}</td>
                  <td className="py-2 px-4 border-b">
                    ${(Number(item.price) * item.quantity).toFixed(2)}
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