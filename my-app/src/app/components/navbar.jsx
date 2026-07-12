"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import ProfileMenu from "./profileMenu";

export default function Navbar() {
  return (
    <div className="bg-gray-200  shadow ">
      <nav className="flex container mx-auto justify-between items-center px-6 py-4 ">

        {/* Logo */}
        <h1 className="text-2xl sm:text-3xl font-bold">Shop</h1>

        {/* Links */}
        <ul className="flex items-center gap-3 text-sm sm:text-md font-serif ">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/collections">Collections</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/sign-up">sign-up</Link>
          </li>
        </ul>

        {/* Icons */}
        <div className="flex items-center ">

          {/* Cart */}
          <Link href="/cart">
            <ShoppingCart className="w-6 h-5 cursor-pointer gap-4" />
          </Link>

          {/* Profile Dropdown */}
          <ProfileMenu />

        </div>

      </nav>
    </div>
  );
}