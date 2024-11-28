<script lang="ts">
    import OsuEditor from "../../lib/OsuEditor.svelte";

    import type { PageData } from "./$types";
    let { data }: { data: PageData } = $props();

    interface Slice {
        name: string;
        startTime: number | null;
        endTime: number | null;
        startTimeFormated: string;
        endTimeFormated: string;
        errors: string[];
        position: number;
        size: number;
    }

    let slices: { [key: number]: Slice } = $state({});
    let slicesOrder: number[] = $derived(
        Object.keys(slices)
            .map(Number)
            .sort(
                (a, b) =>
                    (slices[a].startTime ?? -1) - (slices[b].startTime ?? -1),
            ),
    );
    let selectedSlice: number | null = $state(null);
    let idCounter: number = $state(0);
    let fileInput: HTMLInputElement | null = $state(null);

    function newSlice() {
        let id = idCounter++;
        slices[id] = {
            name: "",
            startTimeFormated: "",
            startTime: null,
            endTimeFormated: "",
            endTime: null,
            errors: [],
            position: 0,
            size: 0,
        };
        selectedSlice = id;
        checkSliceErrors();
        updateTimeline();
    }

    function deleteSlice() {
        if (selectedSlice === null) {
            console.log("deleteSlice: No slice selected");
            return;
        }
        const oldslice = selectedSlice;
        selectedSlice = null;
        const index = slicesOrder.indexOf(oldslice);

        if (index !== -1) {
            if (index + 1 <= slicesOrder.length - 1) {
                selectedSlice = slicesOrder[index + 1];
            } else if (index - 1 >= 0) {
                selectedSlice = slicesOrder[index - 1];
            }
        }

        delete slices[oldslice];

        checkSliceErrors();
        updateTimeline();
    }

    function updateSlice() {
        if (selectedSlice === null) {
            console.log("updateSlice: No slice selected");
            return;
        }
        let slice = slices[selectedSlice];

        slice.startTime = parseOsuTimeFormat(slice.startTimeFormated.trim());
        slice.endTime = parseOsuTimeFormat(slice.endTimeFormated.trim());

        checkSliceErrors();
        updateTimeline();
    }

    function checkSliceErrors() {
        // Clear all existing errors
        Object.values(slices).forEach((slice) => {
            slice.errors = [];
        });

        // Single pass to validate all slices
        for (let i = 0; i < slicesOrder.length; i++) {
            const slice = slices[slicesOrder[i]];
            const nextSlice = slicesOrder[i + 1]
                ? slices[slicesOrder[i + 1]]
                : null;

            let isNameValid = true;
            let isRangeValid = true;

            // Validate name
            if (!slice.name.trim()) {
                slice.errors.push("Invalid name.");
                isNameValid = false;
            }

            // check start time and end time
            if (slice.startTime === null || slice.startTime < 0) {
                slice.errors.push("Invalid start time.");
                isRangeValid = false;
            }

            if (slice.endTimeFormated !== "" && slice.endTime === null) {
                slice.errors.push("Invalid end time.");
                isRangeValid = false;
            }

            if (
                isRangeValid &&
                slice.endTime !== null &&
                slice.startTime !== null &&
                slice.startTime >= slice.endTime
            ) {
                slice.errors.push("Invalid range.");
                isRangeValid = false;
            }

            // check overlaps and duplicates
            if (isRangeValid && nextSlice) {
                if (
                    slice.endTime !== null &&
                    nextSlice.startTime !== null &&
                    slice.endTime > nextSlice.startTime
                ) {
                    slice.errors.push("range overlaps with next slice.");
                    nextSlice.errors.push(
                        "range overlaps with previous slice.",
                    );
                }

                if (slice.startTime === nextSlice.startTime) {
                    slice.errors.push("Conficting start time.");
                    nextSlice.errors.push("Conficting start time.");
                }
            }

            // check consecutive names
            if (isRangeValid && isNameValid && nextSlice) {
                if (
                    slice.name === nextSlice.name &&
                    (slice.endTime === null ||
                        slice.endTime === nextSlice.startTime)
                ) {
                    slice.errors.push(
                        "Name cannot be the same as the next slice.",
                    );
                    nextSlice.errors.push(
                        "Name cannot be the same as the previous slice.",
                    );
                }
            }
        }
    }

    function osuTimeFormat(time: number): string {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = time % 1000;

        const formattedMinutes = minutes.toString().padStart(2, "0");
        const formattedSeconds = seconds.toString().padStart(2, "0");
        const formattedMilliseconds = milliseconds.toString().padStart(3, "0");
        return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
    }

    function parseOsuTimeFormat(time: string): number | null {
        const timeMatch = time.match(/^(\d+):([0-5]?\d):(\d{3})/);

        if (timeMatch) {
            const [_, minutes, seconds, milliseconds] = timeMatch;
            return (
                parseInt(minutes, 10) * 60 * 1000 +
                parseInt(seconds, 10) * 1000 +
                parseInt(milliseconds, 10)
            );
        }

        const millisecondsMatch = time.match(/^\d+$/);
        if (millisecondsMatch) {
            return parseInt(time, 10);
        }

        return null;
    }

    async function loadFile() {
        const file: File | null = fileInput?.files?.[0] ?? null;

        if (file === null) {
            console.log("loadFile: No file selected");
            alert("No file selected");
            return;
        }

        const content: string = await file.text();
        const extension: string | null = file.name.split(".").pop() ?? null;

        if (extension === null) {
            console.log("loadFile: file has no extension");
            alert("file has no extension");
            return;
        }
        let newSlices: Slice[] | null = null;
        switch (extension) {
            case "json":
                newSlices = parseJson(content);
                break;
            case "osu":
                newSlices = parseOsuBookmarks(content);
                break;
            default:
                console.log("loadFile: Unsupported file type: ", extension);
                alert("Unsupported file type");
                return;
        }

        if (newSlices === null) {
            console.log("loadFile: newslices");
            return;
        }

        selectedSlice = null;
        slices = {};
        idCounter = 0;

        newSlices.forEach((slice) => {
            let id = idCounter++;
            slices[id] = slice;
        });

        checkSliceErrors();
        updateTimeline();
    }

    function parseOsuBookmarks(content: string): Slice[] | null {
        if (content.length === 0) return null;

        try {
            const bookmarksRegex: RegExp = /Bookmarks:\s*(\d[\d,]*)/;

            const matchs: RegExpMatchArray | null =
                content.match(bookmarksRegex);

            if (matchs === null) return null;

            const bookmarks: number[] = matchs[1].split(",").map((num) => {
                const value: number = parseInt(num.trim());
                return isNaN(value) ? -1 : value;
            });

            if (bookmarks.length === 0) return null;

            return bookmarks.map((bookmark) => ({
                name: "",
                startTime: bookmark,
                endTime: null,
                startTimeFormated: osuTimeFormat(bookmark),
                endTimeFormated: "",
                errors: [],
                position: 0,
                size: 0,
            }));
        } catch (error) {
            console.error("parseOsuBookmarks: ", error);
            alert("Error parsing osu file");
            return null;
        }
    }

    function parseJson(content: string): Slice[] | null {
        if (content.length === 0) return null;

        try {
            const jsonContent = JSON.parse(content);

            return jsonContent.map((item: any) => {
                const name = typeof item.Name === "string" ? item.Name : "";
                const startTime =
                    typeof item.StartTime === "number" ? item.StartTime : null;
                const endTime =
                    item.EndTime === null || typeof item.EndTime === "number"
                        ? item.EndTime
                        : null;

                const startTimeFormated =
                    startTime !== null ? osuTimeFormat(startTime) : "";
                const endTimeFormated =
                    endTime !== null ? osuTimeFormat(endTime) : "";
                const errors: string[] = [];

                return {
                    name,
                    startTime,
                    endTime,
                    startTimeFormated,
                    endTimeFormated,
                    errors,
                };
            });
        } catch (error) {
            console.error("parseJson: ", error);
            alert("Error parsing JSON");
            return null;
        }
    }

    function saveFile() {
        let data: string;
        try {
            const output = Object.values(slices).map((slice) => ({
                Name: slice.name,
                StartTime: slice.startTime ?? -1,
                EndTime: slice.endTime,
            }));
            data = JSON.stringify(output, null, 2);
        } catch (error) {
            console.error("Error serializing slices:", error);
            alert("Failed to save file");
            return;
        }

        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.href = url;
        a.download = "Collab.json";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);
    }

    function GetAutomaticEndTime(key: number | null): number | null {
        if (key === null) return null; // No selected slice
        if (slices[key].endTime !== null) return slices[key].endTime; // current slice has an endTime
        let index = slicesOrder.indexOf(key);
        if (index === -1 || index + 1 >= Object.keys(slices).length)
            return null; // No next slice
        return slices[slicesOrder[index + 1]].startTime; // Return next slice startTime
    }

    function timeLineDuration(): number {
        const chunk: number = 30000; // 30 seconds
        // return chunk * 3;

        if (slicesOrder.length === 0) {
            return chunk;
        }

        const lastSlice = slices[slicesOrder[slicesOrder.length - 1]];
        const lastTime = lastSlice?.endTime ?? lastSlice?.startTime ?? 0;

        return Math.floor(lastTime / chunk + 1) * chunk;
    }

    function updateTimeline() {
        const totalDuration: number = timeLineDuration();
        Object.entries(slices).forEach(([key, slice]) => {
            slice.position = ((slice.startTime ?? 0) / totalDuration) * 100;
            slice.size =
                (((GetAutomaticEndTime(parseInt(key)) ?? totalDuration) -
                    (slice.startTime ?? 0)) /
                    totalDuration) *
                100;
        });
        slices = { ...slices };
    }
