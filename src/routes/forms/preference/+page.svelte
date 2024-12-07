<script lang="ts">
    import Authcheck from "$lib/authcheck.svelte";
    import Youtube from "$lib/youtube.svelte";

    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    // template stuff

    const animeMix: number = 2024;
    let step: number = $state(0);
    const stepsCount = 4;

    function nextStep() {
        if (step + 1 > stepsCount) return;
        step = ++step;
    }

    function previousStep() {
        if (step - 1 < 0) return;
        step = --step;
    }

    let answers: questions = $state({
        question1: "",
        question2: "",
        question3: "",
    });

    let disableNext: boolean = $derived(step + 1 > stepsCount);
    let disablePrevious: boolean = $derived(step - 1 < 0);

    let totalQuestions = 11 + 6;
    let answeredQuestions = $derived(
        (answers.question1 !== "" ? 1 : 0) +
            (answers.question2 !== "" ? 1 : 0) +
            (answers.question3 !== "" ? 1 : 0),
    );
    let progress = $derived(
        Math.round((answeredQuestions / totalQuestions) * 100),
    );

    let canSubmit: boolean = $derived(
        answers.question1 !== "" &&
            answers.question2 !== "" &&
            answers.question3 !== "",
    );

    interface questions {
        question1: string;
        question2: string;
        question3: string;
    }

    async function submit() {
        return; // disabled for now

        let response = await fetch("/api/form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "feedback",
                formData: JSON.stringify(answers),
            }),
        });
        if (response.ok) {
            window.location.href = "/";
        }
        else
        {
            alert("submit error");
        }
    }

    // gamers stuff

    // Type definition for track
    interface Track {
        id: number;
        name: string;
    }

    interface Anime {
        title: string;
        title2: string | null;
        category: string;
        myanimelist: string;
        youtube: string;
    }

    const animes: Anime[] = [
        {
            title: "Mashle",
            title2: "Mashle aaaaaaa",
            category: "Ritmo Divertido",

            myanimelist:
                "https://myanimelist.net/anime/55813/Mashle__Shinkakusha_Kouho_Senbatsu_Shiken-hen",
            youtube: "mLW35YMzELE",
        },
        {
            title: "Dandadan",
            title2: null,
            category: "Ritmo Divertido",
            myanimelist: "https://myanimelist.net/anime/57334/Dandadan",
            youtube: "dyDrodeIA7o",
        },
    ];

    // Initialize the list of tracks
    let tracks: Track[] = [
        { id: 1, name: "Mashle" },
        { id: 2, name: "Dandadan" },
        { id: 3, name: "Ranma ½" },
    ];

    // Variables to handle drag and drop
    let draggedIndex: number | null = null;

    // Function to handle when dragging starts
    function handleDragStart(event: DragEvent, index: number) {
        draggedIndex = index;
    }

    // Function to handle the drop event
    function handleDrop(event: DragEvent, index: number) {
        event.preventDefault();

        if (draggedIndex === null || draggedIndex === index) return;

        // Copy the tracks array (this will trigger reactivity)
        const updatedTracks = [...tracks];

        const movedItem = updatedTracks[draggedIndex];
        updatedTracks.splice(draggedIndex, 1); // Remove item from its old position
        updatedTracks.splice(index, 0, movedItem); // Insert item at new position

        // Reassign tracks to trigger reactivity
        tracks = updatedTracks;

        // Reset the dragged index
        draggedIndex = null;
    }

    // Function to allow the dragover event to enable dropping
    function handleDragOver(event: DragEvent) {
        event.preventDefault();
    }

    /*
    step 1
    carousel | for each entry
        ranking | Musica
        bool | Viu esse anime?
            ranking | anime
        ranking | vontade de mappear

    # AVISO ENORME PRA FAZER DIREITO
    array, drag and drop | preferencia de mapping
*/
</script>

