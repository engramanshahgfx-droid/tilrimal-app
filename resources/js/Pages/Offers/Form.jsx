import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { TextField, Textarea, Toggle, FileInput, Button, Card } from '@/Components/Form';
import { useT, storageUrl } from '@/i18n';

function toLocalDateTime(value) {
    if (!value) return '';
    const d = new Date(value);
    if (isNaN(d)) return '';
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function Form({ offer }) {
    const { t } = useT();
    const isEdit = !!offer;

    const { data, setData, post, processing, errors } = useForm({
        title: offer?.title || '',
        description: offer?.description || '',
        original_price: offer?.original_price || '',
        discounted_price: offer?.discounted_price || '',
        discount_percentage: offer?.discount_percentage || '',
        expires_at: toLocalDateTime(offer?.expires_at),
        sort_order: offer?.sort_order ?? 0,
        is_active: offer ? !!offer.is_active : true,
        image: null,
        ...(isEdit ? { _method: 'put' } : {}),
    });

    const submit = (e) => {
        e.preventDefault();
        post(isEdit ? route('admin.offers.update', offer.id) : route('admin.offers.store'), { forceFormData: true });
    };

    const title = isEdit ? t('ui.edit') : t('ui.create');

    return (
        <AdminLayout title={`${t('resources.offers')} — ${title}`}>
            <Head title={title} />
            <form onSubmit={submit} className="max-w-3xl space-y-5">
                <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                        <TextField label={t('fields.title')} name="title" value={data.title} onChange={(v) => setData('title', v)} error={errors.title} required />
                    </div>
                    <div className="md:col-span-2">
                        <Textarea label={t('fields.description')} name="description" value={data.description} onChange={(v) => setData('description', v)} error={errors.description} />
                    </div>
                    <TextField label={`${t('fields.original_price')} (SAR)`} name="original_price" type="number" step="0.01" value={data.original_price} onChange={(v) => setData('original_price', v)} error={errors.original_price} />
                    <TextField label={`${t('fields.discounted_price')} (SAR)`} name="discounted_price" type="number" step="0.01" value={data.discounted_price} onChange={(v) => setData('discounted_price', v)} error={errors.discounted_price} />
                    <TextField label={t('fields.discount_percentage')} name="discount_percentage" type="number" value={data.discount_percentage} onChange={(v) => setData('discount_percentage', v)} error={errors.discount_percentage} />
                    <TextField label={t('fields.expires_at')} name="expires_at" type="datetime-local" value={data.expires_at} onChange={(v) => setData('expires_at', v)} error={errors.expires_at} />
                    <TextField label={t('fields.sort_order')} name="sort_order" type="number" value={data.sort_order} onChange={(v) => setData('sort_order', v)} error={errors.sort_order} />
                    <div className="flex items-end">
                        <Toggle label={t('fields.is_active')} checked={data.is_active} onChange={(v) => setData('is_active', v)} />
                    </div>
                    <div className="md:col-span-2">
                        <FileInput label={t('fields.image')} onChange={(f) => setData('image', f)} error={errors.image} currentUrl={storageUrl(offer?.image)} currentLabel={t('ui.current_image')} />
                    </div>
                </div>
                </Card>

                <div className="flex items-center gap-3">
                    <Button type="submit" disabled={processing}>{t('ui.save')}</Button>
                    <Link href={route('admin.offers.index')} className="text-sm font-medium text-slate-500 hover:text-slate-700">{t('ui.cancel')}</Link>
                </div>
            </form>
        </AdminLayout>
    );
}
