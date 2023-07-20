import * as Sentry from '@sentry/node';
import crypto from 'crypto';
import type { HandleServerError } from '@sveltejs/kit';

Sentry.init({
	/*...*/
});

export const handleError = (async ({ error, event }) => {
	const errorId = crypto.randomUUID();
	// example integration with https://sentry.io/
	Sentry.captureException(error, { extra: { event, errorId } });

	return {
		message: 'Whoops!',
		errorId
	};
}) satisfies HandleServerError;
