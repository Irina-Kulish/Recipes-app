import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => (
  <div
    className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-50"
    onClick={onClose}
  >
    <div
      className="mt-20 max-h-[90vh] w-full md:w-2/3 lg:w-1/2 overflow-y-auto bg-white rounded-lg p-6 relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={onClose} className="text-red-500 absolute top-2 right-2">X</button>
      {children}
    </div>
  </div>
);

export default Modal;
