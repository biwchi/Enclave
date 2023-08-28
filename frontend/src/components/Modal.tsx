import CloseIcon from '@/assets/icons/CloseIcon';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useOnClickOutside } from 'usehooks-ts';

type ModalProps = {
  opened: boolean;
  modalContent: JSX.Element;
  modalTitle?: string;
  closeModal: () => void;
};

export default function Modal({ opened, modalTitle, modalContent, closeModal }: ModalProps) {
  const modal = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(modal, () => closeModal());
  return (
    <>
      {opened &&
        createPortal(
          <div className="fixed left-0 top-0 z-[999999] flex h-full w-full items-center justify-center bg-black/20">
            <div ref={modal} className="min-w-[30rem] rounded-3xl bg-white p-5   shadow-md">
              <div className="flex items-center justify-between">
                <h1>{modalTitle}</h1>
                <div
                  className="cursor-pointer rounded-full bg-primary-600 p-2"
                  onClick={closeModal}>
                  <CloseIcon className="text-white" width={25} height={25} />
                </div>
              </div>
              <div className="mt-3">{modalContent}</div>
            </div>
          </div>,
          document.getElementById('root')!
        )}
    </>
  );
}
