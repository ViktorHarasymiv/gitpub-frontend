'use client';

import css from './ConfirmationModal.module.css';
import Modal from '../Modal/Modal';
import Button from '../ui/Button/Button';

interface ConfirmationModalProps {
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
  style?: object;
}

export default function ConfirmationModal({
  title,
  onConfirm,
  onCancel,
  style,
}: ConfirmationModalProps) {
  return (
    <Modal onClose={onCancel} style={style}>
      <div className={css.actions}>
        <h1>{title}</h1>
        <Button action={() => onConfirm}>Так</Button>
        <Button action={() => onCancel} alternative={true}>
          Ні
        </Button>
      </div>
    </Modal>
  );
}
