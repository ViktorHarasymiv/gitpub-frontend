'use client';
import React from 'react';
import Link from 'next/link';

import css from './Sidebar.module.css';
import Logo from '../icons/Logo.js';
// import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface SidebarContentProps {
  onLinkClick?: () => void;
}

const SidebarContent = ({ onLinkClick }: SidebarContentProps) => {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Мій день', icon: 'my-day', w: 20, h: 22 },
    { href: '/journey', label: 'Подорож', icon: 'journey', w: 22, h: 20 },
    { href: '/diary', label: 'Щоденник', icon: 'dairy', w: 18, h: 22 },
    { href: '/profile', label: 'Профіль', icon: 'profile', w: 22, h: 22 },
  ];

  return (
    <aside className={css.sidebar}>
      <div className={css.sidebarLogo}>
        <Logo width={96} height={30} />
      </div>

      <nav className={css.sidebarNav}>
        <ul>
          {links.map(link => (
            <li key={link.href}>
              <Link
                onClick={onLinkClick}
                href={link.href}
                className={`${css.navItem} ${
                  link.href === '/'
                    ? pathname === '/' && css.active
                    : pathname.startsWith(link.href) && css.active
                }`}
              >
                <svg width={link.w} height={link.h}>
                  <use href={`/sprite.svg#${link.icon}`} />
                </svg>
                <p>{link.label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={css.sidebarFooter}>
        {/* <Image
          src={'/user.jpg'}
          alt="User photo"
          width={40}
          height={40}
          className={css.image}
        />
        <ul>
          <li>Unknown User</li>
          <li>user1@gur.mo</li>
        </ul>
        <button className={css.logoutButton}>
          <svg width="19" height="20">
            <use href="/sprite.svg#exit" />
          </svg>
        </button> */}

        <ul className={css.authLinks}>
          <li className={css.item}>
            <Link href={'/auth/login'}>Увійти</Link>
          </li>
          <li className={css.item}>
            <Link href={'/auth/register'}>Зареєструватись</Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarContent;
