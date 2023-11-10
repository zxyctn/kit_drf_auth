import setCookie from 'set-cookie-parser';

import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const actions: Actions = {
	default: async ({ request, cookies, fetch }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		const res = await fetch('http://127.0.0.1:8000/auth/login/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});

		if (res.status === 200 || res.status === 201 || res.status === 204) {
			const setCookies = res.headers.get('set-cookie')!.split('SameSite=Lax,');
			setCookies[0] = setCookies[0].concat('SameSite=Lax;');

			const cookiesToSet = setCookie.parse(setCookies);

			cookiesToSet.forEach((cookie: any) => {
				cookies.set(cookie.name, cookie.value, {
					path: cookie.path,
					domain: cookie.domain,
					expires: cookie.expires,
					httpOnly: cookie.httpOnly,
					secure: cookie.secure
				});
			});
		}

		throw redirect(301, '/login');
	}
};

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user.isAuthenticated) {
		throw redirect(301, '/');
	}
};
