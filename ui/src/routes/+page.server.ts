import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
	default: async ({ request, fetch, cookies, locals }) => {
		const res = await fetch('http://127.0.0.1:8000/auth/logout/', {
			method: 'POST',
			headers: {
				'X-CSRFToken': cookies.get('csrftoken'),
				Cookie: `sessionid=${cookies.get('sessionid')}`
			}
		});

		if (res.status === 200) {
			cookies.delete('sessionid');
			cookies.delete('csrftoken');
			locals.user = {
				isAuthenticated: false,
				username: '',
				email: ''
			};
		}
	}
};
