import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.SUPABASE_URL!,
	process.env.SUPABASE_SECRET_KEY!
);

export default async (req: Request) => {
	if (req.method !== "POST") {
		return new Response("Method Not Allowed", {
			status: 405,
		});
	}

	const body = await req.json();

	const forwarded =
		req.headers.get("x-forwarded-for") ?? req.headers.get("client-ip") ?? "";

	const ip = forwarded.split(",")[0].trim();

	const { error } = await supabase.from("sessions").upsert(
		{
			session_id: body.sessionId,
			ip,
			site: body.site,
			pathname: body.pathname,
			referrer: body.referrer,
			user_agent: body.userAgent,
			language: body.language,
			timezone: body.timezone,
			screen_width: body.screenWidth,
			screen_height: body.screenHeight,
		},
		{
			onConflict: "session_id",
			ignoreDuplicates: true,
		}
	);

	if (error) {
		console.error(error);

		return Response.json(
			{
				success: false,
			},
			{
				status: 500,
			}
		);
	}

	return Response.json({
		success: true,
	});
};
