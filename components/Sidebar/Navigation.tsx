"use client";

import React from "react";

import { usePathname } from "next/navigation";

import clsx from "clsx";

import css from "./Page.module.css";
import Link from "next/link";
import { Icon } from "../ui/Icon/Icon";

export const Navigation = () => {
  const pathname = usePathname();

  const navigationObj = [
    {
      title: "Мій день",
      path: "/",
      icon: "today",
    },
    {
      title: "Подорож",
      path: "/journey",
      icon: "conversion",
    },
    {
      title: "Щоденник",
      path: "/diary",
      icon: "book",
    },
    {
      title: "Профіль",
      path: "/profile",
      icon: "account",
    },
  ];
  return (
    <ul className={css.navigation}>
      {navigationObj.map((item, index) => {
        return (
          <li key={index} className={css.item}>
            <Link
              className={clsx(css.link, pathname === item.path && css.active)}
              href={item.path}
            >
              <Icon name={item.icon} width={24} height={24}></Icon> {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
