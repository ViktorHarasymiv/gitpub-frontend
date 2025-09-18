"use client";

import Decor from "../../Decor";
import Form from "./RegisterForm";

import css from "../Page.module.css";

import image from "@/public/img/regx2.jpg";

export default function RegisterPage() {
  return (
    <main className={css.wrapper}>
      <Form />
      <Decor image={image} />
    </main>
  );
}
