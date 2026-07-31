const SESSION_KEY = "steplo-session-id";
const TRACKED_KEY = "steplo-session-tracked";

export async function initTracking() {
	if (sessionStorage.getItem(TRACKED_KEY)) {
		return;
	}

	let sessionId = sessionStorage.getItem(SESSION_KEY);

	if (!sessionId) {
		sessionId = crypto.randomUUID();
		sessionStorage.setItem(SESSION_KEY, sessionId);
	}

	await fetch("/.netlify/functions/session", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			sessionId,
			site: window.location.origin,
			pathname: window.location.pathname,
			referrer: document.referrer,
			language: navigator.language,
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			screenWidth: window.screen.width,
			screenHeight: window.screen.height,
			userAgent: navigator.userAgent,
		}),
	});

	sessionStorage.setItem(TRACKED_KEY, "true");
}
