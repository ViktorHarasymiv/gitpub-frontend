'use client';

import styles from './OnboardingForm.module.css';
import Button from '@/components/ui/Button/Button';
import Logo from '@/public/icons/Logo.svg';
import Image from 'next/image';
import React from 'react';

export default function OnboardingForm() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.formCard}>
        <div className={styles.logoBox}>
          <Image
            src={Logo}
            alt="Leleka"
            fill
            priority
            className={styles.logoImg}
          />
        </div>
        <div className="formContainer">
          <h1 className={styles.title}>Давайте познайомимося ближче</h1>
          <div className={styles.avatarBlock}>
            <div className={styles.avatar}>
              <Image
                src="/img/avatarimagex2.png"
                alt="Аватар"
                fill
                sizes="(min-width: 1440px) 179px, 164px"
                className={styles.avatarImg}
              />
            </div>
            <Button
              type="button"
              alternative={true}
              styles={{ width: 220 }}
            >
              Завантажити фото
            </Button>
          </div>

          <form className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="gender" className={styles.label}>Стать дитини</label>
              <select id="gender" className={styles.select} defaultValue="">
                <option value="">Оберіть стать</option>
                <option value="boy">Хлопчик</option>
                <option value="girl">Дівчинка</option>
                <option value="unknown">Ще не знаю</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="birthday" className={styles.label}>Планова дата пологів</label>
              <input id="birthday" type="date" className={styles.input} />
            </div>
            <Button type="submit">Зберегти</Button>
          </form>
        </div>
      </div>

      <aside className={styles.illustration} aria-hidden="true" />
    </section>
  );
}
