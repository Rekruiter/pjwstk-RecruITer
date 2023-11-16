import { FC, PropsWithChildren, ReactNode, useEffect } from 'react';
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
      onClick={onClose}
      id="backdrop"></div>
  );
};

const ModalOverlay = ({ children, hiding }: { children: ReactNode; hiding: boolean }) => {
  return (
    <div
      className={`fixed bg-transparent z-30 shadow-2xl overflow-hidden ${styles.modal} flex ${
        hiding ? styles.modalHide : ''
      }`}
      id="modal">
      {children}
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal: FC<PropsWithChildren<ModalProps>> = ({ children, onClose, hiding }) => {
  //Prevent blur effect on modal
  const addSmoothBoundariesToModal = () => {
    const backdropElement = document.getElementById('backdrop') as HTMLElement;
    const overlaysRect = backdropElement.getBoundingClientRect();
    const modalElement = document.getElementById('modal') as HTMLElement;
    if (window.innerWidth > 1080) {
      const newWidth =
        Math.ceil(overlaysRect.width / 2) % 2 === 0
          ? Math.ceil(overlaysRect.width / 2)
          : Math.ceil(overlaysRect.width / 2) + 1;
      modalElement['style'].width = newWidth.toString() + 'px';
    } else {
      const newWidth =
        Math.ceil(overlaysRect.width) % 2 === 0 ? Math.ceil(overlaysRect.width) : Math.ceil(overlaysRect.width) + 1;
      modalElement['style'].width = newWidth.toString() + 'px';
    }
  };

  useEffect(() => {
    addSmoothBoundariesToModal();
    window.addEventListener('resize', addSmoothBoundariesToModal);
    return () => {
      window.removeEventListener('resize', addSmoothBoundariesToModal);
    };
  }, []);

  if (!portalElement) return null;
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose}></Backdrop>, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay hiding={hiding}>{children}</ModalOverlay>, portalElement)}
    </>
  );
};

export default Modal;
