import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useFormikContext } from 'formik';
import dayjs, { Dayjs } from 'dayjs';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface Props {
  name: keyof FormValues;
  mxWidth?: number;
}

interface FormValues {
  dueDate?: string;
  date?: string;
}

export const FormikDatePickerBirthday = ({ name, mxWidth }: Props) => {
  const { values, setFieldValue } = useFormikContext<FormValues>();

  const value: Dayjs | null = values[name] ? dayjs(values[name]) : null;

  const handleChange = (newValue: Dayjs | null) => {
    if (newValue && newValue.isValid()) {
      setFieldValue(name, newValue.toISOString());
      console.log(newValue.toISOString());
    } else {
      setFieldValue(name, '');
    }
  };

  return (
    <DesktopDatePicker
      format="DD/MM/YY"
      value={value}
      onChange={handleChange}
      slots={{
        openPickerIcon: KeyboardArrowDownIcon,
      }}
      slotProps={{
        textField: {
          sx: {
            width: '100%',
            maxWidth: mxWidth,
            // Стилізація рамки
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent',
              borderStyle: 'none',
              borderWidth: '1px',
              background: 'var(--opacity-neutral-darkest-5)',
            },

            // Стилізація інпуту
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              color: 'var(--color-neutral)',
              paddingLeft: '3px',
              paddingRight: '9px',
            },

            // Стилізація контейнера секцій (для input mode = 'sections')
            '& .MuiPickersOutlinedInput-sectionsContainer': {
              padding: '9.5px',
            },
          },
        },
      }}
    />
  );
};
