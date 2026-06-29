import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ListToolbar from '@/Components/ListToolbar';
import RowActions from '@/Components/RowActions';
import { Table, Pagination, BoolIcon, Badge } from '@/Components/Table';
import { useT, storageUrl } from '@/i18n';

export default function Index({ packages, filters }) {
    const { t } = useT();

    return (
        <AdminLayout title={t('resources.packages')}>
            <Head title={t('resources.packages')} />

            <ListToolbar
                routeName="admin.packages.index"
                createRoute="admin.packages.create"
                filters={filters}
                selectFilters={[
                    {
                        key: 'trip_type',
                        label: t('fields.trip_type'),
                        options: [{ value: 'local', label: t('values.local') }, { value: 'international', label: t('values.international') }],
                    },
                    {
                        key: 'is_active',
                        label: t('fields.is_active'),
                        options: [{ value: '1', label: t('ui.yes') }, { value: '0', label: t('ui.no') }],
                    },
                ]}
            />

            <Table columns={[t('fields.image'), t('fields.title'), t('fields.location'), t('fields.trip_type'), t('fields.price'), t('fields.nights_count'), t('fields.is_active'), t('ui.actions')]}
                rows={packages.data}
                renderRow={(p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                            {p.image ? <img src={storageUrl(p.image)} alt="" className="h-10 w-10 rounded object-cover" /> : <span className="text-gray-300">—</span>}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-800">{p.title}</td>
                        <td className="px-4 py-3 text-gray-600">{p.location}</td>
                        <td className="px-4 py-3">
                            <Badge color={p.trip_type === 'local' ? 'green' : 'blue'}>{t(`values.${p.trip_type}`)}</Badge>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{p.price} SAR</td>
                        <td className="px-4 py-3 text-gray-600">{p.nights_count}</td>
                        <td className="px-4 py-3"><BoolIcon value={p.is_active} /></td>
                        <td className="px-4 py-3">
                            <RowActions editRoute="admin.packages.edit" editParams={p.id} deleteRoute="admin.packages.destroy" deleteParams={p.id} />
                        </td>
                    </tr>
                )}
            />
            <Pagination links={packages.links} />
        </AdminLayout>
    );
}
