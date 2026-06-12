import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ListToolbar from '@/Components/ListToolbar';
import RowActions from '@/Components/RowActions';
import { Table, Pagination, BoolIcon } from '@/Components/Table';
import { useT, storageUrl } from '@/i18n';

export default function Index({ activities, filters }) {
    const { t } = useT();

    return (
        <AdminLayout title={t('resources.activities')}>
            <Head title={t('resources.activities')} />

            <ListToolbar
                routeName="admin.activities.index"
                createRoute="admin.activities.create"
                filters={filters}
                selectFilters={[{
                    key: 'is_active',
                    label: t('fields.is_active'),
                    options: [{ value: '1', label: t('ui.yes') }, { value: '0', label: t('ui.no') }],
                }]}
            />

            <Table columns={[t('fields.image'), t('fields.title'), t('fields.location'), t('fields.price'), t('fields.is_active'), t('fields.sort_order'), t('ui.actions')]}
                rows={activities.data}
                renderRow={(a) => (
                    <tr key={a.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                            {a.image
                                ? <img src={storageUrl(a.image)} alt="" className="h-10 w-10 rounded object-cover" />
                                : <span className="text-gray-300">—</span>}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-800">{a.title}</td>
                        <td className="px-4 py-3 text-gray-600">{a.location}</td>
                        <td className="px-4 py-3 text-gray-600">{a.price} SAR</td>
                        <td className="px-4 py-3"><BoolIcon value={a.is_active} /></td>
                        <td className="px-4 py-3 text-gray-600">{a.sort_order}</td>
                        <td className="px-4 py-3">
                            <RowActions
                                editRoute="admin.activities.edit" editParams={a.id}
                                deleteRoute="admin.activities.destroy" deleteParams={a.id}
                            />
                        </td>
                    </tr>
                )}
            />
            <Pagination links={activities.links} />
        </AdminLayout>
    );
}
