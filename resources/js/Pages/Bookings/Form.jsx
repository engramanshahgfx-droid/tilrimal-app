import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { TextField, Textarea, SelectField, Toggle, Button, Card } from '@/Components/Form';
import { useT } from '@/i18n';

export default function Form({ booking, users }) {
    const { t } = useT();
    const isEdit = !!booking;

    const { data, setData, post, put, processing, errors } = useForm({
        user_id: booking?.user_id || '',
        type: booking?.type || 'flight',
        status: booking?.status || 'pending',
        price: booking?.price || '',
        is_current: booking ? !!booking.is_current : true,
        notes: booking?.notes || '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.bookings.update', booking.id));
        } else {
            post(route('admin.bookings.store'));
        }
    };

    const title = isEdit ? t('ui.edit') : t('ui.create');

    return (
        <AdminLayout title={`${t('resources.bookings')} — ${title}`}>
            <Head title={title} />
            <form onSubmit={submit} className="max-w-3xl space-y-5">
                <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <SelectField label={t('fields.user')} name="user_id" value={data.user_id} onChange={(v) => setData('user_id', v)} error={errors.user_id} required
                        placeholder="—"
                        options={users.map((u) => ({ value: u.id, label: u.name }))} />
                    <SelectField label={t('fields.type')} name="type" value={data.type} onChange={(v) => setData('type', v)} error={errors.type} required
                        options={['flight', 'hotel', 'package', 'activity'].map((v) => ({ value: v, label: t(`values.${v}`) }))} />
                    <SelectField label={t('fields.status')} name="status" value={data.status} onChange={(v) => setData('status', v)} error={errors.status} required
                        options={['pending', 'booked', 'cancelled'].map((v) => ({ value: v, label: t(`values.${v}`) }))} />
                    <TextField label={`${t('fields.price')} (SAR)`} name="price" type="number" step="0.01" value={data.price} onChange={(v) => setData('price', v)} error={errors.price} required />
                    <div className="flex items-end">
                        <Toggle label={t('fields.is_current')} checked={data.is_current} onChange={(v) => setData('is_current', v)} />
                    </div>
                    <div className="md:col-span-2">
                        <Textarea label={t('fields.notes')} name="notes" value={data.notes} onChange={(v) => setData('notes', v)} error={errors.notes} />
                    </div>
                </div>
                </Card>

                <div className="flex items-center gap-3">
                    <Button type="submit" disabled={processing}>{t('ui.save')}</Button>
                    <Link href={route('admin.bookings.index')} className="text-sm font-medium text-slate-500 hover:text-slate-700">{t('ui.cancel')}</Link>
                </div>
            </form>
        </AdminLayout>
    );
}
