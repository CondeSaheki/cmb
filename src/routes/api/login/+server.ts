import { error, json, type RequestHandler } from "@sveltejs/kit";
import { setUser, setToken, generateToken } from "$lib/database";
import * as osu from "$lib/osu";
import type { User } from "$lib/osuInterfaces";

export const POST: RequestHandler = async ({ request, cookies }) => {
    // Get the code from the request
    let code: string;
    try {
        const requestRaw = await request.json() as { code: string };
        if (!requestRaw) return error(400, "Missing authorization code.");
        code = requestRaw.code;
    } catch (ex) {
        return error(400, "Error parsing request body.");
    }

    // Request access token from osu API
    const osuToken: osu.AccessToken | null = await osu.requestAccessToken(code);
    if (!osuToken) return error(500, "Failed to obtain osu access token.");

    // Request user data from osu API
    const user: User | null = await osu.requestUser(osuToken);
    if (!user) return error(500, "Failed to fetch osu user data.");

    // Save user data in the database
    let saved = setUser(user);
    if (!saved) return error(500, "Failed to save user data.");

    // Generate a CmbAccessToken
    const cmbToken: string | null = generateToken();
    if (!cmbToken) return error(500, "Failed to generate token.");

    // Save user token in the database
    const tokenMaxAge: number = 604800 * 1000; // 7 days milliseconds
    const expiresAt: number = Date.now() + tokenMaxAge; // in milliseconds
    saved = setToken(user.id, cmbToken, expiresAt);
    if (!saved) return error(500, "Failed to save user token.");

    // Set the token in a cookie
    cookies.set("__cmb_access_token", JSON.stringify({
        id: user.id,
        token: cmbToken,
    }), {
        maxAge: tokenMaxAge / 1000,
        httpOnly: true,
        secure: true,
        path: "/",
    });
    
    // Return success response
    return json({ success: true });
};