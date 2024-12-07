<script lang="ts">
    import Authcheck from "$lib/authcheck.svelte";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    const animeMix: number = 2024;

    let step: number = $state(0);
    const stepsCount = 2;

    function nextStep() {
        if (step + 1 > stepsCount) return;
        step = ++step;
    }

    function previousStep() {
        if (step - 1 < 0) return;
        step = --step;
    }

    let answers: questions = $state({
        interest: 0,
        experientMapper: false,
        participatedBefore: false,
        acceptsMods: false,
        familliarDiscordForum: false,
        fineWithUnraked: false,
        malLink: {
            valid: true,
            link: "",
        },
        musics: {
            m1: "",
            m2: "",
            m3: ""
        }
    });

    let disableNext: boolean = $derived(step + 1 > stepsCount);
    let disablePrevious: boolean = $derived(step - 1 < 0);

    let totalQuestions = Object.keys(answers).length;
    let answeredQuestions = $derived(
        (answers.interest !== -1 ? 1 : 0) +
            (typeof answers.experientMapper === "boolean" ? 1 : 0) +
            (typeof answers.participatedBefore === "boolean" ? 1 : 0) +
            (typeof answers.acceptsMods === "boolean" ? 1 : 0) +
            (typeof answers.acceptsMods === "boolean" ? 1 : 0) +
            (typeof answers.familliarDiscordForum === "boolean" ? 1 : 0) +
            (answers.malLink.valid ? 1 : 0),
    );
    let progress = $derived(
        Math.round(
            ((answeredQuestions - (stepsCount - 1 - step)) / totalQuestions) * 100,
        ),
    );

    let canSubmit: boolean = $derived(
        answers.interest !== -1 &&
            answers.experientMapper !== null &&
            answers.participatedBefore !== null &&
            answers.acceptsMods !== null &&
            answers.familliarDiscordForum !== null &&
            answers.fineWithUnraked !== null &&
            answers.malLink.valid,
    );

    interface questions {
        interest: number;
        experientMapper: boolean;
        participatedBefore: boolean;
        acceptsMods: boolean;
        familliarDiscordForum: boolean;
        fineWithUnraked: boolean;
        malLink: {
            valid: boolean;
            link: string;
        };
        musics: {
            m1: string;
            m2: string;
            m3: string;
        };
    }

    function validateMALLink(link: string) {
        const malRegex = /^https:\/\/(www\.)?myanimelist\.net\/(profile)\/?/;
        return malRegex.test(link);
    }

    function handleMALInput(event: any) {
        answers.malLink.link = event.target.value;
        answers.malLink.valid =
            event.target.value == "" || validateMALLink(event.target.value);
    }

    async function submit() {
        return; // disabled for now

        let response = await fetch("/api/form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "registration",
                formData: JSON.stringify(answers),
            }),
        });
        if (response.ok) {
            window.location.href = "/";
        }
        alert("submit error");
    }

    /*
    step 1
    
    *ranking coracao icone ? | Qual seu grau de interesse em participar do Anime {animeMix} Mix ?

    *bool | Voce se considera um mapper experiente ?
    
    *bool | Voce ja participou de versoes anteriores do projeto?
    
    
    step 2

    *bool | Voce esta ciente que seu mapa estara sendo submetido a mods da organizacao? (melhorar texto ta extranho)
    
    *bool | (perguntar se a pessoa esta familiarizada com o uso de foruns do discord, o uso do forum [e obrigatorio para participar]) 
    
    *bool | Nós não garantimos que este mapa será rankeado, rankear depende de vários fatores que dificilmente vão eheart ao nosso alcance. Você entende e aceita mesmo assim prosseguir com este projeto?
    
    step final

    string 3 x, my anime list link ? de fato precisa de validacao | enviar 3 musicas

*/
</script>