</script>

<div class="flex flex-col flex-1 gap-2 justify-between h-full">
    <div class="flex justify-start">
        <!-- save buttom -->
        <div>
            <div class="tooltip" data-tip="Save collab information">
                <button
                    class="btn btn-primary btn-success btn-wide"
                    onclick={saveFile}
                    disabled={Object.keys(slices).length === 0 ||
                        Object.values(slices).some(
                            (slice) => slice.errors.length > 0,
                        )}
                >
                    <div class="flex justify-center items-center text-lg">Save</div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                    </svg>
                </button>
            </div>

            <!-- load button -->
            <div class="tooltip" data-tip="Load an json or osu file">
                <label
                    for="file-upload"
                    class={"btn btn-primary" +
                        (Object.values(slices).length !== 0
                            ? " btn-outline"
                            : "")}>Load</label
                >
                <input
                    id="file-upload"
                    type="file"
                    class="file-input w-full max-w-xs input-sm hidden"
                    bind:this={fileInput}
                    onchange={loadFile}
                    accept=".json, .osu"
                />
            </div>
        </div>
    </div>

    <div class="flex gap-2 justify-center flex-1">
        <!-- slice list -->
        <div class="flex flex-col gap-2 p-2">
            <div class="flex justify-center items-center text-lg font-bold">
                Slice List
            </div>
            <div class="flex overflow-y-scroll gap-2 p-2">
                <ul class="list">
                    {#each slicesOrder as id}
                        <li>
                            <div>
                                <button
                                    class={"btn btn-sm rounded-none w-full " +
                                        (selectedSlice === id
                                            ? "btn-primary"
                                            : slices[id].errors.length !== 0
                                              ? "btn-error"
                                              : "btn-ghost")}
                                    onclick={() => {
                                        selectedSlice = id;
                                    }}
                                >
                                    <div class="text-lg">
                                        {slices[id].startTime !== null
                                            ? osuTimeFormat(
                                                  slices[id].startTime,
                                              )
                                            : "?"} - {GetAutomaticEndTime(
                                            id,
                                        ) !== null
                                            ? osuTimeFormat(
                                                  GetAutomaticEndTime(id) ?? 0,
                                              )
                                            : id ===
                                                    slicesOrder[
                                                        slicesOrder.length - 1
                                                    ] &&
                                                slices[id].endTime === null
                                              ? "end"
                                              : "?"} | {slices[id].name || "?"}
                                    </div>
                                </button>
                            </div>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>

        <div
            class="flex flex-row gap-2 p-2 border-neutral-content rounded justify-center flex-1 items-center"
        >
            <!-- slice details -->
            {#if selectedSlice === null}
                <div class="flex justify-center items-center">No Selection</div>
            {:else}
                <!-- Debug Information
        <div class="gap-2 ">
            <div>Slice Info</div>
            <div>id: {selectedSlice}</div>
            <div>index: {slicesOrder.indexOf(selectedSlice)}</div>
            <div>name: {slices[selectedSlice].name}</div>
            <div>start: {slices[selectedSlice].startTimeFormated}</div>
            <div>startTime: {slices[selectedSlice].startTime}</div>
            <div>end: {slices[selectedSlice].endTimeFormated}</div>
            <div>endTime: {slices[selectedSlice].endTime}</div>
            <div>errors:</div>
            {#each slices[selectedSlice].errors as error, index}
                <div>{error}</div>
            {/each}
        </div> -->
                <div class="flex flex-col gap-2 justify-center items-center">
                    <div class="flex flex-col gap-2">
                        <!-- name -->
                        <div class="flex gap-2">
                            <input
                                type="text"
                                placeholder="Name"
                                class="input input-bordered input-primary w-full"
                                onchange={updateSlice}
                                bind:value={slices[selectedSlice].name}
                            />
                        </div>
                        <div class="flex gap-2">
                            <!-- start -->
                            <input
                                type="text"
                                placeholder="Start Time"
                                class="input input-bordered input-primary w-full max-w-xs"
                                onchange={updateSlice}
                                bind:value={slices[selectedSlice]
                                    .startTimeFormated}
                            />
                            <OsuEditor time={slices[selectedSlice].startTime} />

                            <div class="divider divider-horizontal"></div>

                            <!-- end -->
                            <input
                                type="text"
                                placeholder="End Time (Automatic)"
                                class="input input-bordered input-primary w-full max-w-xs"
                                onchange={updateSlice}
                                bind:value={slices[selectedSlice]
                                    .endTimeFormated}
                            />

                            <div class="flex">
                                <OsuEditor
                                    time={GetAutomaticEndTime(selectedSlice)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- errors -->
                {#if slices[selectedSlice]?.errors.length !== 0}
                    <div
                        class="flex flex-col gap-2 p-2 border border-error rounded"
                    >
                        <div>
                            {#each slices[selectedSlice]?.errors as error}
                                <div>{error}</div>
                            {/each}
                        </div>
                    </div>
                {/if}
            {/if}
        </div>
    </div>
    <!-- time line -->
    <div class="flex flex-col gap-2 p-2 w-full">
        <!-- controls -->
        <div class="flex gap-2">
            <!-- add slice -->
            <div class="tooltip" data-tip="New slice">
                <button
                    class="btn btn-primary text-xl btn-xl btn-square"
                    onclick={() => newSlice()}>+</button
                >
            </div>

            <!-- prev slice -->
            <div class="tooltip" data-tip="Previous slice">
                <button
                    class="btn btn-primary text-xl btn-xl btn-square"
                    onclick={() => {
                        if (selectedSlice === null) return;
                        const index = slicesOrder.indexOf(selectedSlice);
                        if (index <= 0) return;
                        selectedSlice = slicesOrder[index - 1];
                    }}
                    disabled={selectedSlice === null ||
                        slicesOrder.indexOf(selectedSlice) <= 0}
                >
                    &lt;
                </button>
            </div>

            <!-- next slice -->
            <div class="tooltip" data-tip="Next slice">
                <button
                    class="btn btn-primary text-xl btn-xl btn-square"
                    onclick={() => {
                        if (selectedSlice === null) return;
                        const index = slicesOrder.indexOf(selectedSlice);
                        if (index === -1 || index >= slicesOrder.length - 1)
                            return;
                        selectedSlice = slicesOrder[index + 1];
                    }}
                    disabled={selectedSlice === null ||
                        slicesOrder.indexOf(selectedSlice) >=
                            slicesOrder.length - 1 ||
                        slicesOrder.indexOf(selectedSlice) === -1}
                >
                    &gt;
                </button>
            </div>

            <div class="flex gap-2 justify-end w-full">
                <!-- delete buttom -->
                <div class="tooltip" data-tip="Delete current slice">
                    <button
                        class="btn btn-primary btn-error"
                        onclick={deleteSlice}
                        aria-label="Delete current slice"
                        disabled={selectedSlice === null}
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div
            class="relative w-full h-24 border-4 border-neutral-content bg-base-100 rounded"
        >
            {#each Object.entries(slices) as [id, slice] (id)}
                <div
                    class="absolute h-full text-white text-xs flex items-center justify-center rounded"
                    style="left: {slice.position}%; width: {slice.size}%;"
                >
                    <button
                        class={`h-full w-full border-neutral-content border-x border-y-0 
                    ${
                        selectedSlice === Number(id)
                            ? "bg-primary text-primary-content"
                            : slice.errors.length !== 0
                              ? "bg-error text-error-content"
                              : "text-base-content"
                    }
                    hover:bg-base-content hover:text-base-100`}
                        onclick={() => {
                            selectedSlice = Number(id);
                        }}
                    >
                        <div class="font-bold text-sm">{slice.name}</div>
                    </button>
                </div>
            {/each}
        </div>
    </div>
</div>
