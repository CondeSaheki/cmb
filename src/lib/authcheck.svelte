<script lang="ts">
    import { user } from "$lib/userData";
</script>

{#if $user}
    <slot />
{:else}
    <p class="text-error my-10">
        You must be signed in to view this page.
        <a class="btn btn-primary" href="/">Return</a>
    </p>
{/if}
