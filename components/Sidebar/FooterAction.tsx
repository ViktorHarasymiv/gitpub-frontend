"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./Page.module.css";

import { logout } from "@/lib/api/clientApi";
import Image from "next/image";

import Avatar from "@/public/img/avatarPreview.png";
import { Icon } from "../ui/Icon/Icon";

function FooterAction() {
  const router = useRouter();

  const { isAuthenticated, user } = useAuthStore();

  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push("/auth/login");
  };

  if (!isAuthenticated) {
    return (
      <div className={css.footer_action}>
        <Link href={"/auth/login"}>Увійти</Link>
        <span></span>
        <Link href={"/auth/register"}>Зареєструватись</Link>
      </div>
    );
  }

  return (
    <div className={css.user_wrapper}>
      <Image
        src={user?.photo || Avatar}
        alt="Avatar"
        width={40}
        height={40}
        className={css.user_avatar}
      />
      <div className={css.user_content}>
        <span>{user?.name}</span>
        <span>{user?.email}</span>
      </div>
      <Icon name={"logout"} action={handleLogout} />
    </div>
  );
}

export default FooterAction;
