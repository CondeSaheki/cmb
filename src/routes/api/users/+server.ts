import { CMB_SECRET } from "$env/static/private";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import { getAllUsers, getAllTokens, getForms } from "$lib/supabase";

export const GET: RequestHandler = async ({ request }) => {

    // Check the Authorization header
    if (request.headers.get('Authorization') !== CMB_SECRET) {
        throw error(401, 'Unauthorized');
    }

    const users = await getAllUsers();
    const tokens = await getAllTokens();
    const forms = await getForms();

    return json({ users: users, tokens: tokens, forms: forms });
};