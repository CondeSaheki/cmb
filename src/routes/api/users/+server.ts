import { CMB_SECRET } from "$env/static/private";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import { getAllUsers, getAllTokens } from "$lib/database";
import type { User } from "$lib/osuInterfaces";

export const GET: RequestHandler = async ({ request }) => {

    // Check the Authorization header
    if (request.headers.get('Authorization') !== CMB_SECRET) {
        throw error(401, 'Unauthorized');
    }

    const users = getAllUsers();
    const tokens = getAllTokens();

    return json({ users: users, tokens: tokens });
};
