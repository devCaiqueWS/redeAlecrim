import React from 'react';
import { ToastContainer as RTToastContainer, toast as rtToast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info', options?: object) => {
  switch (type) {
    case 'success':
      rtToast.success(message, options);
      break;
    case 'error':
      rtToast.error(message, options);
      break;
    case 'info':
    default:
      rtToast.info(message, options);
      break;
  }
};

export const ToastContainer: React.FC = () => {
  return (
    <RTToastContainer
      position="top-right"
      autoClose={8000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      aria-label="Notificações"
    />
  );
};
