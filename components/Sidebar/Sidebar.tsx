import React from "react";
import Link from "next/link";

// Style

import css from "./Page.module.css";

import Logo from "@/public/icons/Logo.svg";

// Components

import { Navigation } from "./Navigation";
import Image from "next/image";
import FooterAction from "./FooterAction";

export const SideBar = () => {
  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.content_wrapper}>
          <nav>
            <Link href="/" className={css.logo_link}>
              <Image src={Logo} alt="" className={css.logo} />
            </Link>
            <Navigation />
          </nav>
          <FooterAction />
        </div>
      </div>
    </header>
  );
};
