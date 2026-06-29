import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { TextField, Toggle, Button, Card } from '@/Components/Form';
import { useT } from '@/i18n';

export default function Form({ settings }) {
    const { t } = useT();

    const { data, setData, put, processing, errors } = useForm({
        app_name: settings.app_name || '',
        currency: settings.currency || '',
        support_phone: settings.support_phone || '',
        support_email: settings.support_email || '',
        tax_percent: settings.tax_percent || '',
        booking_enabled: settings.booking_enabled === '1' || settings.booking_enabled === true,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.settings.update'));
    };

    return (
        <AdminLayout title={t('resources.settings')}>
            <Head title={t('resources.settings')} />
            <form onSubmit={submit} className="max-w-3xl space-y-5">
                <Card>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                            <TextField label={t('fields.app_name')} name="app_name" value={data.app_name} onChange={(v) => setData('app_name', v)} error={errors.app_name} />
                        </div>
                        <TextField label={t('fields.currency')} name="currency" value={data.currency} onChange={(v) => setData('currency', v)} error={errors.currency} />
                        <TextField label={t('fields.tax_percent')} name="tax_percent" type="number" step="0.01" value={data.tax_percent} onChange={(v) => setData('tax_percent', v)} error={errors.tax_percent} />
                        <TextField label={t('fields.support_phone')} name="support_phone" value={data.support_phone} onChange={(v) => setData('support_phone', v)} error={errors.support_phone} />
                        <TextField label={t('fields.support_email')} name="support_email" type="email" value={data.support_email} onChange={(v) => setData('support_email', v)} error={errors.support_email} />
                        <div className="flex items-end">
                            <Toggle label={t('fields.booking_enabled')} checked={data.booking_enabled} onChange={(v) => setData('booking_enabled', v)} />
                        </div>
                    </div>
                </Card>

                <Button type="submit" disabled={processing}>{t('ui.save')}</Button>
            </form>
        </AdminLayout>
    );
}
