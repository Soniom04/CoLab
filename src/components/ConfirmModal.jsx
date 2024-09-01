import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <h2 className="text-xl font-bold mb-4">Confirm Action</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;