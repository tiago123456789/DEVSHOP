import React, { useState } from "react";

export default () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);


    return (
        <header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-indigo-600">
            <div className="flex items-center">
                <button click="sidebarOpen = true" className="text-gray-500 focus:outline-none lg:hidden">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
            <div className="flex items-center">
                <div className="relative">
                    <button onClick={() => setDropdownOpen(!dropdownOpen) } className="relative block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none">
                        <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80" alt="Your avatar" />
                    </button>
                    <div x-show="dropdownOpen" onClick={() => setDropdownOpen(false) } className="fixed inset-0 h-full w-full z-10" style={{ display:  (dropdownOpen ? 'block' : "none") }} />
                    <div x-show="dropdownOpen" className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10" style={{ display: (dropdownOpen ? 'block' : "none") }}>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Profile</a>
                        {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Products</a> */}
                        <a href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Logout</a>
                    </div>
                </div>
            </div>
        </header>
    );
}