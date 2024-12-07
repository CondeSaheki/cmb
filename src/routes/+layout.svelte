<script lang="ts">
    import {
        PUBLIC_OSU_CLIENT_ID as OSU_CLIENT_ID,
        PUBLIC_OSU_REDIRECT_URI as OSU_REDIRECT_URI,
    } from "$env/static/public";
    import { onMount, type Snippet } from "svelte";
    import type { LayoutData } from "./$types";
    import "../app.css";
    import { user } from "$lib/userData";
    import type { User as OsuUser } from "$lib/osuInterfaces";

    let { data, children }: { data: LayoutData; children: Snippet } = $props();

    onMount(() => {
        fetchUser();
    });

    async function fetchUser() {
        try {
            // Try to get user data from local storage before making a fetch
            const storedUser = localStorage.getItem("user");
            if (storedUser !== null && $user === null) {
                user.set(JSON.parse(storedUser));
                return;
            }

            const response = await fetch("/api/user");
            if (response.ok) {
                const data: OsuUser = await response.json();
                localStorage.setItem("user", JSON.stringify(data));
                user.set(data);
                return;
            }
        } catch {
            localStorage.removeItem("user");
            user.set(null);
            return;
        }
    }

    function login() {
        window.location.href = requestAutorizationUrl().toString();
    }

    async function logout(all: boolean = false) {
        try {
            await fetch("/api/logout", {
                method: "POST",
                body: JSON.stringify({ all: all }),
            });
        } finally {
            localStorage.removeItem("user");
            user.set(null);
        }
    }

    function requestAutorizationUrl(): URL {
        const url = new URL("https://osu.ppy.sh/oauth/authorize");

        const params: Record<string, string> = {
            client_id: OSU_CLIENT_ID,
            redirect_uri: OSU_REDIRECT_URI,
            response_type: "code",
            scope: "identify",
            state: "randomval",
        };

        Object.keys(params).forEach((key) =>
            url.searchParams.append(key, params[key]),
        );

        return url;
    }
</script>

<div class="flex flex-col min-h-screen">
    <div class="navbar bg-base-100">
        <div class="navbar-start">
            <div class="flex gap-2">
                <div class="dropdown">
                    <div
                        tabindex="0"
                        role="button"
                        class="btn btn-ghost btn-circle"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h7"
                            />
                        </svg>
                    </div>
                    <ul
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li><a href="/">Home</a></li>
                        <li><a href="/collabslicer">Collab Slicer</a></li>
                        <li><a href="/about">About</a></li>
                    </ul>
                </div>

                <a href="/" class="btn btn-ghost text-xl rounded-xl">
                    <img src={"/favicon.png"} alt="logo" class="h-8 w-8" />
                    Central De Mapping Brasileiro
                </a>
            </div>
        </div>

        <div class="navbar-center"></div>

        <div class="navbar-end">
            {#if $user === null}
                <!-- not logged in -->
                <button
                    class="btn btn-ghost btn-outline h-8 w-32 rounded-xl"
                    onclick={() => login()}>Login</button
                >
            {:else}
                <!-- logged in -->
                <div class="dropdown dropdown-bottom dropdown-end">
                    <div tabindex="0" role="button" class="avatar">
                        <div
                            class="w-8 rounded-full ring-neutral-content ring-offset-base-100 rounded-full ring ring-offset-2 ring-1"
                        >
                            <img src={$user?.avatar_url} alt="avatar" />
                        </div>
                    </div>
                    <ul
                        class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                        <div class="flex justify-between text-2xl gap-2 mx-4">
                            <div>{$user?.username}</div>
                            <a
                                href={`https://osu.ppy.sh/users/${$user?.id}`}
                                class="btn btn-secondary btn-square btn-sm"
                                aria-label="Open in Osu Editor"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-4 w-4 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                </svg>
                            </a>
                        </div>
                        <div class="divider"></div>
                        <li>
                            <button
                                class="btn btn-ghost"
                                onclick={() => logout()}>Logout</button
                            >
                        </li>
                        <li>
                            <button
                                class="btn btn-ghost"
                                onclick={() => logout(true)}
                                >Logout from all devices</button
                            >
                        </li>
                    </ul>
                </div>
            {/if}
        </div>
    </div>
    {@render children()}
</div>