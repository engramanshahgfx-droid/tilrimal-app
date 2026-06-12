import React from 'react';

// Lightweight inline icon set (heroicons-style, stroke based).
const paths = {
    dashboard: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    users: 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a3 3 0 10-2.5-4.5',
    activities: 'M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z',
    packages: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    offers: 'M7 7h.01M7 3h5a1.99 1.99 0 011.41.59l7 7a2 2 0 010 2.82l-5 5a2 2 0 01-2.82 0l-7-7A2 2 0 013 11V6a3 3 0 013-3z',
    bookings: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z',
    support_tickets: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 20l1.3-3.9A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    logout: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
    menu: 'M4 6h16M4 12h16M4 18h16',
    search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    plus: 'M12 4v16m8-8H4',
    edit: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    trash: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
    globe: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-9v18m9-9H3',
    chevron: 'M9 5l7 7-7 7',
    check: 'M5 13l4 4L19 7',
    lock: 'M12 11v4m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm9-10V7a4 4 0 00-8 0v4h8z',
    mail: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    eye: [
        'M15 12a3 3 0 11-6 0 3 3 0 016 0z',
        'M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    ],
    'eye-off': [
        'M3 3l18 18',
        'M10.584 10.587a2 2 0 002.828 2.83',
        'M9.363 5.365A9.466 9.466 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.973 9.973 0 01-1.563 2.029M6.41 6.41A9.957 9.957 0 002.458 12c1.274 4.057 5.065 7 9.542 7a9.46 9.46 0 005.59-1.81',
    ],
};

export default function Icon({ name, className = 'w-5 h-5' }) {
    const d = paths[name];
    if (!d) return null;
    const list = Array.isArray(d) ? d : [d];
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            {list.map((p, i) => (
                <path key={i} strokeLinecap="round" strokeLinejoin="round" d={p} />
            ))}
        </svg>
    );
}
