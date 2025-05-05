// Helper functions for showing messages to users
import { toast } from 'react-toastify';

// Show a success message
export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: 'top-right'
    });
};

// Show an error message
export const handleError = (msg) => {
    toast.error(msg, {
        position: 'top-right'
    });
};