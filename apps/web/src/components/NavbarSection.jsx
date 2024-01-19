'use client';

import Link from 'next/link';
import { useState } from 'react';
import { IoClose, IoMenu } from 'react-icons/io5';
import NavLinkComp from './NavLinkComp';
import MenuOverlay from './MenuOverlay';

const linkList = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Event',
    href: '/event',
  },
  {
    name: 'My Profile',
    href: '/',
  },
];

export const NavbarSection = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <section>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2">
          <Link href="/" className="flex items-center space-x-3 ">
            <span className="font-bold">Brand</span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0">
            <button
              type="button"
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
            >
              Login
            </button>
            <div className="items-center">
              {!openMenu ? (
                <button
                  onClick={() => setOpenMenu(true)}
                  className="sm:block md:hidden items-center inline-flex justify-center rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 p-1 text-2xl"
                >
                  <IoMenu />
                </button>
              ) : (
                <button
                  onClick={() => setOpenMenu(false)}
                  className="sm:block md:hidden items-center inline-flex justify-center rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 p-1 text-2xl"
                >
                  <IoClose />
                </button>
              )}
            </div>
          </div>

          <div
            id="mobile-menu"
            className=" items-center md:justify-between hidden w-full md:flex md:w-auto md:order-1"
          >
            <ul className="flex items-center md:flex-row md:mt-0  md:p-0 mt-4 font-medium">
              {linkList.map((link, i) => (
                <li key={i}>
                  <NavLinkComp href={link.href} name={link.name} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        {openMenu ? <MenuOverlay links={linkList} /> : null}
      </nav>
    </section>
  );
};
