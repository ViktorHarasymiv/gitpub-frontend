import React from "react";

import css from "../../auth/Page.module.css";
import EditForm from "./EditForm";
import Decor from "../../Decor";

import Image from "@/public/img/aboutx2.jpg";

function main() {
  return (
    <main className={css.wrapper}>
      <EditForm />
      <Decor image={Image} />
    </main>
  );
}

export default main;
