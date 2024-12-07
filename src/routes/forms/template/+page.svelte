<script lang="ts">
    import Authcheck from "$lib/authcheck.svelte";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

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
        answers.question3 !== ""
    );

    interface questions {
        question1: string;
        question2: string;
        question3: string;

    }

    async function submit() {
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
    }

/*
    a
*/

</script>

<Authcheck>
    <div class="flex flex-col flex-1 items-center p-2 gap-2">
        <div class="flex flex-row h-10 text-3xl font-bold">
            <div>Anime {animeMix} Mix</div>
        </div>

        <div class="divider"></div>

        <div class="grow flex flex-col gap-4 items-center text-lg w-[64rem]">
            {#if step == 1}
                <div
                    class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
                >
                    <div class="text-justify mx-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </div>
                </div>

                <div class="flex gap-2 w-full">
                    <input
                        type="text"
                        placeholder="Clique aqui para responder"
                        class="input input-bordered w-full"
                        bind:value={answers.question1}
                    />
                </div>

                <div class="divider"></div>

                <div
                    class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
                >
                    <div class="text-justify mx-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </div>
                </div>
                <div class="flex gap-2 w-full justify-center">
                    <select class="select select-bordered w-full max-w-xs">
                        <option disabled selected
                            >Quem você acha o melhor mapper?</option
                        >
                        <option>Monstrata</option>
                        <option>Hollow Wings</option>
                    </select>
                </div>
                <div class="divider"></div>

                <div
                    class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
                >
                    <div class="text-justify mx-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </div>
                </div>
                <div>
                    <div class="form-control">
                        <label class="label cursor-pointer">
                            <div class="label-text p-2">Yes</div>
                            <input
                                type="radio"
                                name="radio-10"
                                class="radio checked:bg-blue-500"
                                checked={true}
                            />
                        </label>
                        <div class="form-control">
                            <label class="label cursor-pointer">
                                <div class="label-text p-2">No</div>
                                <input
                                    type="radio"
                                    name="radio-10"
                                    class="radio checked:bg-red-500"
                                    checked={true}
                                />
                            </label>
                        </div>
                    </div>
                </div>
            {/if}
            {#if step == 2}
                <div
                    class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
                >
                    <div class="text-justify mx-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </div>
                </div>
                <div>
                    <div class="form-control">
                        <label class="label cursor-pointer">
                            <div class="label-text p-2">Yes</div>
                            <input
                                type="radio"
                                name="radio-10"
                                class="radio checked:bg-blue-500"
                                checked={true}
                            />
                        </label>
                        <div class="form-control">
                            <label class="label cursor-pointer">
                                <div class="label-text p-2">No</div>
                                <input
                                    type="radio"
                                    name="radio-10"
                                    class="radio checked:bg-red-500"
                                    checked={true}
                                />
                            </label>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
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
