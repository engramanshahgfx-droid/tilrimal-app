import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ListToolbar from '@/Components/ListToolbar';
import RowActions from '@/Components/RowActions';
import { Table, Pagination, BoolIcon, Badge } from '@/Components/Table';
import { useT, storageUrl } from '@/i18n';

export default function Index({ offers, filters }) {
    const { t } = useT();

    return (
        <AdminLayout title={t('resources.offers')}>
            <Head title={t('resources.offers')} />

            <ListToolbar
                routeName="admin.offers.index"
                createRoute="admin.offers.create"
                filters={filters}
                selectFilters={[{
                    key: 'is_active',
                    label: t('fields.is_active'),
                    options: [{ value: '1', label: t('ui.yes') }, { value: '0', label: t('ui.no') }],
                }]}
            />

            <Table columns={[t('fields.image'), t('fields.title'), t('fields.original_price'), t('fields.discounted_price'), t('fields.discount_percentage'), t('fields.is_active'), t('ui.actions')]}
                rows={offers.data}
                renderRow={(o) => (
                    <tr key={o.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                            {o.image ? <img src={storageUrl(o.image)} alt="" className="h-10 w-10 rounded object-cover" /> : <span className="text-gray-300">—</span>}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-800">{o.title}</td>
                        <td className="px-4 py-3 text-gray-600">{o.original_price ? `${o.original_price} SAR` : '—'}</td>
                        <td className="px-4 py-3 text-gray-600">{o.discounted_price ? `${o.discounted_price} SAR` : '—'}</td>
                        <td className="px-4 py-3">{o.discount_percentage ? <Badge color="green">{o.discount_percentage}%</Badge> : '—'}</td>
                        <td className="px-4 py-3"><BoolIcon value={o.is_active} /></td>
                        <td className="px-4 py-3">
                            <RowActions editRoute="admin.offers.edit" editParams={o.id} deleteRoute="admin.offers.destroy" deleteParams={o.id} />
                        </td>
                    </tr>
                )}
            />
            <Pagination links={offers.links} />
        </AdminLayout>
    );
}
