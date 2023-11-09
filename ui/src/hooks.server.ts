import { redirect, type Handle } from '@sveltejs/kit';

const unProtectedRoutes: string[] = ['/', '/login'];

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('sessionid');

	if (!session && !unProtectedRoutes.includes(event.url.pathname)) throw redirect(301, '/login');

	const res = await fetch('http://127.0.0.1:8000/auth/user/', {
		method: 'GET',
		headers: {
			'X-CSRFToken': event.cookies.get('csrftoken'),
			Cookie: `sessionid=${event.cookies.get('sessionid')}`
		}
	});

	if (res.status === 200) {
		const user = await res.json();

		event.locals.user = {
			isAuthenticated: true,
			username: user.username,
			email: user.email
		};
	} else {
		event.locals.user = {
			isAuthenticated: false,
			username: '',
			email: ''
		};

		if (!unProtectedRoutes.includes(event.url.pathname)) throw redirect(301, '/');
	}
	return resolve(event);
};
