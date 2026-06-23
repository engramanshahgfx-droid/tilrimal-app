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
