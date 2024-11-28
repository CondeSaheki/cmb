<script lang="ts">
    import "../app.css";
    import type { Snippet } from "svelte";
    import type { LayoutData } from "./$types";

    let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div class="flex flex-col min-h-screen">
    <div class="navbar bg-base-100">
        <div class="navbar-start">
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
        </div>
        

        <div class="navbar-center">
            <a href="/" class="btn btn-ghost text-xl">
                <img src={"favicon.png"} alt="logo" class="h-8 w-8" />
                Central De Mapping Brasileiro
            </a>
        </div>

        <div class="navbar-end">
            
        </div>
    </div>
    
    {@render children()}
</div>
