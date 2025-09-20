"use client";

import Decor from "../../Decor";
import Form from "./LoginForm";

import css from "../Page.module.css";

import image from "@/public/img/logx2.jpg";

export default function RegisterPage() {
  return (
    <main className={css.wrapper}>
      <Form></Form>
      <Decor image={image} />
    </main>
  );
}
