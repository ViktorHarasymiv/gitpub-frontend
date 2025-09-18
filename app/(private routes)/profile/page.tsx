'use client';
import React, { useState } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { AvatarPicker } from '@/components/AvatarPicker/AvatarPicker';
import { editProfile } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

import css from './Style.module.css';
import style from '@/styles/Form.module.css';
import Modal from '@/components/Modal/Modal';
import Button from '@/components/ui/Button/Button';
import FormikSelect from '@/components/FormikSelect/FormikSelect';

/* MUI DATA */

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FormikDatePickerBirthday } from '@/components/FormikDatePicker/FormikDatePicker';

type FormValues = {
  name: string;
  email: string;
  gender: string;
  dueDate: string;
  photo: File | null;
};

const Profile = () => {
  const [succsess, setSuccsess] = useState(false);

  // STATE

  const { user } = useAuthStore();
  const setUser = useAuthStore(state => state.setUser);

  // FORMIK

  const initialValues = {
    name: user?.name || '',
    email: user?.email || '',
    gender: user?.gender || '',
    dueDate: user?.dueDate || '',
    photo: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Ім’я має містити щонайменше 2 символи')
      .required('Ім’я обов’язкове'),

    email: Yup.string()
      .email('Невірний формат email')
      .required('Email обов’язковий'),
    gender: Yup.string().required('Email обов’язковий'),
    dueDate: Yup.string().required('Пароль обов’язковий'),
  });

  const options = [
    { label: 'Хлопчик' },
    { label: 'Дівчинка' },
    { label: 'Ще не знаю' },
  ];

  const handleSubmit = async (formValues: FormValues) => {
    try {
      const formData = new FormData();

      if (formValues.photo) {
        formData.append('photo', formValues.photo);
      }
      formData.append('name', formValues.name);
      formData.append('email', formValues.email);
      formData.append('gender', formValues.gender);
      formData.append('dueDate', formValues.dueDate);

      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const res = await editProfile(formData);

      if (res) {
        setSuccsess(true);
        return res;
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const styles = {
    marginBottom: '32px',
    flexDirection: 'row',
    alignItems: 'start',
  };

  return (
    <>
      <div className={css.content_wrapper}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ errors, resetForm }) => (
            <Form className={css.form_content}>
              {/* Photo */}
              <AvatarPicker
                name="photo"
                initialPhoto={user?.photo || null}
                btnTitle={'Завантажити нове фото'}
                isContent={true}
                styles={styles}
              />

              {/* E-MAIL */}

              <div className={style.input_wrapper}>
                <label className={style.label}>Пошта</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="hello@leleka.com"
                  className={style.custom_input}
                  style={{ color: errors.email && 'var(--color-red)' }}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={style.error}
                />
              </div>

              {/* Name */}

              <div className={style.input_wrapper}>
                <label className={style.label}>Ім’я</label>
                <Field
                  type="text"
                  name="name"
                  placeholder="hello@leleka.com"
                  className={style.custom_input}
                  style={{ color: errors.name && 'var(--color-red)' }}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={style.error}
                />
              </div>

              {/* Gender */}
              <div className={style.input_wrapper}>
                <label className={style.label}>Стать дитини</label>
                <FormikSelect name="gender" options={options} />
                <ErrorMessage
                  name="gender"
                  component="div"
                  className={style.error}
                />
              </div>

              {/* Date */}
              <div className={style.input_wrapper}>
                <label className={style.label}>Планова дата пологів</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <FormikDatePickerBirthday name="dueDate" />
                </LocalizationProvider>

                <ErrorMessage
                  name="date"
                  component="div"
                  className={style.error}
                />
              </div>

              {/* Actions */}
              <div className={css.form_actions}>
                <Button
                  type="button"
                  action={() => resetForm()}
                  styles={{ maxWidth: 165 }}
                  alternative={true}
                >
                  Відмінити зміни
                </Button>
                <Button type="submit" styles={{ maxWidth: 165 }}>
                  Зберегти зміни
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {/* Modal */}
      {succsess && (
        <Modal
          title="Дані успішно змінено"
          onClose={() => setSuccsess(false)}
          style={{
            justifyContent: 'center',
            gap: 25,
            padding: 25,
            maxHeight: 250,
          }}
        >
          {''}
          <Button
            type="button"
            styles={{ maxWidth: 144, height: 44 }}
            action={() => window.location.reload()}
          >
            Готово
          </Button>
        </Modal>
      )}
    </>
  );
};
export default Profile;