<Authcheck>
    <div class="flex flex-col flex-1 items-center p-2 gap-2">
        <header class="flex flex-row h-10 text-3xl font-bold gap-2 p-2">
            <div>Anime {animeMix} Mix</div>
        </header>

        <div class="divider"></div>

        <div class="grow flex flex-col gap-4 items-center text-lg w-[64rem]">
            {#if step == 0}
                <div class="text-center">
                    <div class="mb-4">
                        Qual seu grau de interesse em participar do Anime {animeMix}
                        Mix ?
                    </div>
                    <!-- <div>{answers.interest}</div> -->
                    <div
                        class="rating rating-lg rating-half w-full flex justify-center"
                    >
                        <!-- onchange={(e) =>
                        (answers.interest = parseFloat(
                            (e?.target as HTMLInputElement)?.value ?? 0,
                        ))} -->
                        <input
                            type="radio"
                            name="interest"
                            class="rating-hidden"
                            value={0}
                            checked={true}
                            bind:group={answers.interest}
                        />
                        <input
                            type="radio"
                            name="interest"
                            class="mask mask-heart mask-half-1 bg-red-500"
                            value={0.5}
                            bind:group={answers.interest}
                        />
                        <input
                            type="radio"
                            name="interest"
                            class="mask mask-heart mask-half-2 bg-red-500"
                            value={1}
                            bind:group={answers.interest}
                        />
                        <input
                            type="radio"
                            name="interest"
                            class="mask mask-heart mask-half-1 bg-orange-500"
                            value={1.5}
                            bind:group={answers.interest}
                        />
                        <input
                            type="radio"
                            name="interest"
                            class="mask mask-heart mask-half-2 bg-orange-500"
                            value={2}
                            bind:group={answers.interest}
                        />
                        <input
                            type="radio"
                            name="interest"
                            class="mask mask-heart mask-half-1 bg-green-500"
                            value={2.5}
                            bind:group={answers.interest}
                        />
                        <input
                            type="radio"
                            name="interest"
                            class="mask mask-heart mask-half-2 bg-green-500"
                            value={3}
                            bind:group={answers.interest}
                        />
                    </div>
                </div>

                <div class="divider"></div>
                <!-- <div>{answers.experientMapper}</div> -->
                <div
                    class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
                >
                    <div class="text-justify mx-4">
                        Você se considera um mapper experiente ?
                    </div>
                </div>
                <div>
                    <div class="form-control">
                        <label class="label cursor-pointer">
                            <div class="label-text p-2">Sim</div>
                            <input
                                type="radio"
                                name="experientMapper"
                                class="radio checked:bg-blue-500"
                                bind:group={answers.experientMapper}
                                value={true}
                            />
                        </label>
                        <div class="form-control">
                            <label class="label cursor-pointer">
                                <div class="label-text p-2">Não</div>
                                <input
                                    type="radio"
                                    name="experientMapper"
                                    class="radio checked:bg-blue-500"
                                    bind:group={answers.experientMapper}
                                    checked={true}
                                    value={false}
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div class="divider"></div>
                <!-- <div>{answers.participatedBefore}</div> -->
                <div
                    class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
                >
                    <div class="text-justify mx-4">
                        Você participou de versões anteriores do projeto?
                    </div>
                </div>
                <div>
                    <div class="form-control">
                        <label class="label cursor-pointer">
                            <div class="label-text p-2">Sim</div>
                            <input
                                type="radio"
                                name="participatedBefore"
                                class="radio checked:bg-blue-500"
                                bind:group={answers.participatedBefore}
                                value={true}
                            />
                        </label>
                        <div class="form-control">
                            <label class="label cursor-pointer">
                                <div class="label-text p-2">Não</div>
                                <input
                                    type="radio"
                                    name="participatedBefore"
                                    class="radio checked:bg-blue-500"
                                    bind:group={answers.participatedBefore}
                                    checked={true}
                                    value={false}
                                />
                            </label>
                        </div>
                    </div>
                </div>
            {/if}
            {#if step == 1}
                <!-- <div>{answers.acceptsMods}</div> -->
                <div
                    class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
                >
                    <div class="text-justify mx-4">
                        Seu mapa vai estar sujeito a mods, beleza?
                    </div>
                </div>
                <div>
                    <div class="form-control">
                        <label class="label cursor-pointer">
                            <div class="label-text p-2">Sim</div>
                            <input
                                type="radio"
                                name="acceptsMods"
                                class="radio checked:bg-blue-500"
                                bind:group={answers.acceptsMods}
                                value={true}
                            />
                        </label>
                        <div class="form-control">
                            <label class="label cursor-pointer">
                                <div class="label-text p-2">Não</div>
                                <input
                                    type="radio"
                                    name="acceptsMods"
                                    class="radio checked:bg-red-500"
                                    bind:group={answers.acceptsMods}
                                    checked={true}
                                    value={false}
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div class="divider"></div>
                <!-- <div>{answers.familliarDiscordForum}</div> -->
                <div
                    class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
                >
                    <div class="text-justify mx-4">
                        Já usou fóruns no Discord antes? Só avisando que é
                        obrigatório pra participar.
                    </div>
                </div>
                <div>
                    <div class="form-control">
                        <label class="label cursor-pointer">
                            <div class="label-text p-2">Sim</div>
                            <input
                                type="radio"
                                name="familliarDiscordForum"
                                class="radio checked:bg-blue-500"
                                bind:group={answers.familliarDiscordForum}
                                value={true}
                            />
                        </label>
                        <div class="form-control">
                            <label class="label cursor-pointer">
                                <div class="label-text p-2">Não</div>
                                <input
                                    type="radio"
                                    name="familliarDiscordForum"
                                    class="radio checked:bg-blue-500"
                                    bind:group={answers.familliarDiscordForum}
                                    checked={true}
                                    value={false}
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div class="divider"></div>
                <!-- <div>{answers.fineWithUnraked}</div> -->
                <div
                    class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
                >
                    <div class="text-center mx-4">
                        <p>
                            Nós não garantimos que este mapa será ranqueado,
                            ranquear depende de vários fatores que dificilmente
                            vão estar ao nosso alcance.
                        </p>
                        <p>
                            Você entende e aceita mesmo assim prosseguir com
                            este projeto?
                        </p>
                    </div>
                </div>
                <div>
                    <div class="form-control">
                        <label class="label cursor-pointer">
                            <div class="label-text p-2">Sim</div>
                            <input
                                type="radio"
                                name="fineWithUnraked"
                                class="radio checked:bg-green-500"
                                bind:group={answers.fineWithUnraked}
                                value={true}
                            />
                        </label>
                        <div class="form-control">
                            <label class="label cursor-pointer">
                                <div class="label-text p-2">Não</div>
                                <input
                                    type="radio"
                                    name="fineWithUnraked"
                                    class="radio checked:bg-red-500"
                                    bind:group={answers.fineWithUnraked}
                                    checked={true}
                                    value={false}
                                />
                            </label>
                        </div>
                    </div>
                </div>
            {/if}
            {#if step == 2}
                <!-- <div>{answers.malLink}</div> -->
                <div
                    class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
                >
                    <div class="text-justify mx-4">
                        Insira seu perfil do My Anime List, se quiser.
                    </div>
                </div>

                <div class="flex gap-2 w-full">
                    <input
                        type="text"
                        placeholder="Clique aqui para inserir"
                        class="input input-bordered w-full"
                        class:border-red-500={!answers.malLink.valid}
                        class:border-blue-500={answers.malLink.valid}
                        oninput={(e) => handleMALInput(e)}
                    />
                </div>

                <div class="divider"></div>

                <div
                    class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
                >
                    <div class="text-justify mx-4">
                        Insira até 3 músicas que você gostaria de ter no Anime Mix {animeMix}
                    </div>
                </div>

                <div class="flex gap-2 w-full">
                    <input
                        type="text"
                        placeholder="Música 1"
                        class="input input-bordered w-full"
                        bind:value={answers.musics.m1}
                    />
                </div>
                <div class="flex gap-2 w-full">
                    <input
                        type="text"
                        placeholder="Música 2"
                        class="input input-bordered w-full"
                        bind:value={answers.musics.m2}
                    />
                </div>
                <div class="flex gap-2 w-full">
                    <input
                        type="text"
                        placeholder="Música 3"
                        class="input input-bordered w-full"
                        bind:value={answers.musics.m3}
                    />
                </div>
            {/if}
        </div>
        <footer
            class="flex flex-row h-20 w-full gap-2 items-center justify-center"
        >
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
    </div></Authcheck
>
