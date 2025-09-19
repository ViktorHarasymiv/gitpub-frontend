'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import css from './Breadcrumbs.module.css';

const routeNames: Record<string, string> = {
  '': 'Мій день',
  journey: 'Подорож',
  diary: 'Щоденник',
  profile: 'Профіль',
};

const Breadcrumbs = () => {
  const path = usePathname();
  const segments = path.split('/').filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = routeNames[segment] || decodeURIComponent(segment);
    return { href, label };
  });

  return (
    <ul className={css.breadcrumbsContainer}>
      <li>
        <span>Лелека</span>
        {
          <span className={css.arrow}>
            <svg width="6" height="11">
              <use href="/sprite.svg#arrow-right" />
            </svg>
          </span>
        }
      </li>
      {segments.length === 0 && (
        <li>
          <span>Мій день</span>
        </li>
      )}
      {breadcrumbs.map((crumb, index) => (
        <li key={crumb.href}>
          <Link href={crumb.href}>{crumb.label}</Link>
          {index < breadcrumbs.length - 1 && (
            <span className={css.arrow}>
              {
                <svg width="6" height="11">
                  <use href="/sprite.svg#arrow-right" />
                </svg>
              }
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumbs;
