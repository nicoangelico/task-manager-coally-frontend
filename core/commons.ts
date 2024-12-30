import toast from 'react-hot-toast';

export const handleSuccess = (message = 'Everything went well') => {
  toast.success(message);
};

export const handleError = (error: string) => {
  toast.error(error);
};
