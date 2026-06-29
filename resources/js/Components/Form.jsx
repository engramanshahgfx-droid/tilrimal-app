import React, { useState } from 'react';
import Icon from '@/Components/Icons';

export function Card({ children, className = '' }) {
    return (
        <div className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}>
            {children}
        </div>
    );
}

export function Section({ title, children }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            {title && (
                <div className="border-b border-slate-100 px-6 py-4">
                    <h3 className="font-semibold text-slate-800">{title}</h3>
                </div>
            )}
            <div className="p-6">{children}</div>
        </div>
    );
}

export function Label({ htmlFor, children, required }) {
    return (
        <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700 mb-1.5">
            {children}
            {required && <span className="text-red-500 ms-1">*</span>}
        </label>
    );
}

export function FieldError({ message }) {
    if (!message) return null;
    return <p className="mt-1.5 text-sm text-red-600">{message}</p>;
}

const baseInput =
    'block w-full rounded-xl border-0 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm ring-1 ring-inset ring-slate-300 transition placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-teal-500 focus:outline-none';

export function TextField({ label, name, value, onChange, error, required, type = 'text', icon, ...props }) {
    return (
        <div>
            {label && <Label htmlFor={name} required={required}>{label}</Label>}
            <div className="relative">
                {icon && (
                    <span className="pointer-events-none absolute inset-y-0 start-3 flex items-center text-slate-400">
                        <Icon name={icon} className="w-5 h-5" />
                    </span>
                )}
                <input
                    id={name}
                    type={type}
                    value={value ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    className={`${baseInput} ${icon ? 'ps-10' : ''} ${error ? 'ring-red-400 focus:ring-red-500' : ''}`}
                    {...props}
                />
            </div>
            <FieldError message={error} />
        </div>
    );
}

export function PasswordField({ label, name, value, onChange, error, required, icon, placeholder, autoFocus }) {
    const [show, setShow] = useState(false);
    return (
        <div>
            {label && <Label htmlFor={name} required={required}>{label}</Label>}
            <div className="relative">
                {icon && (
                    <span className="pointer-events-none absolute inset-y-0 start-3 flex items-center text-slate-400">
                        <Icon name={icon} className="w-5 h-5" />
                    </span>
                )}
                <input
                    id={name}
                    type={show ? 'text' : 'password'}
                    value={value ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    className={`${baseInput} ${icon ? 'ps-10' : ''} pe-11 ${error ? 'ring-red-400 focus:ring-red-500' : ''}`}
                />
                <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    tabIndex={-1}
                    className="absolute inset-y-0 end-2 flex items-center px-1.5 text-slate-400 hover:text-slate-600"
                    aria-label={show ? 'hide' : 'show'}
                >
                    <Icon name={show ? 'eye-off' : 'eye'} className="w-5 h-5" />
                </button>
            </div>
            <FieldError message={error} />
        </div>
    );
}

export function Textarea({ label, name, value, onChange, error, required, rows = 4, ...props }) {
    return (
        <div>
            {label && <Label htmlFor={name} required={required}>{label}</Label>}
            <textarea
                id={name}
                rows={rows}
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value)}
                className={`${baseInput} ${error ? 'ring-red-400 focus:ring-red-500' : ''}`}
                {...props}
            />
            <FieldError message={error} />
        </div>
    );
}

export function SelectField({ label, name, value, onChange, options, error, required, placeholder }) {
    return (
        <div>
            {label && <Label htmlFor={name} required={required}>{label}</Label>}
            <select
                id={name}
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value)}
                className={`${baseInput} ${error ? 'ring-red-400 focus:ring-red-500' : ''}`}
            >
                {placeholder !== undefined && <option value="">{placeholder}</option>}
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            <FieldError message={error} />
        </div>
    );
}

export function Toggle({ label, checked, onChange }) {
    return (
        <label className="flex items-center gap-3 cursor-pointer select-none">
            <span className="relative inline-flex">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={!!checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <span className="w-11 h-6 bg-slate-300 rounded-full transition peer-checked:bg-teal-500 peer-focus:ring-2 peer-focus:ring-teal-300" />
                <span className="absolute top-0.5 start-0.5 w-5 h-5 bg-white rounded-full shadow transition peer-checked:translate-x-5 rtl:peer-checked:-translate-x-5" />
            </span>
            <span className="text-sm font-medium text-slate-700">{label}</span>
        </label>
    );
}

export function FileInput({ label, onChange, error, currentUrl, currentLabel }) {
    return (
        <div>
            {label && <Label>{label}</Label>}
            {currentUrl && (
                <div className="mb-2.5">
                    <span className="block text-xs text-slate-500 mb-1">{currentLabel}</span>
                    <img src={currentUrl} alt="" className="h-24 w-24 rounded-xl object-cover ring-1 ring-slate-200" />
                </div>
            )}
            <input
                type="file"
                accept="image/*"
                onChange={(e) => onChange(e.target.files[0] ?? null)}
                className="block w-full text-sm text-slate-600 file:me-3 file:rounded-lg file:border-0 file:bg-teal-50 file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-teal-700 hover:file:bg-teal-100 file:cursor-pointer"
            />
            <FieldError message={error} />
        </div>
    );
}

export function Button({ children, type = 'button', variant = 'primary', className = '', ...props }) {
    const variants = {
        primary: 'bg-teal-600 text-white shadow-sm hover:bg-teal-700 focus:ring-2 focus:ring-teal-300',
        secondary: 'bg-white text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50',
        danger: 'bg-red-600 text-white shadow-sm hover:bg-red-700 focus:ring-2 focus:ring-red-300',
    };
    return (
        <button
            type={type}
            className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-semibold transition focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
