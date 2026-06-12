import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ListToolbar from '@/Components/ListToolbar';
import RowActions from '@/Components/RowActions';
import { Table, Pagination, Badge, BoolIcon } from '@/Components/Table';
import { useT } from '@/i18n';

const statusColor = { open: 'yellow', in_progress: 'blue', closed: 'green' };

export default function Index({ tickets, filters }) {
    const { t } = useT();

    return (
        <AdminLayout title={t('resources.support_tickets')}>
            <Head title={t('resources.support_tickets')} />

            <ListToolbar
                routeName="admin.support-tickets.index"
                filters={filters}
                selectFilters={[{
                    key: 'status',
                    label: t('fields.status'),
                    options: ['open', 'in_progress', 'closed'].map((v) => ({ value: v, label: t(`values.${v}`) })),
                }]}
            />

            <Table columns={[t('fields.user'), t('fields.subject'), t('fields.status'), t('fields.replied'), t('fields.created_at'), t('ui.actions')]}
                rows={tickets.data}
                renderRow={(tk) => (
                    <tr key={tk.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-800">{tk.user?.name || '—'}</td>
                        <td className="px-4 py-3 text-gray-600">{(tk.subject || '').slice(0, 40)}</td>
                        <td className="px-4 py-3"><Badge color={statusColor[tk.status] || 'gray'}>{t(`values.${tk.status}`)}</Badge></td>
                        <td className="px-4 py-3"><BoolIcon value={!!tk.admin_reply} /></td>
                        <td className="px-4 py-3 text-gray-500">{new Date(tk.created_at).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                            <RowActions editRoute="admin.support-tickets.edit" editParams={tk.id} deleteRoute="admin.support-tickets.destroy" deleteParams={tk.id} />
                        </td>
                    </tr>
                )}
            />
            <Pagination links={tickets.links} />
        </AdminLayout>
    );
}
