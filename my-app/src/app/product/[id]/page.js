import React from "react";
import Image from "next/image";

async function Page({ params }) {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:5000/api/products/${id}`,
    {
      cache: "no-store",
    }
  );

  const product = await res.json();
  console.log("ID:", id);
console.log("PRODUCT:", product);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container  mx-auto p-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-7 py-3 px-4  ">
   
      
      

      {/* Image */}

      <div className="flex justify-center bg-gray-100 w-48 sm:w-56 md:w-64 lg:w-80 h-64 rounded-xl overflow-hidden p-4 shrink-0">
  {product.image && (
    <Image
      src={product.image}
      alt={product.title}
      width={200}
      height={200}
      className="object-contain"
      unoptimized
    />
  )}
</div>

      {/* Info */}
      <div className="mt-6 px-4">
        <h1 className="text-3xl  font-bold">{product.title}</h1>

        <p className="mt-4 text-gray-600">
          {product.description}
        </p>

        <p className="mt-4 text-2xl font-bold text-red-500">
          ${product.price}
        </p>

        <p className="mt-2">
          Stock: {product.stock}
        </p>

        <button className="mt-6 px-6 py-3 bg-black text-white rounded">
          Add To Cart
        </button>
      </div>
      </div>
    </div>
  );
}

export default Page;