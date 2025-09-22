'use client';

import css from './ConfirmationModal.module.css';
import Modal from '../Modal/Modal';
import Button from '../ui/Button/Button';

interface ConfirmationModalProps {
  title: string;
  onClose: () => void;
  style?: object;
}

const styleObj = {
  maxHeight: 338,
};

export default function ConfirmationModal({
  title,
  onClose,
}: ConfirmationModalProps) {
  return (
    <Modal title={title} styles={styleObj} onClose={onClose}>
      <div className={css.actions}>
        <Button action={onClose} styles={{ maxWidth: 268 }}>
          Так
        </Button>
        <Button action={onClose} styles={{ maxWidth: 268 }} alternative={true}>
          Ні
        </Button>
      </div>
    </Modal>
  );
}
