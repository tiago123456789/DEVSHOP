import React from "react";
import Link from "next/link";
import { FaSitemap, FaTachometerAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import App from "../../constants/App";

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
          <Link href={App.ROUTES.CATEGORY}>
          <a className={` flex items-center mt-4 py-2 px-6 text-gray-100 hover:bg-gray-700 
              hover:bg-opacity-25 hover:text-gray-100 ${(isItemActive(App.ROUTES.CATEGORY) ? "bg-gray-700" : "" )}`} >
            <FaSitemap />
            <span className="mx-3">Categorias</span>
          </a>
          </Link>
          <Link href={App.ROUTES.PRODUCT}>
            <a className={ `
              flex items-center mt-4 py-2 px-6 text-gray-100 hover:bg-gray-700
              hover:bg-opacity-25 hover:text-gray-100 ${(isItemActive(App.ROUTES.PRODUCT) ? "bg-gray-700" : "" )}`  } >
              <FaSitemap />
              <span className="mx-3">Produtos</span>
            </a>
          </Link>
          <Link href={App.ROUTES.BRAND}>
            <a className={ `
              flex items-center mt-4 py-2 px-6 text-gray-100 hover:bg-gray-700
              hover:bg-opacity-25 hover:text-gray-100 ${(isItemActive(App.ROUTES.BRAND) ? "bg-gray-700" : "" )}`  } >
              <FaSitemap />
              <span className="mx-3">Brands</span>
            </a>
          </Link>
      </nav>
    )
}