import React from 'react';
import Link from 'next/link';
import css from '../Sidebar/Sidebar.module.css';
import Logo from '../icons/Logo';
import Image from 'next/image';

const MobileMenu = () => {
  return (
    <aside className={css.sidebar}>
      <div className={css.sidebarLogo}>
        <Logo width={96} height={30} />
      </div>

      <nav className={css.sidebarNav}>
        <ul>
          <li>
            <Link href={'/'} className={css.navItem}>
              <svg width="20" height="22">
                <use href="/sprite.svg#my-day" />
              </svg>
              <p>Мій день</p>
            </Link>
          </li>
          <li>
            <Link href={'/journey'} className={css.navItem}>
              <svg width="22" height="20">
                <use href="/sprite.svg#journey" />
              </svg>
              <p>Подорож</p>
            </Link>
          </li>
          <li>
            <Link href={'/diary'} className={css.navItem}>
              <svg width="18" height="22">
                <use href="/sprite.svg#dairy" />
              </svg>
              <p>Щоденник</p>
            </Link>
          </li>
          <li>
            <Link href={'/profile'} className={css.navItem}>
              <svg width="22" height="22">
                <use href="/sprite.svg#profile" />
              </svg>
              <p>Профіль</p>
            </Link>
          </li>
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
  );
};

export default MobileMenu;
