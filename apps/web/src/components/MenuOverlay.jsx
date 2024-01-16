import React from 'react';
import NavLink from './Navlink';

const MenuOverlay = ({ links }) => {
  return (
    <ul className="flex flex-col py-4 items-center p-4 font-medium">
      {links.map((link, i) => (
        <li key={i}>
          <NavLink href={link.href} name={link.name} />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
