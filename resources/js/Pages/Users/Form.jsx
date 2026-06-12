import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { TextField, SelectField, Toggle, Button, Section } from '@/Components/Form';
import { useT } from '@/i18n';

const toDate = (v) => (v ? String(v).slice(0, 10) : '');

export default function Form({ user }) {
    const { t } = useT();
    const isEdit = !!user;

    const { data, setData, post, put, processing, errors } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        password: '',
        is_active: user ? !!user.is_active : true,
        is_admin: user ? !!user.is_admin : false,
        phone_verified: user ? !!user.phone_verified : false,
        nationality: user?.nationality || '',
        passport_number: user?.passport_number || '',
        passport_expiry: toDate(user?.passport_expiry),
        birth_date: toDate(user?.birth_date),
        gender: user?.gender || '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.users.update', user.id));
        } else {
            post(route('admin.users.store'));
        }
    };

    const title = isEdit ? t('ui.edit') : t('ui.create');

    return (
        <AdminLayout title={`${t('resources.users')} — ${title}`}>
            <Head title={title} />
            <form onSubmit={submit} className="max-w-4xl space-y-5">
                <Section title={t('sections.basic_info')}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <TextField label={t('fields.name')} name="name" value={data.name} onChange={(v) => setData('name', v)} error={errors.name} required />
                    <TextField label={t('fields.email')} name="email" type="email" value={data.email} onChange={(v) => setData('email', v)} error={errors.email} required />
                    <TextField label={t('fields.phone')} name="phone" value={data.phone} onChange={(v) => setData('phone', v)} error={errors.phone} />
                    <TextField label={t('fields.password')} name="password" type="password" value={data.password} onChange={(v) => setData('password', v)} error={errors.password} required={!isEdit}
                        placeholder={isEdit ? t('sections.password_hint') : ''} />
                    <Toggle label={t('fields.is_active')} checked={data.is_active} onChange={(v) => setData('is_active', v)} />
                    <Toggle label={t('fields.is_admin')} checked={data.is_admin} onChange={(v) => setData('is_admin', v)} />
                    <Toggle label={t('fields.phone_verified')} checked={data.phone_verified} onChange={(v) => setData('phone_verified', v)} />
                    </div>
                </Section>

                <Section title={t('sections.passport_details')}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <TextField label={t('fields.nationality')} name="nationality" value={data.nationality} onChange={(v) => setData('nationality', v)} error={errors.nationality} />
                    <TextField label={t('fields.passport_number')} name="passport_number" value={data.passport_number} onChange={(v) => setData('passport_number', v)} error={errors.passport_number} />
                    <TextField label={t('fields.passport_expiry')} name="passport_expiry" type="date" value={data.passport_expiry} onChange={(v) => setData('passport_expiry', v)} error={errors.passport_expiry} />
                    <TextField label={t('fields.birth_date')} name="birth_date" type="date" value={data.birth_date} onChange={(v) => setData('birth_date', v)} error={errors.birth_date} />
                    <SelectField label={t('fields.gender')} name="gender" value={data.gender} onChange={(v) => setData('gender', v)} error={errors.gender}
                        placeholder="—"
                        options={[{ value: 'male', label: t('values.male') }, { value: 'female', label: t('values.female') }]} />
                    </div>
                </Section>

                <div className="flex items-center gap-3">
                    <Button type="submit" disabled={processing}>{t('ui.save')}</Button>
                    <Link href={route('admin.users.index')} className="text-sm font-medium text-slate-500 hover:text-slate-700">{t('ui.cancel')}</Link>
                </div>
            </form>
        </AdminLayout>
    );
}
