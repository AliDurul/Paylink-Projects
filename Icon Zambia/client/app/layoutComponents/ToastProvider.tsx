"use client";

import { Flip, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

interface ToastProviderProps {
    children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
    return (
        <>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Flip}
            />
        </>
    );
}