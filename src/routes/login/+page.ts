import type { PageLoad } from './$types';
import { get } from 'svelte/store';
import { user } from "$lib/userData";
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = (async (page) => {

    if (get(user) !== null) throw redirect(304, '/'); // Not Modified

    const code = page.url.searchParams.get("code");
    if (code === null) throw redirect(303, '/'); // See other
    try {
        await page.fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
        });
    } finally {
        throw redirect(302, '/'); // Found
    }
}) satisfies PageLoad;
