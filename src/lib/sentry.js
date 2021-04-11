import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

export const initSentry = () => {
	Sentry.init({
		dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
		integrations: [new Integrations.BrowserTracing()],

		// Set tracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production
		tracesSampleRate: 1.0,
	});
};

export const createBoundryError = ({ error, errorInfo }) => {
	Sentry.withScope(scope => {
		scope.setTag("Custom-Tag", "ErrorBoundry");
		scope.setLevel("warning");
		scope.setExtras(errorInfo);
		const sentryEventId = Sentry.captureException(error);
		return sentryEventId;
	});
};

export const createDefaultLog = error => {
	Sentry.configureScope(scope => scope.setLevel("Error").setTag("Custom-Tag", "Default"));
	const sentryEventId = Sentry.captureException(error);
	return sentryEventId;
};

export const createUserLog = ({ error, user = {} }) => {
	Sentry.configureScope(scope =>
		scope.setLevel("Error").setUser(user).setTag("Custom-Tag", "user info"),
	);
	const sentryEventId = Sentry.captureException(error);
	return sentryEventId;
};
