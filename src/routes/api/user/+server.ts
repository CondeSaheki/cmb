import { error, json, type RequestHandler } from "@sveltejs/kit";
import { getUser, getToken } from "$lib/supabase";
import type { User } from "$lib/osuInterfaces";

export const GET: RequestHandler = async ({ cookies }) => {
    // Get access token from cookie
    const tokenCookie = cookies.get('__cmb_access_token') ?? null;
    if (!tokenCookie) return error(401, 'No token');

    // Parse access token
    let tokenRaw: { id: number, token: string }
    try {
        tokenRaw = JSON.parse(tokenCookie);
    } catch (ex) {
        return error(401, 'Token format is not valid');
    }

    // Get token information from database
    const token = await getToken(tokenRaw.token);
    if (!token || token.expiresAt < Date.now() || token.userId !== tokenRaw.id) return error(401, 'Token is not valid');

    console.log(`Fetched TOKEN data from database AAAAAAAAAAAAAAAAAAAAAAa: ${token.userId}`);
    
    // Get user data from database
    let user: User | null = await getUser(token.userId);
    if (!user) return error(404, 'Account not found');

    console.log(`Fetched user data from database AAAAAAAAAAAAAAAAAAAAAAa: ${user.avatar_url}`);
    return json(user);
}
