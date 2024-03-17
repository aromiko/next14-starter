'use client';

import Image from 'next/image';
import NavLink from './navLink/NavLink';
import styles from './links.module.css';
import { useState } from 'react';

const Links = () => {
  const [open, setOpen] = useState(false);
  const links = [
    { title: 'Homepage', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' },
    { title: 'Blog', path: '/blog' },
  ];

  const session = true;
  const isAdmin = true;

  return (
    <nav className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {session ? (
          <>
            {isAdmin && <NavLink item={{ title: 'Admin', path: '/admin' }} />}
            <button className={styles.logout}>Logout</button>
          </>
        ) : (
          <NavLink item={{ title: 'Login', path: '/login' }} />
        )}
      </div>
      <Image
        src="/menu.png"
        alt="menu"
        className={styles.menuButton}
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </nav>
  );
};

export default Links;
