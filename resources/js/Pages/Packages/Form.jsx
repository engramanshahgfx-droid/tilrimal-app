import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { TextField, Textarea, SelectField, Toggle, FileInput, Button, Section } from '@/Components/Form';
import { useT, storageUrl } from '@/i18n';

export default function Form({ package: pkg }) {
    const { t } = useT();
    const isEdit = !!pkg;

    const { data, setData, post, processing, errors } = useForm({
        title: pkg?.title || '',
        location: pkg?.location || '',
        trip_type: pkg?.trip_type || 'local',
        price: pkg?.price || '',
        nights_count: pkg?.nights_count ?? 0,
        sort_order: pkg?.sort_order ?? 0,
        is_active: pkg ? !!pkg.is_active : true,
        image: null,
        cities: pkg?.cities?.map((c) => ({ city: c.city, nights: c.nights, sort_order: c.sort_order })) || [],
        activities: pkg?.activities?.map((a) => ({ activity_name: a.activity_name })) || [],
        ...(isEdit ? { _method: 'put' } : {}),
    });

    const submit = (e) => {
        e.preventDefault();
        post(isEdit ? route('admin.packages.update', pkg.id) : route('admin.packages.store'), { forceFormData: true });
    };

    // Repeater helpers
    const addCity = () => setData('cities', [...data.cities, { city: '', nights: 1, sort_order: data.cities.length }]);
    const removeCity = (i) => setData('cities', data.cities.filter((_, idx) => idx !== i));
    const setCity = (i, key, value) => setData('cities', data.cities.map((c, idx) => idx === i ? { ...c, [key]: value } : c));

    const addActivity = () => setData('activities', [...data.activities, { activity_name: '' }]);
    const removeActivity = (i) => setData('activities', data.activities.filter((_, idx) => idx !== i));
    const setActivity = (i, value) => setData('activities', data.activities.map((a, idx) => idx === i ? { activity_name: value } : a));

    const title = isEdit ? t('ui.edit') : t('ui.create');

    return (
        <AdminLayout title={`${t('resources.packages')} — ${title}`}>
            <Head title={title} />
            <form onSubmit={submit} className="max-w-4xl space-y-5">
                <Section title={t('sections.package_details')}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <TextField label={t('fields.title')} name="title" value={data.title} onChange={(v) => setData('title', v)} error={errors.title} required />
                        <TextField label={t('fields.location')} name="location" value={data.location} onChange={(v) => setData('location', v)} error={errors.location} required />
                        <SelectField label={t('fields.trip_type')} name="trip_type" value={data.trip_type} onChange={(v) => setData('trip_type', v)} error={errors.trip_type} required
                            options={[{ value: 'local', label: t('values.local') }, { value: 'international', label: t('values.international') }]} />
                        <TextField label={`${t('fields.price')} (SAR)`} name="price" type="number" step="0.01" value={data.price} onChange={(v) => setData('price', v)} error={errors.price} required />
                        <TextField label={t('fields.nights_count')} name="nights_count" type="number" value={data.nights_count} onChange={(v) => setData('nights_count', v)} error={errors.nights_count} />
                        <TextField label={t('fields.sort_order')} name="sort_order" type="number" value={data.sort_order} onChange={(v) => setData('sort_order', v)} error={errors.sort_order} />
                        <div className="flex items-end">
                            <Toggle label={t('fields.is_active')} checked={data.is_active} onChange={(v) => setData('is_active', v)} />
                        </div>
                        <div className="md:col-span-2">
                            <FileInput label={t('fields.image')} onChange={(f) => setData('image', f)} error={errors.image} currentUrl={storageUrl(pkg?.image)} currentLabel={t('ui.current_image')} />
                        </div>
                    </div>
                </Section>

                <Section title={t('sections.route_cities')}>
                    <div className="space-y-3">
                        {data.cities.map((c, i) => (
                            <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                                <div className="md:col-span-6">
                                    <TextField label={t('fields.city')} value={c.city} onChange={(v) => setCity(i, 'city', v)} error={errors[`cities.${i}.city`]} />
                                </div>
                                <div className="md:col-span-3">
                                    <TextField label={t('fields.nights')} type="number" value={c.nights} onChange={(v) => setCity(i, 'nights', v)} error={errors[`cities.${i}.nights`]} />
                                </div>
                                <div className="md:col-span-2">
                                    <TextField label={t('fields.sort_order')} type="number" value={c.sort_order} onChange={(v) => setCity(i, 'sort_order', v)} />
                                </div>
                                <div className="md:col-span-1">
                                    <button type="button" onClick={() => removeCity(i)} className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50 w-full">✕</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addCity} className="mt-3 rounded-lg border border-teal-300 px-4 py-2 text-sm text-teal-700 hover:bg-teal-50">
                        + {t('sections.add_city')}
                    </button>
                </Section>

                <Section title={t('sections.activities')}>
                    <div className="space-y-3">
                        {data.activities.map((a, i) => (
                            <div key={i} className="flex gap-3 items-end">
                                <div className="flex-1">
                                    <TextField label={t('fields.activity_name')} value={a.activity_name} onChange={(v) => setActivity(i, v)} error={errors[`activities.${i}.activity_name`]} />
                                </div>
                                <button type="button" onClick={() => removeActivity(i)} className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50">✕</button>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addActivity} className="mt-3 rounded-lg border border-teal-300 px-4 py-2 text-sm text-teal-700 hover:bg-teal-50">
                        + {t('sections.add_activity')}
                    </button>
                </Section>

                <div className="flex items-center gap-3">
                    <Button type="submit" disabled={processing}>{t('ui.save')}</Button>
                    <Link href={route('admin.packages.index')} className="text-sm text-gray-500 hover:text-gray-700">{t('ui.cancel')}</Link>
                </div>
            </form>
        </AdminLayout>
    );
}
