import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const tokenMeta = typeof document !== 'undefined' && document.querySelector('meta[name="csrf-token"]');
const csrfToken = tokenMeta ? tokenMeta.getAttribute('content') : null;
if (csrfToken) {
	window.axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
	// Make token available to other libs that might inspect `window.Laravel`
	window.Laravel = window.Laravel || {};
	window.Laravel.csrfToken = csrfToken;
}

// Ensure native fetch (used by Inertia) sends the CSRF token and cookies
if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
	const _fetch = window.fetch.bind(window);
	window.fetch = (input, init = {}) => {
		const headers = new Headers(init.headers || {});
		if (!headers.get('X-Requested-With')) {
			headers.set('X-Requested-With', 'XMLHttpRequest');
		}
		if (csrfToken && !headers.get('X-CSRF-TOKEN')) {
			headers.set('X-CSRF-TOKEN', csrfToken);
		}
		init.headers = headers;
		// ensure cookies are sent for same-origin requests
		if (init.credentials === undefined) {
			init.credentials = 'same-origin';
		}
		return _fetch(input, init);
	};
}
