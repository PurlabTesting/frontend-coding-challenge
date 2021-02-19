import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

type ModalProps = {
  onClose: () => void;
  children?: React.ReactChild | React.ReactChild[];
};
const Modal: React.FC<ModalProps> = ({
  onClose,
  children,
}) => {
  const classes = useStyles();

  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => e.code === 'Escape' && onClose();
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  });

  return (
    <div
      className={classes.root}
      onClick={onClose}
      role="presentation"
    >
      <div onClick={(e) => e.stopPropagation()} role="presentation">
        {children}
      </div>
    </div>
  );
};

export default Modal;
