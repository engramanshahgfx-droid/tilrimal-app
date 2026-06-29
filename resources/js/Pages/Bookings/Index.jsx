import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ListToolbar from '@/Components/ListToolbar';
import RowActions from '@/Components/RowActions';
import { Table, Pagination, Badge } from '@/Components/Table';
import { useT } from '@/i18n';

const statusColor = { booked: 'green', cancelled: 'red', pending: 'yellow' };

export default function Index({ bookings, filters }) {
    const { t } = useT();

    return (
        <AdminLayout title={t('resources.bookings')}>
            <Head title={t('resources.bookings')} />

            <ListToolbar
                routeName="admin.bookings.index"
                createRoute="admin.bookings.create"
                filters={filters}
                selectFilters={[
                    {
                        key: 'type',
                        label: t('fields.type'),
                        options: ['flight', 'hotel', 'package', 'activity'].map((v) => ({ value: v, label: t(`values.${v}`) })),
                    },
                    {
                        key: 'status',
                        label: t('fields.status'),
                        options: ['pending', 'booked', 'cancelled'].map((v) => ({ value: v, label: t(`values.${v}`) })),
                    },
                ]}
            />

            <Table columns={[t('fields.user'), t('fields.type'), t('fields.status'), t('fields.price'), t('fields.created_at'), t('ui.actions')]}
                rows={bookings.data}
                renderRow={(b) => (
                    <tr key={b.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-800">{b.user?.name || '—'}</td>
                        <td className="px-4 py-3"><Badge color="teal">{t(`values.${b.type}`)}</Badge></td>
                        <td className="px-4 py-3"><Badge color={statusColor[b.status] || 'gray'}>{t(`values.${b.status}`)}</Badge></td>
                        <td className="px-4 py-3 text-gray-600">{b.price} SAR</td>
                        <td className="px-4 py-3 text-gray-500">{new Date(b.created_at).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                            <RowActions editRoute="admin.bookings.edit" editParams={b.id} deleteRoute="admin.bookings.destroy" deleteParams={b.id} />
                        </td>
                    </tr>
                )}
            />
            <Pagination links={bookings.links} />
        </AdminLayout>
    );
}
