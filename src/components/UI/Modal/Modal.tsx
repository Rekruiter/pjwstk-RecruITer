import { FC, PropsWithChildren, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

interface ModalProps {
  onClose: () => void;
  hiding: boolean;
}

const Backdrop = ({ onClose }: Pick<ModalProps, 'onClose'>) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-30"
      onClick={onClose}></div>
  );
};

const ModalOverlay = ({ children, hiding }: { children: ReactNode; hiding: boolean }) => {
  return (
    <div
      className={`fixed bg-transparent z-30 ${styles.modal} flex ${
        hiding ? styles.modalHide : ''
      }`}>
      {children}
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal: FC<PropsWithChildren<ModalProps>> = ({ children, onClose, hiding }) => {
  if (!portalElement) return null;
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay hiding={hiding}>{children}</ModalOverlay>,
        portalElement,
      )}
    </>
  );
};

export default Modal;
