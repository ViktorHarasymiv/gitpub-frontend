'use client';
import React, { useState } from 'react';
import css from './Header.module.css';
import { useIsMobile } from '@/lib/hooks/useIsMobile';
import Logo from '../icons/Logo';
import { slide as Menu } from 'react-burger-menu';
import MobileMenu from '../MobileMenu/MobileMenu';

const Header = () => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStateChange = (state: { isOpen: boolean }) => {
    setMenuOpen(state.isOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    isMobile && (
      <>
        <div id="outer-container" className={css.header}>
          <Logo />
          <button onClick={toggleMenu} className={css.burgerButton}>
            <svg width="22" height="16">
              <use href="/sprite.svg#burger" />
            </svg>
          </button>
        </div>
        <Menu
          isOpen={menuOpen}
          onStateChange={handleStateChange}
          customBurgerIcon={false}
          menuClassName={css.mobileMenu}
          overlayClassName={css.overlay}
        >
          <MobileMenu />
        </Menu>
      </>
    )
  );
};

export default Header;
