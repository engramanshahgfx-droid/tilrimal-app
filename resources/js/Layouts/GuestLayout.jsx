import React from 'react';
import { useT } from '@/i18n';
import Icon from '@/Components/Icons';

export default function GuestLayout({ children }) {
    const { locale } = useT();

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-400 via-teal-500 to-teal-700 p-4">
            {/* decorative glows */}
            <div className="absolute -top-32 -start-32 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -bottom-32 -end-32 h-96 w-96 rounded-full bg-stone-900/10 blur-3xl" />

            {/* Language switcher */}
            <div className="absolute top-5 end-5 z-10 flex items-center gap-1 rounded-full bg-white/20 p-1 ring-1 ring-white/30 backdrop-blur">
                <Icon name="globe" className="w-4 h-4 text-white mx-1.5" />
                <a
                    href="/switch-lang/ar"
                    className={`rounded-full px-3 py-1 text-sm font-semibold transition ${locale === 'ar' ? 'bg-white text-teal-700 shadow' : 'text-white/90 hover:text-white'}`}
                >
                    العربية
                </a>
                <a
                    href="/switch-lang/en"
                    className={`rounded-full px-3 py-1 text-sm font-semibold transition ${locale === 'en' ? 'bg-white text-teal-700 shadow' : 'text-white/90 hover:text-white'}`}
                >
                    English
                </a>
            </div>

            <div className="relative w-full max-w-4xl">
                {children}
            </div>
        </div>
    );
}
