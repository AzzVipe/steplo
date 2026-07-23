import { useEffect } from "react";
import { initTracking } from "../lib/tracker";

export default function SessionTracker() {
	useEffect(() => {
		initTracking();
	}, []);

	return null;
}