<Authcheck>
    <div class="flex flex-col flex-1 items-center p-2 gap-2">
        <header class="flex flex-row h-10 text-3xl font-bold gap-2 p-2">
            <div>Anime {animeMix} Mix</div>
        </header>

        <div class="divider"></div>
    </div>
    <div class="flex flex-col flex-1 items-center p-2 gap-2">
        <div class="carousel w-full h-full">
            <div id="item1" class="carousel-item w-full">
                <div
                    class="flex flex-col flex-1 items-center p-2 gap-2 justify-items-center"
                >
                    <div class="flex flex-col items-center gap-2">
                        <div class="card bg-base-200 rounded-box w-full p-2">
                            <div
                                class="flex flex-col flex-1 items-center text-justify text-center mx-4 text-3xl"
                            >
                                <div>anime titulo</div>
                                <div>anime alt titulo</div>
                            </div>
                        </div>

                        <div
                            class="flex flex-row flex-1 items-start gap-2 justify-items-center"
                        >
                            <div
                                class="card bg-base-200 rounded-box place-items-center p-4 gap-4"
                            >
                                <Youtube
                                    video="mLW35YMzELE"
                                    width={720}
                                    height={360}
                                />
                                <a
                                    href="/"
                                    class="btn btn-primary w-full rounded-xl"
                                >
                                    <img
                                        src="/myanimelist.png"
                                        alt="MyAnimeList"
                                    />
                                </a>
                            </div>

                            <div class="divider divider-horizontal"></div>

                            <!-- questions -->
                            <div
                                class="flex flex-col flex-1 items-center gap-2 border-2"
                            >
                                <div
                                    class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
                                >
                                    <div class="text-justify mx-4">
                                        O quanto você gostaria de mappear a
                                        musica desse anime?
                                    </div>
                                </div>
                                <div
                                    class="rating rating-lg rating-half w-full flex justify-center"
                                >
                                    <!-- onchange={(e) =>
                                    (answers.question1 = parseFloat(
                                        (e?.target as HTMLInputElement)?.value ?? 0,
                                    ))} -->
                                    <input
                                        type="radio"
                                        name="question1"
                                        class="rating-hidden"
                                        value={-1}
                                        checked={true}
                                        bind:group={answers.question1}
                                    />
                                    <input
                                        type="radio"
                                        name="question1"
                                        class="mask mask-heart mask-half-1 bg-red-500"
                                        value={0.5}
                                        bind:group={answers.question1}
                                    />
                                    <input
                                        type="radio"
                                        name="question1"
                                        class="mask mask-heart mask-half-2 bg-red-500"
                                        value={1}
                                        bind:group={answers.question1}
                                    />
                                    <input
                                        type="radio"
                                        name="question1"
                                        class="mask mask-heart mask-half-1 bg-orange-500"
                                        value={1.5}
                                        bind:group={answers.question1}
                                    />
                                    <input
                                        type="radio"
                                        name="question1"
                                        class="mask mask-heart mask-half-2 bg-orange-500"
                                        value={2}
                                        bind:group={answers.question1}
                                    />
                                    <input
                                        type="radio"
                                        name="question1"
                                        class="mask mask-heart mask-half-1 bg-green-500"
                                        value={2.5}
                                        bind:group={answers.question1}
                                    />
                                    <input
                                        type="radio"
                                        name="question1"
                                        class="mask mask-heart mask-half-2 bg-green-500"
                                        value={3}
                                        bind:group={answers.question1}
                                    />
                                </div>

                                <div
                                    class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
                                >
                                    <div class="text-justify mx-4">
                                        O quanto voce gosta dessa musica?
                                    </div>
                                </div>

                                <div>
                                    <div
                                        class="rating rating-lg rating-half w-full flex justify-center"
                                    >
                                        <!-- onchange={(e) =>
                                        (answers.question1 = parseFloat(
                                            (e?.target as HTMLInputElement)?.value ?? 0,
                                        ))} -->
                                        <input
                                            type="radio"
                                            name="question1"
                                            class="rating-hidden"
                                            value={-1}
                                            checked={true}
                                            bind:group={answers.question1}
                                        />
                                        <input
                                            type="radio"
                                            name="question1"
                                            class="mask mask-heart mask-half-1 bg-red-500"
                                            value={0.5}
                                            bind:group={answers.question1}
                                        />
                                        <input
                                            type="radio"
                                            name="question1"
                                            class="mask mask-heart mask-half-2 bg-red-500"
                                            value={1}
                                            bind:group={answers.question1}
                                        />
                                        <input
                                            type="radio"
                                            name="question1"
                                            class="mask mask-heart mask-half-1 bg-orange-500"
                                            value={1.5}
                                            bind:group={answers.question1}
                                        />
                                        <input
                                            type="radio"
                                            name="question1"
                                            class="mask mask-heart mask-half-2 bg-orange-500"
                                            value={2}
                                            bind:group={answers.question1}
                                        />
                                        <input
                                            type="radio"
                                            name="question1"
                                            class="mask mask-heart mask-half-1 bg-green-500"
                                            value={2.5}
                                            bind:group={answers.question1}
                                        />
                                        <input
                                            type="radio"
                                            name="question1"
                                            class="mask mask-heart mask-half-2 bg-green-500"
                                            value={3}
                                            bind:group={answers.question1}
                                        />
                                    </div>
                                </div>

                                <div
                                    class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
                                >
                                    <div class="text-justify mx-4">
                                        Voce ja viu esse anime antes?
                                    </div>
                                </div>
                                <div>
                                    <div class="form-control w-52">
                                        <label class="label cursor-pointer">
                                            <input
                                                type="checkbox"
                                                class="toggle toggle-accent"
                                                checked={true}
                                            />
                                        </label>
                                    </div>
                                </div>
                                {#if true}
                                    <div class="text-center">
                                        <div class="mb-4">
                                            O quanto você gostaria de mappear
                                            esse anime?
                                        </div>
                                        <div>{answers.question1}</div>
                                        <div
                                            class="rating rating-lg rating-half w-full flex justify-center"
                                        >
                                            <!-- onchange={(e) =>
                    (answers.question1 = parseFloat(
                        (e?.target as HTMLInputElement)?.value ?? 0,
                    ))} -->
                                            <input
                                                type="radio"
                                                name="question1"
                                                class="rating-hidden"
                                                value={-1}
                                                checked={true}
                                                bind:group={answers.question1}
                                            />
                                            <input
                                                type="radio"
                                                name="question1"
                                                class="mask mask-heart mask-half-1 bg-red-500"
                                                value={0.5}
                                                bind:group={answers.question1}
                                            />
                                            <input
                                                type="radio"
                                                name="question1"
                                                class="mask mask-heart mask-half-2 bg-red-500"
                                                value={1}
                                                bind:group={answers.question1}
                                            />
                                            <input
                                                type="radio"
                                                name="question1"
                                                class="mask mask-heart mask-half-1 bg-orange-500"
                                                value={1.5}
                                                bind:group={answers.question1}
                                            />
                                            <input
                                                type="radio"
                                                name="question1"
                                                class="mask mask-heart mask-half-2 bg-orange-500"
                                                value={2}
                                                bind:group={answers.question1}
                                            />
                                            <input
                                                type="radio"
                                                name="question1"
                                                class="mask mask-heart mask-half-1 bg-green-500"
                                                value={2.5}
                                                bind:group={answers.question1}
                                            />
                                            <input
                                                type="radio"
                                                name="question1"
                                                class="mask mask-heart mask-half-2 bg-green-500"
                                                value={3}
                                                bind:group={answers.question1}
                                            />
                                        </div>
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="item2" class="carousel-item w-full">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
                    class="w-full"
                    alt="deletar"
                />
            </div>
        </div>
        <div class="flex w-full justify-center gap-2 py-2">
            <a href="#item1" class="btn btn-md">anime name foda</a>
            <a href="#item2" class="btn btn-md">2</a>
            <a href="#item3" class="btn btn-md">3</a>
            <a href="#item4" class="btn btn-md">4</a>
        </div>
    </div>

    <div class="divider"></div>
    asdasdasdasdsad
    <div class="divider"></div>
    <footer class="flex flex-row h-20 w-full gap-2 items-center justify-center">
        <!-- buttons -->

        {#if !disablePrevious}
            <button class="btn btn-primary" onclick={() => previousStep()}>
                previous
            </button>
        {/if}
        {#if !disableNext}
            <button class="btn btn-primary" onclick={() => nextStep()}>
                Next
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
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                </svg>
            </button>
        {/if}
        <button
            class="btn btn-primary btn-success btn-wide"
            disabled={!canSubmit}
            onclick={() => submit()}
        >
            Submit
        </button>
        <div class="flex size-12 overflow-hidden">
            <div
                class="radial-progress text-success border-primary text-xs size-12"
                style={`--value:${progress};`}
                role="progressbar"
            ></div>
        </div>
        <div>{progress}%</div>
    </footer>
</Authcheck>
