<script lang="ts">
    let { time }: { time: number | null } = $props();

    function osuTimeStamp(timestamp: number): string {
        const minutes = Math.floor(timestamp / 60000);
        const seconds = Math.floor((timestamp % 60000) / 1000);
        const milliseconds = timestamp % 1000;

        const formattedMinutes = minutes.toString().padStart(2, "0");
        const formattedSeconds = seconds.toString().padStart(2, "0");
        const formattedMilliseconds = milliseconds.toString().padStart(3, "0");
        return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
    }

    function osuEditorLink(timestamp: number): string {
        return `osu://edit/${osuTimeStamp(timestamp)}`;
    }

    let editorUrl: string = $derived(time === null ? "" : osuEditorLink(time));
</script>

{#if time !== null}
    <div>
        <div class="tooltip" data-tip="Open in Osu Editor">
            <a href={editorUrl} class="btn btn-secondary btn-square" aria-label="Open in Osu Editor">
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
    </div>
{:else}
    <div>
        <div class="tooltip" data-tip="Open in Osu Editor">
            <button class="btn btn-secondary btn-square btn-disabled" aria-label="Open in Osu Editor">
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
            </button>
        </div>
    </div>
{/if}
