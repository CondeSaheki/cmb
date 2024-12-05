import { error, json, type RequestHandler } from "@sveltejs/kit";
import { getToken, removeTokens, removeToken } from "$lib/database";

export const POST: RequestHandler = async ({ request, cookies }) => {
    // Get all from the request
    let all: boolean = false;
    try {
        all = (await request.json() as { all: boolean }).all;
    } catch (ex) {
        return error(400, "Error parsing request body.");
    }

    // Get access token from cookie
    const tokenCookie = cookies.get('__cmb_access_token') ?? null;
    if (!tokenCookie) return error(400, 'No token');

    // Parse access token
    let tokenRaw: { id: number, token: string }
    try {
        tokenRaw = JSON.parse(tokenCookie);
    } catch (ex) {
        return error(400, 'Token format is not valid');
    }

    // Get token information from database
    const token = getToken(tokenRaw.token);
    if (!token || token.expiresAt < Date.now() || token.userId !== tokenRaw.id) return error(401, 'Token is not valid');

    // Remove tokens
    if (all) {
        const removed = removeTokens(token.userId);
        if (!removed) return error(500, "Failed to remove tokens.");
    }
    else {
        const removed = removeToken(tokenRaw.token);
        if (!removed) return error(500, "Failed to remove token.");
    }

    // Remove cookie
    cookies.delete('__cmb_access_token', { path: "/" });

    // Return success
    return json({ success: true });
};
