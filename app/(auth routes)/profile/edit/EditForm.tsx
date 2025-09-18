'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import css from '../../auth/Page.module.css';
import style from '@/styles/Form.module.css';

import Logo from '@/public/icons/Logo.svg';
import Modal from '@/components/Modal/Modal';
import Image from 'next/image';
import Button from '@/components/ui/Button/Button';

import { AvatarPicker } from '@/components/AvatarPicker/AvatarPicker';
import { editProfile } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

type FormValues = {
  photo: File | null;
  gender: string;
  dueDate: string;
};

function EditForm() {
  const router = useRouter();
  const [succsess, setSuccsess] = useState(false);

  // STATE

  const setUser = useAuthStore(state => state.setUser);

  // FORMIK
  const initialValues = { photo: null, gender: '', dueDate: '' };

  const validationSchema = Yup.object({
    gender: Yup.string().required('Email обов’язковий'),
    dueDate: Yup.string().required('Пароль обов’язковий'),
  });

  const handleSubmit = async (formValues: FormValues) => {
    try {
      const formData = new FormData();

      if (formValues.photo) {
        formData.append('photo', formValues.photo);
      }

      formData.append('gender', formValues.gender);
      formData.append('dueDate', formValues.dueDate);

      const res = await editProfile(formData);

      if (res) {
        setUser(res.user);

        setSuccsess(true);
        router.push('/');
        return res;
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className={css.form_wrapper}>
      <div className={css.content_wrapper}>
        <Image
          src={Logo}
          alt="Leleka"
          className={css.logo}
          style={{ marginBottom: 70 }}
        />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ errors }) => (
            <Form className={css.form_content}>
              <h1 className={style.title} style={{ marginBottom: 0 }}>
                Давайте познаймимось ближче
              </h1>
              {/* Photo */}
              <AvatarPicker name="photo" btnTitle={'Завантажити фото'} />

              {/* Gender */}
              <div className={style.input_wrapper}>
                <label className={style.label}>Стать дитини*</label>
                <Field
                  type="text"
                  name="gender"
                  placeholder="Обери стать"
                  className={style.custom_input}
                  style={{ color: errors.gender && 'var(--color-red)' }}
                />
                <ErrorMessage
                  name="gender"
                  component="div"
                  className={style.error}
                />
              </div>
              {/* Date */}
              <div className={style.input_wrapper}>
                <label className={style.label}>Планова дата пологів*</label>
                <Field
                  type="text"
                  name="dueDate"
                  placeholder="Дата"
                  className={style.custom_input}
                  style={{ color: errors.dueDate && 'var(--color-red)' }}
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className={style.error}
                />
              </div>

              <Button type="submit">Зберегти</Button>
            </Form>
          )}
        </Formik>
      </div>
      {/* Modal */}
      {succsess && (
        <Modal title="Дані успішно змінено" onClose={() => setSuccsess(false)}>
          {''}
        </Modal>
      )}
    </div>
  );
}

export default EditForm;
