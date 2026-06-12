import React, { useState, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { useT } from '@/i18n';
import Icon from '@/Components/Icons';

const navItems = [
    { key: 'dashboard', route: 'admin.dashboard', match: '/admin' },
    { key: 'users', route: 'admin.users.index', match: '/admin/users' },
    { key: 'activities', route: 'admin.activities.index', match: '/admin/activities' },
    { key: 'packages', route: 'admin.packages.index', match: '/admin/packages' },
    { key: 'offers', route: 'admin.offers.index', match: '/admin/offers' },
    { key: 'bookings', route: 'admin.bookings.index', match: '/admin/bookings' },
    { key: 'support_tickets', route: 'admin.support-tickets.index', match: '/admin/support-tickets' },
];

function Flash() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setVisible(true);
        if (flash?.success || flash?.error) {
            const timer = setTimeout(() => setVisible(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash?.success, flash?.error]);

    if (!visible || (!flash?.success && !flash?.error)) return null;

    return (
        <div className={`mb-5 flex items-center gap-2 rounded-xl px-4 py-3 text-sm shadow-sm ${flash.success ? 'bg-green-50 text-green-700 ring-1 ring-green-200' : 'bg-red-50 text-red-700 ring-1 ring-red-200'}`}>
            <Icon name={flash.success ? 'check' : 'support_tickets'} className="w-4 h-4 shrink-0" />
            <span>{flash.success || flash.error}</span>
        </div>
    );
}

export default function AdminLayout({ title, actions, children }) {
    const { t, locale, isRtl } = useT();
    const { auth } = usePage().props;
    const { url } = usePage();
    const [open, setOpen] = useState(false);

    const isActive = (item) =>
        item.match === '/admin' ? url === '/admin' : url.startsWith(item.match);

    const otherLocale = locale === 'ar' ? 'en' : 'ar';
    const logout = () => router.post(route('admin.logout'));
    const initials = (auth?.user?.name || 'A').trim().charAt(0);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            {/* Sidebar — always anchored to the logical start edge (right in RTL, left in LTR) */}
            <aside className={`fixed top-0 bottom-0 start-0 z-40 w-64 flex flex-col bg-gradient-to-b from-teal-500 to-teal-600 text-stone-900 shadow-xl transform transition-transform duration-200 ${open ? 'translate-x-0' : (isRtl ? 'translate-x-full' : '-translate-x-full')} lg:translate-x-0`}>
                <div className="h-16 flex items-center gap-2.5 px-6 border-b border-black/10">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-900 font-bold text-teal-400">ر</div>
                    <span className="text-lg font-bold tracking-tight text-stone-900">{t('app_name')}</span>
                </div>

                <nav className="flex-1 overflow-y-auto p-3 space-y-1">
                    {navItems.map((item) => {
                        const active = isActive(item);
                        return (
                            <Link
                                key={item.key}
                                href={route(item.route)}
                                onClick={() => setOpen(false)}
                                className={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                                    active ? 'bg-white text-teal-700 shadow-sm' : 'text-stone-800 hover:bg-white/25'
                                }`}
                            >
                                <Icon name={item.key} className={`w-5 h-5 shrink-0 ${active ? 'text-teal-700' : 'text-stone-700 group-hover:text-stone-900'}`} />
                                <span>{t(`nav.${item.key}`)}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-black/10 text-xs text-stone-700">
                    © {new Date().getFullYear()} {t('app_name')}
                </div>
            </aside>

            {open && <div className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} />}

            {/* Main column — padding on the logical start edge to clear the sidebar */}
            <div className="lg:ps-64">
                <header className="sticky top-0 z-20 h-16 bg-white/80 backdrop-blur border-b border-slate-200 flex items-center justify-between px-4 lg:px-6">
                    <div className="flex items-center gap-3">
                        <button className="lg:hidden text-slate-600 hover:text-slate-900" onClick={() => setOpen(!open)} aria-label="menu">
                            <Icon name="menu" className="w-6 h-6" />
                        </button>
                        <span className="text-sm font-medium text-slate-400 hidden lg:inline">{t('app_name')} · {t('nav.dashboard')}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <a
                            href={`/switch-lang/${otherLocale}`}
                            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
                        >
                            <Icon name="globe" className="w-4 h-4" />
                            {otherLocale === 'ar' ? 'العربية' : 'English'}
                        </a>
                        <div className="hidden sm:flex items-center gap-2 ps-1">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700 uppercase">{initials}</div>
                            <span className="text-sm font-medium text-slate-700">{auth?.user?.name}</span>
                        </div>
                        <button
                            onClick={logout}
                            className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-100 transition"
                        >
                            <Icon name="logout" className="w-4 h-4" />
                            <span className="hidden sm:inline">{t('ui.logout')}</span>
                        </button>
                    </div>
                </header>

                <main className="p-4 lg:p-8 max-w-7xl mx-auto">
                    <Flash />
                    {(title || actions) && (
                        <div className="mb-6 flex items-center justify-between gap-3">
                            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h2>
                            {actions}
                        </div>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
