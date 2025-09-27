import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { NewDiaryData, Emotion } from '@/types/diary';
import * as Yup from 'yup';
import Button from '../ui/Button/Button';
import { createDiary } from '@/lib/api/clientApi';
import dayjs from 'dayjs';
import { useEmotionsStore } from '@/lib/store/emotionStore';
import { Autocomplete, TextField, Checkbox } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import css from './AddDiaryEntryForm.module.css';
import { useDiaryStore } from '@/lib/store/diaryStore';

const curDate = dayjs().format('YYYY-MM-DD');

const initialValues: NewDiaryData = {
  title: '',
  description: '',
  emotions: [],
  date: curDate,
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(1, 'Назва має містити щонайменше 1 символ')
    .max(64, 'Назва не може перевищувати 64 символи')
    .required('Назва обовʼязкова'),
  description: Yup.string()
    .min(1, 'Опис має містити щонайменше 1 символ')
    .max(1000, 'Опис не може перевищувати 1000 символів')
    .required('Опис обовʼязковий'),
  date: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Дата має бути у форматі YYYY-MM-DD')
    .required(),
  emotions: Yup.array()
    .of(Yup.string())
    .min(1, 'Обовʼязково вибрати хоча б одну емоцію')
    .max(12, 'Неможливо вибрати більше 12 емоцій')
    .required('Емоції обовʼязкові'),
});

interface Props {
  closeModal: () => void;
}

export default function AddDiaryEntryForm({ closeModal }: Props) {
  const queryClient = useQueryClient();
  const { emotions } = useEmotionsStore();
  const { fetchDiaries } = useDiaryStore();

  const { mutate } = useMutation({
    mutationFn: (diaryData: NewDiaryData) => createDiary(diaryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diaryDraft'] });
      fetchDiaries();
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        mutate(values, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['diaryDraft'] });
            resetForm(); // очищаємо форму після успіху
            closeModal();
          },
        });
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className={css.diaryList_form}>
          {/* Заголовок */}
          <div className={css.diaryList_fieldWrap}>
            <label htmlFor="title" className={css.diaryList_fieldLabel}>
              Заголовок
            </label>
            <Field
              name="title"
              type="text"
              className={css.diaryList_fieldInput}
              placeholder="Введіть заголовок запису"
            />
            <ErrorMessage
              name="title"
              component="span"
              className={css.diaryList_fieldError}
            />
          </div>

          {/* Емоції */}
          <div className={css.diaryList_fieldWrap}>
            <label htmlFor="emotions" className={css.diaryList_fieldLabel}>
              Категорії
            </label>
            <Autocomplete
              multiple
              disablePortal
              filterSelectedOptions
              options={emotions}
              getOptionLabel={option => option.title}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              value={emotions.filter(e => values.emotions.includes(e._id))} // клав я бовт на ту типізацію
              onChange={(_, newValue: Emotion[]) =>
                setFieldValue(
                  'emotions',
                  newValue.map(e => e._id)
                )
              }
              renderOption={(props, option, { selected }) => {
                const { key, ...rest } = props;
                return (
                  <li
                    key={key}
                    {...rest}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      borderRadius: 6,
                      backgroundColor: selected ? '#f0f0f0' : 'transparent',
                      padding: '6px 8px',
                      margin: '2px 0',
                    }}
                  >
                    <Checkbox
                      checked={selected}
                      icon={
                        <div
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: 4,
                            border: '1px solid #ccc',
                            backgroundColor: 'transparent',
                          }}
                        />
                      }
                      checkedIcon={
                        <div
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: 4,
                            border: '1px solid #000',
                            backgroundColor: '#000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <CheckIcon style={{ color: '#fff', fontSize: 14 }} />
                        </div>
                      }
                      sx={{ padding: 0, marginRight: 8 }}
                    />
                    {option.title}
                  </li>
                );
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { border: 'none' },
                      '&:hover fieldset': { border: 'none' },
                      '&.Mui-focused fieldset': { border: 'none' },
                      borderRadius: '12px',
                      backgroundColor: 'var(--color-neutral-lightest)',
                    },
                  }}
                  placeholder="Виберіть емоції"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              )}
            />

            <ErrorMessage
              name="emotions"
              component="span"
              className={css.diaryList_fieldError}
            />
          </div>

          {/* Опис */}
          <div className={css.diaryList_fieldWrap}>
            <label htmlFor="description" className={css.diaryList_fieldLabel}>
              Запис
            </label>
            <Field
              as="textarea"
              name="description"
              rows={8}
              className={css.diaryList_fieldInput}
              placeholder="Запишіть, як ви себе відчуваєте"
            />
            <ErrorMessage
              name="description"
              component="span"
              className={css.diaryList_fieldError}
            />
          </div>

          <Button type="submit">Зберегти</Button>
        </Form>
      )}
    </Formik>
  );
}
