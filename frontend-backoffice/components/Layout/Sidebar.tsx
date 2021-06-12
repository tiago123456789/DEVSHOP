import React from "react";
import Link from "next/link";
import { FaSitemap, FaTachometerAlt } from "react-icons/fa";
import { useRouter } from "next/router";

export default () => {
    const router = useRouter()

    const isItemActive = (route) => {
      return router.pathname.indexOf(route) >= 0;
    }

    return (
        <nav className="mt-10">
          <a className="flex items-center mt-4 py-2 px-6  text-gray-100" href="/">
            <FaTachometerAlt />
            <span className="mx-3">Dashboard</span>
          </a>
          <Link href="/categories">
          <a className={` flex items-center mt-4 py-2 px-6 text-gray-100 hover:bg-gray-700 
              hover:bg-opacity-25 hover:text-gray-100 ${(isItemActive("/categories") ? "bg-gray-700" : "" )}`} >
            <FaSitemap />
            <span className="mx-3">Categorias</span>
          </a>
          </Link>
          <Link href="/products">
            <a className={ `
              flex items-center mt-4 py-2 px-6 text-gray-100 hover:bg-gray-700
              hover:bg-opacity-25 hover:text-gray-100 ${(isItemActive("/products") ? "bg-gray-700" : "" )}`  } >
              <FaSitemap />
              <span className="mx-3">Produtos</span>
            </a>
          </Link>
      </nav>
    )
}