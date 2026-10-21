import { createInertiaApp } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import AuthLayout from '@/layouts/auth-layout';

const appName = import.meta.env.VITE_APP_NAME || 'Dota Tracker';

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => (name.startsWith('auth/') ? AuthLayout : AppLayout),
    strictMode: true,
    progress: {
        color: '#EAB308',
    },
});
