

import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logoresto.png'; 
import Profile from '../assets/male.png'; 

function Header() {
  return (
    <header>
      <nav className="bg-green-500">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        <div className="flex items-center">
        <img src={Logo} alt="Logo" className="h-20 w-20 mr-2" /> 
          <Link to="/" className= "text-white text-2xl font-bold">
            Cafe<span className='text-yellow-400'>Taria</span>
          </Link>
          </div>
          <button
            className="block lg:hidden text-white focus:outline-none"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="text-2xl">&#8801;</span>
          </button>

          <div className="hidden lg:flex w-1/4 justify-center">
            <form className="flex items-center justify-center">
              <input
                className="border border-gray-300 py-1 px-2 rounded-l-md focus:outline-none"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="bg-yellow-400 text-white py-1 px-3 rounded-r-md focus:outline-none" type="submit">
                Search
              </button>
            </form>
          </div>

          <div className="hidden lg:flex items-center justify-end space-x-4">
            <img src={Profile} alt="User Profile" className="w-12 h-12 rounded-full" />
            <button className="bg-blue-700 text-white py-1 px-3 rounded-md focus:outline-none">
              <a href="user1.html" style={{ textDecoration: 'none' }}>Profile</a>
            </button>
          </div>
        </div>

        <div className="block lg:hidden">
          <div className="collapse" id="navbarSupportedContent">
            <ul className="flex flex-col items-center py-3">
              <li>
                <a href="index1.html" className="text-white">Home</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;

