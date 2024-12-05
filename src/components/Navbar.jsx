// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to the register page
  };
  const handleAdminLoginClick = () => {
    navigate('/AdminLogin');
  };

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-blue-950" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img 
            src={'Ethiopia.jpg'} 
            alt='logo' 
            style={{ width: '50px', height: '50px', objectFit: 'contain' }} 
          />
          <p className='text-white text-[18px] font-bold cursor-pointer flex '>
            WCAD &nbsp;
            <span className='sm:block hidden'>  | Waste Control and donation application</span>
          </p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
          <li>
            <button onClick={handleLoginClick} className='text-white text-[18px] bg-red-600 rounded p-2 font-medium cursor-pointer'>
              ይግቡ
            </button>
          </li>
          <li>
            <button onClick={handleRegisterClick} className='text-white text-[18px]  bg-red-600 rounded p-2 font-medium cursor-pointer'>
              ይመዝገቡ
            </button>
          </li>
          <li>
                <button onClick={handleAdminLoginClick} className='text-white text-[16px]  bg-red-600 rounded p-2 font-medium cursor-pointer'>
                  የአድሚን መግቢያ
                </button>
              </li>
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
              <li>
                <button onClick={handleLoginClick} className='text-white text-[16px] font-medium cursor-pointer'>
                  ግባ
                </button>
              </li>
              <li>
                <button onClick={handleRegisterClick} className='text-white text-[16px] font-medium cursor-pointer'>
                  ተመዘገብ
                </button>
              </li>
              <li>
                <button onClick={handleAdminLoginClick} className='text-white text-[16px] font-medium cursor-pointer'>
                  የአድሚን መግቢያ
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;