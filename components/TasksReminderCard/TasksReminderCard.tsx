"use client";

import React, { useState } from "react";

import style from "@/app/(private routes)/Page.module.css";
import iconStyle from "@/components/ui/Icon/Style.module.css";

import css from "./Style.module.css";

import Icon from "@/public/icons/circle.svg";
import Image from "next/image";
import Modal from "../Modal/Modal";
import Button from "../ui/Button/Button";

function TasksReminderCard() {
  const [switchModal, setSwitchModal] = useState(false);

  return (
    <>
      <div className={css.task_form}>
        <div className={css.title_wrapper}>
          <h3 className={style.block_title}>Важливі завдання</h3>
          <Image
            onClick={() => setSwitchModal(true)}
            src={Icon}
            alt="Open form button"
            className={iconStyle.icon}
          />
        </div>
        <div className={css.greating_block}>
          <b>Наразі немає жодних завдань</b>
          <p className={css.about_text}>Створіть мершій нове завдання!</p>
          <Button
            type={"button"}
            styles={{ maxWidth: 191 }}
            action={() => setSwitchModal(true)}
          >
            {"Створити завдання"}
          </Button>
        </div>
      </div>
      {/* Modal */}
      {switchModal && (
        <Modal
          onClose={() => setSwitchModal(false)}
          title={"Нове завдання"}
          style={{ maxHeight: 472 }}
        >
          <div className={css.modal_content}></div>
          <Button styles={{ maxWidth: 268 }}>{"Зберегти"}</Button>
        </Modal>
      )}
    </>
  );
}

export default TasksReminderCard;
