import React, { useState, useRef } from 'react';
import { Link, router } from '@inertiajs/react';
import { useT } from '@/i18n';
import Icon from '@/Components/Icons';

/**
 * Search + select filters bar. Pushes query params to `routeName` via GET.
 * selectFilters: [{ key, label, options: [{value,label}] }]
 */
export default function ListToolbar({ routeName, filters, createRoute, selectFilters = [] }) {
    const { t } = useT();
    const [search, setSearch] = useState(filters.search || '');
    const timer = useRef(null);

    const filterValues = {};
    selectFilters.forEach((f) => { filterValues[f.key] = filters[f.key] ?? ''; });

    const push = (params) => {
        Object.keys(params).forEach((k) => { if (params[k] === '' || params[k] == null) delete params[k]; });
        router.get(route(routeName), params, { preserveState: true, replace: true });
    };

    const onSearch = (v) => {
        setSearch(v);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => push({ ...filterValues, search: v }), 350);
    };

    const onFilter = (key, value) => push({ search, ...filterValues, [key]: value });

    const hasFilters = search || selectFilters.some((f) => filters[f.key] !== undefined && filters[f.key] !== '');

    const selectCls = 'rounded-xl border-0 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-teal-500 focus:outline-none';

    return (
        <div className="mb-5 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 start-3 flex items-center text-slate-400">
                    <Icon name="search" className="w-4 h-4" />
                </span>
                <input
                    type="search"
                    value={search}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder={t('ui.search')}
                    className="w-60 rounded-xl border-0 bg-white py-2.5 ps-9 pe-3 text-sm shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-teal-500 focus:outline-none"
                />
            </div>

            {selectFilters.map((f) => (
                <select
                    key={f.key}
                    value={filters[f.key] ?? ''}
                    onChange={(e) => onFilter(f.key, e.target.value)}
                    className={selectCls}
                >
                    <option value="">{f.label} — {t('ui.all')}</option>
                    {f.options.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                </select>
            ))}

            {hasFilters && (
                <Link href={route(routeName)} className="text-sm font-medium text-slate-500 hover:text-slate-700">
                    {t('ui.reset')}
                </Link>
            )}

            {createRoute && (
                <Link
                    href={route(createRoute)}
                    className="ms-auto inline-flex items-center gap-1.5 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 transition"
                >
                    <Icon name="plus" className="w-4 h-4" />
                    {t('ui.create')}
                </Link>
            )}
        </div>
    );
}
