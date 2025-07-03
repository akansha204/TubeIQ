"use client"

import { Toaster } from 'react-hot-toast'

export default function ToastProvider() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 3000,
                style: {
                    background: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                },
                success: {
                    iconTheme: {
                        primary: '#10B981',
                        secondary: 'white',
                    },
                },
                error: {
                    iconTheme: {
                        primary: '#EF4444',
                        secondary: 'white',
                    },
                },
            }}
        />
    )
}
