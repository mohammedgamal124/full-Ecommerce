"use client"



export default function AddToCart({ productId }) {


    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log("Token:", token);
            if (!token) {
                console.error("No token found. User might not be logged in.");
                return;
            }
            const response = await fetch("http://localhost:5000/api/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                   Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ productId, quantity:1 })

            });
            const data = await response.json();
            console.log("Add to cart response:", data);
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
        }
    return (
            <button onClick={handleAddToCart} >
                ADD TO CART
            </button>
        );
    }