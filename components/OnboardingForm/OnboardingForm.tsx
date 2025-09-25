'use client';

import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import styles from './OnboardingForm.module.css';
import Button from '@/components/ui/Button/Button';
import Logo from '@/public/icons/Logo.svg';
import Image from 'next/image';
import { AvatarPicker } from '@/components/AvatarPicker/AvatarPicker';
import FormikSelect from '@/components/FormikSelect/FormikSelect';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormikDatePickerBirthday } from '@/components/FormikDatePicker/FormikDatePicker';

type FormValues = {
  gender: string;
  dueDate: string;
  avatar: File | null;
};

export default function OnboardingForm() {
  const initialValues: FormValues = {
    gender: '',
    dueDate: '',
    avatar: null,
  };

  const validationSchema = Yup.object({
    gender: Yup.string().required('Оберіть стать'),
    dueDate: Yup.string().required('Вкажіть дату'),
  });

  const genderOptions = [
    { label: 'хлопчик', value: 'boy' },
    { label: 'дівчинка', value: 'girl' },
    { label: 'Ще не знаю', value: 'unknown' },
  ];

  const handleSubmit = (values: FormValues) => {
    console.log('Форма отправлена:', values);
  };

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
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Давайте познайомимося ближче</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className={styles.form}>
                <AvatarPicker
                  name="avatar"
                  btnTitle="Завантажити фото"
                />
                <div className={styles.field}>
                  <label htmlFor="gender" className={styles.label}>
                    Стать дитини
                  </label>
                  <FormikSelect name="gender" options={genderOptions} />
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className={styles.error}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="dueDate" className={styles.label}>
                    Планова дата пологів
                  </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <FormikDatePickerBirthday name="dueDate" />
                  </LocalizationProvider>
                  <ErrorMessage
                    name="dueDate"
                    component="div"
                    className={styles.error}
                  />
                </div>
                <div className={styles.submitWrap}>
                  <Button
                    type="submit"
                    styles={{ width: '100%' }}
                    aria-label="Зберегти"
                  >
                    Зберегти
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <aside className={styles.illustration} aria-hidden="true" />
    </section>
  );
}
