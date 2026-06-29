import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Badge } from '@/Components/Table';
import Icon from '@/Components/Icons';
import { useT } from '@/i18n';

function StatCard({ icon, label, value, desc, color }) {
    const tones = {
        teal: 'bg-teal-50 text-teal-600 ring-teal-100',
        green: 'bg-green-50 text-green-600 ring-green-100',
        blue: 'bg-blue-50 text-blue-600 ring-blue-100',
        amber: 'bg-amber-50 text-amber-600 ring-amber-100',
    };
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${tones[color]}`}>
                    <Icon name={icon} className="w-6 h-6" />
                </span>
            </div>
            <p className="mt-4 text-3xl font-bold text-slate-800">{value}</p>
            <p className="mt-0.5 text-sm font-medium text-slate-600">{label}</p>
            {desc && <p className="mt-1 text-xs text-slate-400">{desc}</p>}
        </div>
    );
}

const statusColor = { booked: 'green', cancelled: 'red', pending: 'yellow' };

export default function Dashboard({ stats, recent_bookings }) {
    const { t } = useT();
    return (
        <AdminLayout title={t('dashboard.title')}>
            <Head title={t('dashboard.title')} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon="users" label={t('dashboard.users')} value={stats.users} desc={t('dashboard.users_desc')} color="teal" />
                <StatCard icon="bookings" label={t('dashboard.bookings')} value={stats.bookings} desc={t('dashboard.bookings_desc')} color="green" />
                <StatCard icon="check" label={t('dashboard.confirmed_bookings')} value={stats.confirmed_bookings} desc={t('dashboard.confirmed_bookings_desc')} color="blue" />
                <StatCard icon="support_tickets" label={t('dashboard.open_tickets')} value={stats.open_tickets} desc={t('dashboard.open_tickets_desc')} color="amber" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <StatCard icon="packages" label={t('dashboard.packages')} value={stats.packages} color="teal" />
                <StatCard icon="offers" label={t('dashboard.offers')} value={stats.offers} color="green" />
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
                    <Icon name="bookings" className="w-5 h-5 text-teal-600" />
                    <h2 className="font-semibold text-slate-800">{t('dashboard.recent_bookings')}</h2>
                </div>
                <div className="divide-y divide-slate-100">
                    {recent_bookings.length === 0 && <p className="px-5 py-6 text-sm text-slate-400">{t('ui.no_records')}</p>}
                    {recent_bookings.map((b) => (
                        <div key={b.id} className="flex items-center justify-between gap-3 px-5 py-3.5 text-sm hover:bg-slate-50/60">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500 uppercase">
                                    {(b.user?.name || '?').charAt(0)}
                                </div>
                                <span className="font-medium text-slate-700">{b.user?.name || '—'}</span>
                            </div>
                            <Badge color="teal">{t(`values.${b.type}`)}</Badge>
                            <Badge color={statusColor[b.status] || 'gray'}>{t(`values.${b.status}`)}</Badge>
                            <span className="font-semibold text-slate-800">{b.price} <span className="text-xs font-normal text-slate-400">SAR</span></span>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
