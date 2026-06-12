import React from 'react';
import { Link } from '@inertiajs/react';
import { useT } from '@/i18n';
import Icon from '@/Components/Icons';

export function Badge({ children, color = 'gray' }) {
    const colors = {
        gray: 'bg-slate-100 text-slate-600 ring-slate-200',
        green: 'bg-green-50 text-green-700 ring-green-200',
        red: 'bg-red-50 text-red-700 ring-red-200',
        yellow: 'bg-amber-50 text-amber-700 ring-amber-200',
        blue: 'bg-blue-50 text-blue-700 ring-blue-200',
        teal: 'bg-teal-50 text-teal-700 ring-teal-200',
    };
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${colors[color] || colors.gray}`}>
            {children}
        </span>
    );
}

export function BoolIcon({ value }) {
    return value
        ? <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-50 text-green-600 ring-1 ring-green-200"><Icon name="check" className="w-4 h-4" /></span>
        : <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-50 text-slate-300 ring-1 ring-slate-200">–</span>;
}

export function Table({ columns, rows, renderRow }) {
    const { t } = useT();
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50/80">
                        <tr>
                            {columns.map((col, i) => (
                                <th key={i} className="px-4 py-3.5 text-start text-xs font-semibold uppercase tracking-wide text-slate-500 whitespace-nowrap">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="px-4 py-16 text-center">
                                    <div className="flex flex-col items-center gap-2 text-slate-400">
                                        <Icon name="search" className="w-8 h-8" />
                                        <span className="text-sm">{t('ui.no_records')}</span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            rows.map((row) => renderRow(row))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export function Pagination({ links }) {
    if (!links || links.length <= 3) return null;
    return (
        <div className="mt-5 flex flex-wrap gap-1.5 justify-center">
            {links.map((link, i) => (
                <Link
                    key={i}
                    href={link.url || '#'}
                    preserveScroll
                    className={`min-w-9 rounded-lg px-3 py-1.5 text-sm transition ${
                        link.active
                            ? 'bg-teal-600 text-white shadow-sm'
                            : link.url
                                ? 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
                                : 'bg-slate-50 text-slate-300 ring-1 ring-slate-100 cursor-not-allowed'
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}
