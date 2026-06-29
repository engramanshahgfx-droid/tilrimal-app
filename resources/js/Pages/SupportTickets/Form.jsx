import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Textarea, SelectField, Button, Card } from '@/Components/Form';
import { useT } from '@/i18n';

function ReadOnly({ label, value }) {
    return (
        <div>
            <span className="block text-sm font-medium text-slate-700 mb-1.5">{label}</span>
            <div className="rounded-xl bg-slate-50 ring-1 ring-slate-200 px-3.5 py-2.5 text-sm text-slate-700 whitespace-pre-wrap min-h-[2.75rem]">
                {value || '—'}
            </div>
        </div>
    );
}

export default function Form({ ticket }) {
    const { t } = useT();

    const { data, setData, put, processing, errors } = useForm({
        status: ticket.status || 'open',
        admin_reply: ticket.admin_reply || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.support-tickets.update', ticket.id));
    };

    return (
        <AdminLayout title={`${t('resources.support_tickets')} — ${t('ui.edit')}`}>
            <Head title={t('ui.edit')} />
            <form onSubmit={submit} className="max-w-3xl space-y-5">
                <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <ReadOnly label={t('fields.user')} value={ticket.user?.name} />
                    <SelectField label={t('fields.status')} name="status" value={data.status} onChange={(v) => setData('status', v)} error={errors.status} required
                        options={['open', 'in_progress', 'closed'].map((v) => ({ value: v, label: t(`values.${v}`) }))} />
                    <div className="md:col-span-2">
                        <ReadOnly label={t('fields.subject')} value={ticket.subject} />
                    </div>
                    <div className="md:col-span-2">
                        <ReadOnly label={t('fields.message')} value={ticket.message} />
                    </div>
                    <div className="md:col-span-2">
                        <Textarea label={t('fields.admin_reply')} name="admin_reply" rows={5} value={data.admin_reply} onChange={(v) => setData('admin_reply', v)} error={errors.admin_reply} />
                    </div>
                </div>
                </Card>

                <div className="flex items-center gap-3">
                    <Button type="submit" disabled={processing}>{t('ui.save')}</Button>
                    <Link href={route('admin.support-tickets.index')} className="text-sm font-medium text-slate-500 hover:text-slate-700">{t('ui.cancel')}</Link>
                </div>
            </form>
        </AdminLayout>
    );
}
