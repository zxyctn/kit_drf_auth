import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ fetch, locals }) => {
	if (locals.user.isAuthenticated) {
		const res = await fetch('http://127.0.0.1:8000/users/');
		const users = await res.json();
		return {
			users
		};
	} else {
		throw redirect(301, '/');
	}
};
