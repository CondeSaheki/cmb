import { getToken, setForm } from "$lib/supabase";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, cookies }) => {
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

    let form: { name: string, formData: string };
    try {
        form = await request.json();
        if (!form) return error(400, "Invalid form.");
    } catch (ex) {
        console.error(ex);
        return error(400, "Failed to parse form.");;
    }

    switch (form.name) {
        case "registration":
            try {
                let parsedData = JSON.parse(form.formData);
                let malLink = parsedData.malLink;
                if (malLink == undefined || malLink == null || !validateMALLink(malLink)) {
                    throw error(400, "Invalid MAL link");
                }
            } catch (err) {
                return error(400, 'Malformed form data.');
            }
            break;
    }

    // Save form data in the database
    let saved = await setForm(token.userId, form);
    if (!saved) return error(500, "Failed to save form data.");

    return json({ sucess: true });
};

function validateRegistration(formData: string) {
    let answersString = JSON.parse(formData)
}

function validateMALLink(link: string) {
    const malRegex = /^https:\/\/(www\.)?myanimelist\.net\/(profile)\/?/;
    return malRegex.test(link);
}