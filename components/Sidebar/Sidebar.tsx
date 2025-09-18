'use client';
import React from 'react';
import Link from 'next/link';
import { useIsMobile } from '@/lib/hooks/useIsMobile';
import css from './Sidebar.module.css';
import Logo from '../icons/Logo.js';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Мій день', icon: 'my-day', w: 20, h: 22 },
    { href: '/journey', label: 'Подорож', icon: 'journey', w: 22, h: 20 },
    { href: '/diary', label: 'Щоденник', icon: 'dairy', w: 18, h: 22 },
    { href: '/profile', label: 'Профіль', icon: 'profile', w: 22, h: 22 },
  ];

  return (
    !isMobile && (
      <aside className={css.sidebar}>
        <div className={css.sidebarLogo}>
          <Logo width={96} height={30} />
        </div>

        <nav className={css.sidebarNav}>
          <ul>
            {links.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${css.navItem} ${
                    pathname === link.href ? css.active : ''
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
          <Image
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
          </button>
        </div>
      </aside>
    )
  );
};

export default Sidebar;
