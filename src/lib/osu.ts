// import { OSU_CLIENT_SECRET } from "$env/static/private";
import { PUBLIC_OSU_CLIENT_ID as OSU_CLIENT_ID, PUBLIC_OSU_REDIRECT_URI as OSU_REDIRECT_URI } from "$env/static/public";
import { OSU_CLIENT_SECRET } from "$env/static/private";
import type { User }  from "$lib/osuInterfaces";

export interface AccessToken {
    "token_type": string, // Bearer
    "expires_in": number, // 1 day
    "access_token": string,
    "refresh_token": string
}

export async function requestAccessToken(code: string): Promise<AccessToken | null> {
    const url: URL = new URL("https://osu.ppy.sh/oauth/token");

    const headers: HeadersInit = {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
    };

    const body: BodyInit = new URLSearchParams({
        client_id: OSU_CLIENT_ID,
        client_secret: OSU_CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: OSU_REDIRECT_URI,
    }).toString();

    let response: Response;
    let accessToken: AccessToken;

    // Fetch the access token
    try {
        response = await fetch(url, {
            method: "POST",
            headers,
            body,
        });
    } catch (error) {
        console.error(
            `requestAccessToken, code, \"${code}\", error: \"${error}\": Fetch Failed`
        );
        return null;
    }

    // Check if the request was successful
    if (!response.ok) {
        console.error(`requestAccessToken, code \"${code}\", response status \"${response.status}\", response status text \"${response.statusText}\": Request Failed`);
        return null;
    }

    // Parse the response
    try {
        accessToken = await response.json() as AccessToken;
    } catch (error) {
        console.error(`requestAccessToken, code, \"${code}\", error: \"${error}\": JSON Parse Failed`);
        return null;
    }

    return accessToken;
}

export async function refreshAccessToken(token: AccessToken): Promise<AccessToken | null> {
    const url: URL = new URL("https://osu.ppy.sh/oauth/token");

    const headers: HeadersInit = {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
    };

    const body: BodyInit = new URLSearchParams({
        client_id: OSU_CLIENT_ID,
        client_secret: OSU_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token,
        scope: "identify"
    }).toString();

    let response: Response;
    let accessToken: AccessToken;

    // Fetch the access token
    try {
        response = await fetch(url, {
            method: "POST",
            headers,
            body: body,
        });
    } catch (error) {
        console.error(`refreshAccessToken, token \"${token}\", error: \"${error}\": Fetch Failed`);
        return null;
    }

    // Check if the request was successful
    if (!response.ok) {
        console.error(`refreshAccessToken, token ${token}, response status \"${response.status}\", response status text \"${response.statusText}\": Request Failed`);
        return null;
    }

    // Parse the response
    try {
        accessToken = await response.json() as AccessToken;
    } catch (error) {
        console.error(`refreshAccessToken, token \"${token}\", error: \"${error}\": JSON Parse Failed`);
        return null;
    }

    return accessToken;
}

export async function requestUser(token: AccessToken): Promise<User | null> {
    const url = new URL(
        "https://osu.ppy.sh/api/v2/me/osu"
    );
    
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token.access_token}`
    };
    
    let response: Response;
    let user: User;

    // Fetch the user
    try {
        response = await fetch(url, {
            method: "GET",
            headers,
        });
    } catch (error) {
        console.error(`requestUser, token \"${token}\", error: \"${error}\": Fetch Failed`);
        return null;
    }

    // Check if the request was successful
    if (!response.ok) {
        console.error(`requestUser, token \"${token}\", response status \"${response.status}\", response status text \"${response.statusText}\": Request Failed`);
        return null;
    }
 
    // Parse the response
    try {
        user = await response.json() as User;
    } catch (error) {
        console.error(`requestUser, token \"${token}\", error: \"${error}\": JSON Parse Failed`);
        return null;
    }
    
    return user;
}