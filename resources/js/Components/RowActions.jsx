import React from 'react';
import { Link, router } from '@inertiajs/react';
import { useT } from '@/i18n';
import Icon from '@/Components/Icons';

export default function RowActions({ editRoute, editParams, deleteRoute, deleteParams }) {
    const { t } = useT();

    const destroy = () => {
        if (confirm(t('ui.confirm_delete'))) {
            router.delete(route(deleteRoute, deleteParams), { preserveScroll: true });
        }
    };

    return (
        <div className="flex items-center gap-2">
            {editRoute && (
                <Link
                    href={route(editRoute, editParams)}
                    title={t('ui.edit')}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-teal-700 transition"
                >
                    <Icon name="edit" className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('ui.edit')}</span>
                </Link>
            )}
            {deleteRoute && (
                <button
                    onClick={destroy}
                    title={t('ui.delete')}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-xs font-medium text-red-600 ring-1 ring-red-200 hover:bg-red-50 transition"
                >
                    <Icon name="trash" className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('ui.delete')}</span>
                </button>
            )}
        </div>
    );
}
