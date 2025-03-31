"use client";

import React from "react";
import Link from "next/link";
import { FaBug } from "react-icons/fa";
import { usePathname } from "next/navigation";
import classnames from "classnames";

const NavBar = () => {
  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Issues", href: "/issues" },
  ];
  const currPath = usePathname();
  return (
    <nav className="flex space-x-6 border-b border-zinc-300 mb-5 px-5 h-14 items-center">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={classnames({
              "text-zinc-500 hover:text-zinc-800 ": link.href !== currPath,
              "text-teal-600": link.href === currPath,
              "transition-colors": true,
            })}
          >
            {link.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
