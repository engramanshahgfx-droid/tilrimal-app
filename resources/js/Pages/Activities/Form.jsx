import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { TextField, Textarea, Toggle, FileInput, Button, Card } from '@/Components/Form';
import { useT, storageUrl } from '@/i18n';

export default function Form({ activity }) {
    const { t } = useT();
    const isEdit = !!activity;

    const { data, setData, post, processing, errors } = useForm({
        title: activity?.title || '',
        description: activity?.description || '',
        location: activity?.location || '',
        price: activity?.price || '',
        sort_order: activity?.sort_order ?? 0,
        is_active: activity ? !!activity.is_active : true,
        image: null,
        ...(isEdit ? { _method: 'put' } : {}),
    });

    const submit = (e) => {
        e.preventDefault();
        post(isEdit ? route('admin.activities.update', activity.id) : route('admin.activities.store'), {
            forceFormData: true,
        });
    };

    const title = isEdit ? t('ui.edit') : t('ui.create');

    return (
        <AdminLayout title={`${t('resources.activities')} — ${title}`}>
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
                    <TextField label={t('fields.location')} name="location" value={data.location} onChange={(v) => setData('location', v)} error={errors.location} required />
                    <TextField label={`${t('fields.price')} (SAR)`} name="price" type="number" step="0.01" value={data.price} onChange={(v) => setData('price', v)} error={errors.price} required />
                    <TextField label={t('fields.sort_order')} name="sort_order" type="number" value={data.sort_order} onChange={(v) => setData('sort_order', v)} error={errors.sort_order} />
                    <div className="flex items-end">
                        <Toggle label={t('fields.is_active')} checked={data.is_active} onChange={(v) => setData('is_active', v)} />
                    </div>
                    <div className="md:col-span-2">
                        <FileInput label={t('fields.image')} onChange={(f) => setData('image', f)} error={errors.image} currentUrl={storageUrl(activity?.image)} currentLabel={t('ui.current_image')} />
                    </div>
                </div>
                </Card>

                <div className="flex items-center gap-3">
                    <Button type="submit" disabled={processing}>{t('ui.save')}</Button>
                    <Link href={route('admin.activities.index')} className="text-sm font-medium text-slate-500 hover:text-slate-700">{t('ui.cancel')}</Link>
                </div>
            </form>
        </AdminLayout>
    );
}
