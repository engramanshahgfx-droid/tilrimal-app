import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { TextField, PasswordField, Toggle, Button } from '@/Components/Form';
import Icon from '@/Components/Icons';
import { useT } from '@/i18n';

export default function Login() {
    const { t } = useT();
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.login.store'));
    };

    const features = [t('resources.bookings'), t('resources.packages'), t('resources.offers'), t('resources.support_tickets')];

    return (
        <GuestLayout>
            <Head title={t('ui.login')} />

            <div className="grid md:grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5">
                {/* Brand panel */}
                <div className="relative hidden md:flex flex-col justify-between bg-gradient-to-br from-stone-900 to-stone-800 p-10 text-white overflow-hidden">
                    <div className="absolute -top-16 -end-16 h-56 w-56 rounded-full bg-teal-500/20 blur-2xl" />
                    <div className="relative">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500 text-2xl font-bold text-stone-900 shadow-lg shadow-teal-500/30">
                            ر
                        </div>
                        <h1 className="mt-6 text-3xl font-bold">{t('app_name')}</h1>
                        <p className="mt-2 text-sm leading-relaxed text-white/70">{t('ui.login_subtitle')}</p>
                    </div>
                    <ul className="relative space-y-3">
                        {features.map((f) => (
                            <li key={f} className="flex items-center gap-2.5 text-sm text-white/90">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500/20 text-teal-300">
                                    <Icon name="check" className="w-4 h-4" />
                                </span>
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Form panel */}
                <div className="p-8 sm:p-10">
                    {/* mobile logo */}
                    <div className="md:hidden mb-6 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500 text-xl font-bold text-stone-900">ر</div>
                        <span className="text-2xl font-bold text-stone-800">{t('app_name')}</span>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-800">{t('ui.welcome_back')}</h2>
                    <p className="mt-1 mb-7 text-sm text-slate-500">{t('ui.login_subtitle')}</p>

                    <form onSubmit={submit} className="space-y-5">
                        <TextField
                            label={t('ui.email')}
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={(v) => setData('email', v)}
                            error={errors.email}
                            required
                            autoFocus
                            icon="mail"
                        />

                        <PasswordField
                            label={t('ui.password')}
                            name="password"
                            value={data.password}
                            onChange={(v) => setData('password', v)}
                            error={errors.password}
                            required
                            icon="lock"
                        />

                        <Toggle label={t('ui.remember')} checked={data.remember} onChange={(v) => setData('remember', v)} />

                        <Button type="submit" disabled={processing} className="w-full !py-3 text-base">
                            {t('ui.login')}
                        </Button>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
