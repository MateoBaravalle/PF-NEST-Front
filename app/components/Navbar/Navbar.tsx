"use client";

import React from "react";
import Link from "next/link";
import Search from "../Search/SearchBar";

const Navbar = () => {
  return (
    <div className="p-4 bg-[#fc9a84]">
      <nav className="flex items-center justify-between sm:h-10">
        <div>
        <Search/>
        </div>
        <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
          <Link
            href="../../Views/Buy"
            className="font-medium text-gray-500 hover:text-gray-900"
          >
            Venta
          </Link>
          <Link
            href="../../Views/Rent"
            className="font-medium text-gray-500 hover:text-gray-900"
          >
            Alquiler
          </Link>
          <Link
            href="../../Views/FormCreate"
            className="font-medium text-gray-500 hover:text-gray-900"
          >
            Publicar Inmueble
          </Link>
          <Link
            href="../../Views/Login"
            className=" font-medium text-indigo-600 hover:text-indigo-500"
          >
            Log in
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;