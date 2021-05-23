import React from "react";
import { FaSitemap, FaTachometerAlt } from "react-icons/fa";

export default () => {
    return (
        <nav className="mt-10">
          <a className="flex items-center mt-4 py-2 px-6 bg-gray-700 bg-opacity-25 text-gray-100" href="/">
            <FaTachometerAlt />
            <span className="mx-3">Dashboard</span>
          </a>
          <a className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100" href="/ui-elements">
            <FaSitemap />
            <span className="mx-3">Categorias</span>
          </a>
      </nav>
    )
}