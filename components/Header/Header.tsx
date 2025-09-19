'use client';
import React, { useState } from 'react';
import css from './Header.module.css';
import { useIsMobile } from '@/lib/hooks/useIsMobile';
import Logo from '../icons/Logo';
import SidebarContent from '../Sidebar/SidebarContent';

const Header = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const toggleOpen = () => {
    if (open) {
      setClosing(true);
      setTimeout(() => {
        setOpen(false);
        setClosing(false);
      }, 300);
    } else {
      setOpen(true);
    }
  };

  const closeMenu = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 300);
  };

  return (
    isMobile && (
      <>
        <header className={css.header}>
          <Logo />
          <button onClick={toggleOpen} className={css.burgerButton}>
            <svg width="22" height="16">
              <use href="/sprite.svg#burger" />
            </svg>
          </button>
        </header>

        {open && (
          <>
            <div className={css.overlay} onClick={closeMenu} />
            <div className={`${css.menu} ${closing ? css.closing : ''}`}>
              <SidebarContent onLinkClick={closeMenu} />
            </div>
          </>
        )}
      </>
    )
  );
};

export default Header;
