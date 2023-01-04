import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 flex flex-row justify-between items-center w-full h-16 text-white p-16">
      <h1 className="font-semibold text-lg">Antonwy</h1>
      <div className="flex flex-row gap-8">
        <NavbarItem href="/">Home</NavbarItem>
        <NavbarItem href="/about">About Me</NavbarItem>
        <NavbarItem href="/my-work">My Work</NavbarItem>
        <NavbarItem href="/contact">Contact</NavbarItem>
      </div>
    </nav>
  );
};

type NavbarItemProps = {
  href: string;
  children: ReactNode;
};

const NavbarItem = ({ href, children }: NavbarItemProps) => {
  const router = useRouter();
  const [selected, setSelected] = useState(router.pathname === href);

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.5, type: 'spring' },
      }}
    >
      <Link
        className={`
          bg-primary/0 hover:bg-primary/20 hover:text-primary px-3 py-2 transition-colors ease-in-out rounded-md
          ${selected ? `bg-primary/20 text-primary` : ``}
        `}
        href={href}
      >
        {children}
      </Link>
    </motion.div>
  );
};
