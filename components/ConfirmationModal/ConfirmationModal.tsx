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
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
  style,
}: ConfirmationModalProps) {
  return (
    <Modal title={title} onClose={onCancel} style={style}>
      <div className={css.actions}>
        <Button action={onConfirm}>{confirmButtonText}</Button>
        <Button action={onCancel} alternative>
          {cancelButtonText}
        </Button>
      </div>
    </Modal>
  );
}
