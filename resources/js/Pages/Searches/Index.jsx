import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Table, Pagination } from '@/Components/Table';
import { useT } from '@/i18n';

export default function Index({ searches }) {
    const { t } = useT();

    return (
        <AdminLayout title={t('resources.searches')}>
            <Head title={t('resources.searches')} />

            <Table
                columns={[t('fields.type'), t('fields.payload'), t('fields.user'), t('fields.created_at')]}
                rows={searches.data}
                renderRow={(s) => (
                    <tr key={s.id} className="hover:bg-gray-50 align-top">
                        <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{t(`values.${s.type}`)}</td>
                        <td className="px-4 py-3 text-gray-600">
                            <code className="text-xs break-all">{JSON.stringify(s.payload)}</code>
                        </td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{s.user?.name || '—'}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                            {s.created_at ? new Date(s.created_at).toLocaleString() : '—'}
                        </td>
                    </tr>
                )}
            />
            <Pagination links={searches.links} />
        </AdminLayout>
    );
}
