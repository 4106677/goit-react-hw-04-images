import PropTypes from 'prop-types';
import { Overlay, ModalCard } from './Modal.styled';

import { useEffect } from 'react';

export default function Modal({ onCloseModal, src, alt }) {
  useEffect(() => {
    window.addEventListener('keydown', handleCloseModal);

    return () => {
      window.removeEventListener('keydown', handleCloseModal);
    };
  });

  const handleCloseModal = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalCard>
        <img src={src} alt={alt} />
      </ModalCard>
    </Overlay>
  );
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
