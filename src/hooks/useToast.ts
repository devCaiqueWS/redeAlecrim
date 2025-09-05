import { toast as rtToast } from 'react-toastify';

export const useToast = () => {
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info', options?: object) => {
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

  return {
    showToast,
    showSuccess: (msg: string, options?: object) => showToast(msg, 'success', options),
    showError: (msg: string, options?: object) => showToast(msg, 'error', options),
    showInfo: (msg: string, options?: object) => showToast(msg, 'info', options),
  };
};
