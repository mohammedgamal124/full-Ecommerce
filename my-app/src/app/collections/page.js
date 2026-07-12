import Image from "next/image";
import Link from "next/link";

async function page() {
  const res = await fetch("http://localhost:5000/api/products", {
    cache: "no-store",
  });
  const products = await res.json();
  console.log(products)

  return (
    <div className="py-8 px-2 container mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5 ">
        {products.map((product) => (
          <Link key={product._id} href={`/product/${product._id}`}>
            <div className="rounded-lg overflow-hidden bg-white shadow-md border hover:shadow-lg transition-shadow duration-300  ">
              <div
                className="flex justify-center items-center bg-gray-100 border-b"
                style={{ height: "130px" }}
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  height={70}
                  width={70}
                  loading="eager"
                  unoptimized
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col p-2 m-2 text-sm">
                <h2 className="font-semibold ">{product.title}</h2>
                <p className="text-gray-500">{product.description}</p>
                <p className="font-bold text-red-500">{product.price}$</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default page;
