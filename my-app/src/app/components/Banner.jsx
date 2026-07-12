import Image from "next/image";

async function Banner() {
  try {
    const res = await fetch("http://localhost:5000/api/banners", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to load banner");
    }

    const banners = await res.json();
    const banner = Array.isArray(banners) ? banners[0] : null;

    if (!banner?.image || !banner?.title) {
      return null;
    }

    return (
      <div className="container mx-auto flex justify-center my-4">
        <div
          style={{ width: 1000, height: 500 }}
          className="relative rounded-lg shadow-lg overflow-hidden"
        >
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            sizes="(max-width: 1024px) 100vw, 1000px"
            style={{ objectFit: "cover" }}
            unoptimized
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Banner load error:", error);
    return null;
  }
}

export default Banner;
