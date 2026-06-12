import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ListToolbar from '@/Components/ListToolbar';
import RowActions from '@/Components/RowActions';
import { Table, Pagination, BoolIcon, Badge } from '@/Components/Table';
import { useT } from '@/i18n';

export default function Index({ users, filters }) {
    const { t } = useT();

    return (
        <AdminLayout title={t('resources.users')}>
            <Head title={t('resources.users')} />

            <ListToolbar
                routeName="admin.users.index"
                createRoute="admin.users.create"
                filters={filters}
                selectFilters={[
                    {
                        key: 'is_active',
                        label: t('fields.is_active'),
                        options: [{ value: '1', label: t('ui.yes') }, { value: '0', label: t('ui.no') }],
                    },
                    {
                        key: 'phone_verified',
                        label: t('fields.phone_verified'),
                        options: [{ value: '1', label: t('ui.yes') }, { value: '0', label: t('ui.no') }],
                    },
                ]}
            />

            <Table columns={[t('fields.name'), t('fields.email'), t('fields.phone'), t('fields.is_admin'), t('fields.is_active'), t('fields.phone_verified'), t('ui.actions')]}
                rows={users.data}
                renderRow={(u) => (
                    <tr key={u.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-800">{u.name}</td>
                        <td className="px-4 py-3 text-gray-600">{u.email}</td>
                        <td className="px-4 py-3 text-gray-600">{u.phone || '—'}</td>
                        <td className="px-4 py-3">{u.is_admin ? <Badge color="teal">{t('fields.is_admin')}</Badge> : '—'}</td>
                        <td className="px-4 py-3"><BoolIcon value={u.is_active} /></td>
                        <td className="px-4 py-3"><BoolIcon value={u.phone_verified} /></td>
                        <td className="px-4 py-3">
                            <RowActions editRoute="admin.users.edit" editParams={u.id} deleteRoute="admin.users.destroy" deleteParams={u.id} />
                        </td>
                    </tr>
                )}
            />
            <Pagination links={users.links} />
        </AdminLayout>
    );
}
