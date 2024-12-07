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
        question4: "",
        question5: "",
        question6: "",
        question7: "",
        question8: "",
        question9: "",
        question10: {
            animesMusic: 0,
            divisionParticipants: 0,
            teamMeeting: 0,
            divisionParts: 0,
            orientation: 0,
            deadline: 0,
            organizationCommunication: 0,
        },
        question11: "",
    });

    let disableNext: boolean = $derived(step + 1 > stepsCount);
    let disablePrevious: boolean = $derived(step - 1 < 0);

    let totalQuestions = 11 + 6;
    let answeredQuestions = $derived(
        (answers.question1 !== "" ? 1 : 0) +
            (answers.question2 !== "" ? 1 : 0) +
            (answers.question3 !== "" ? 1 : 0) +
            (answers.question4 !== "" ? 1 : 0) +
            (answers.question5 !== "" ? 1 : 0) +
            (answers.question6 !== "" ? 1 : 0) +
            (answers.question7 !== "" ? 1 : 0) +
            (answers.question8 !== "" ? 1 : 0) +
            (answers.question9 !== "" ? 1 : 0) +
            (answers.question10.animesMusic !== 0 ? 1 : 0) +
            (answers.question10.divisionParticipants !== 0 ? 1 : 0) +
            (answers.question10.teamMeeting !== 0 ? 1 : 0) +
            (answers.question10.divisionParts !== 0 ? 1 : 0) +
            (answers.question10.orientation !== 0 ? 1 : 0) +
            (answers.question10.deadline !== 0 ? 1 : 0) +
            (answers.question10.organizationCommunication !== 0 ? 1 : 0) +
            (answers.question11 !== "" ? 1 : 0),
    );
    let progress = $derived(
        Math.round((answeredQuestions / totalQuestions) * 100),
    );

    let canSubmit: boolean = $derived(
        answers.question1 !== "" &&
            answers.question2 !== "" &&
            answers.question3 !== "" &&
            answers.question4 !== "" &&
            answers.question5 !== "" &&
            answers.question6 !== "" &&
            answers.question7 !== "" &&
            answers.question8 !== "" &&
            answers.question9 !== "" &&
            answers.question11 !== "",
    );

    interface questions {
        question1: string;
        question2: string;
        question3: string;
        question4: string;
        question5: string;
        question6: string;
        question7: string;
        question8: string;
        question9: string;
        question10: {
            animesMusic: number;
            divisionParticipants: number;
            teamMeeting: number;
            divisionParts: number;
            orientation: number;
            deadline: number;
            organizationCommunication: number;
        };
        question11: string;
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
        alert("submit error");
    }

    /*
    Forum
    Animes
    Organização (Live, Canal de Textos com Guias, Avisos Discord)
    Mods
    Orientação do Estilo de Mapping
    Divisão das Partes
    Mapa Separado ou Junto
    9 perguntas

    1 -* O que você achou da organização do projeto? Tem alguma sugestão de melhoria?*
    2 -* O que você achou das mudanças desta edição em relação as anteriores? Tem alguma sugestão de melhoria?*
    3 -* O que você achou do Forum no Discord? Tem alguma sugestão de melhoria?*
    4 -* O que você achou dos Mappers Experientes agora receberem orientação diretamente da organização e poderem mapear mais de uma música. Tem alguma sugestão de melhoria?
    5 -* O que você achou da troca do sorteio pela montagem do time. Tem alguma sugestão de melhoria?
    6 -* O que você achou das Musicas/Animes não estão mais limitadas a seasons. Tem alguma sugestão de melhoria?
    7 - O que você achou que dos mapas tinham uma espectativa da organização quanto ao estilo e dificuldade. Tem alguma sugestão de melhoria?
    8 - O que você achou dessa edição os mods da organização ocorreram ao longo do projeto ao invés de só ocorrer no final. Tem alguma sugestão de melhoria?
    9 - O que você achou dos mapas estavam em arquivos separados ao invés de estarem com o áudio junto. Tem alguma sugestão de melhoria?

    10) Qual seu grau de satisfação em relação a:

    a) Animes/Musicas escolhidos para a maratona.
    b) Divisão Feita pelos organizadores de participantes e músicas.
    c) Reunião e comunicação do seu time para organizar o mapa.
    d) Divisão das Partes em que cada um fez o mapa.
    e) Orientação recebidas pelo mapper experiente e da organização (Net0).
    f) Prazo e tempo para fazer o mapa e hitsounds.
    g) Comunicação da organização para informar sobre os prazos e como fazer o projeto.    
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
                <!-- question 1 -->
                <div
                    class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
                >
                    <div class="text-justify mx-4">
                        O que você achou da organização do projeto? Tem alguma
                        sugestão de melhoria?
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

                <!-- question 2 -->
                <div
                    class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
                >
                    <div class="text-justify mx-4">
                        O que você achou das mudanças desta edição em relação as
                        anteriores? Tem alguma sugestão de melhoria?
                    </div>
                </div>

                <div class="flex gap-2 w-full">
                    <input
                        type="text"
                        placeholder="Clique aqui para responder"
                        class="input input-bordered w-full"
                        bind:value={answers.question2}
                    />
                </div>

                <div class="divider"></div>

                <!-- question 3 -->
                <div
                    class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
                >
                    <div class="text-justify mx-4">
                        O que você achou do Forum no Discord? Tem alguma
                        sugestão de melhoria?
                    </div>
                </div>

                <div class="flex gap-2 w-full">
                    <input
                        type="text"
                        placeholder="Clique aqui para responder"
                        class="input input-bordered w-full"
                        bind:value={answers.question3}
                    />
                </div>
            {/if}
            {#if step == 1}
                <!-- question 4 -->
                <div
                    class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
                >
                    <div class="text-justify mx-4">
                        O que você achou dos Mappers Experientes agora receberem
                        orientação diretamente da organização e poderem mapear
                        mais de uma música. Tem alguma sugestão de melhoria?
                    </div>
                </div>

                <div class="flex gap-2 w-full">
                    <input
                        type="text"
                        placeholder="Clique aqui para responder"
                        class="input input-bordered w-full"
                        bind:value={answers.question4}
                    />
                </div>

                <div class="divider"></div>

                <!-- question 5 -->
                <div
                    class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
                >
                    <div class="text-justify mx-4">
                        O que você achou da troca do sorteio pela montagem do
                        time. Tem alguma sugestão de melhoria?
                    </div>
                </div>

                <div class="flex gap-2 w-full">
                    <input
                        type="text"
                        placeholder="Clique aqui para responder"
                        class="input input-bordered w-full"
                        bind:value={answers.question5}
                    />
                </div>

                <div class="divider"></div>

                <!-- question 6 -->
                <div
                    class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
                >
                    <div class="text-justify mx-4">
                        O que você achou das Musicas/Animes não estão mais
                        limitadas a seasons. Tem alguma sugestão de melhoria?
                    </div>
                </div>

                <div class="flex gap-2 w-full">
                    <input
                        type="text"
                        placeholder="Clique aqui para responder"
                        class="input input-bordered w-full"
                        bind:value={answers.question6}
                    />
                </div>
            {/if}

            {#if step == 2}
                <!-- question 7 -->
                <div
                    class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
                >
                    <div class="text-justify mx-4">
                        O que você achou que dos mapas tinham uma espectativa da
                        organização quanto ao estilo e dificuldade. Tem alguma
                        sugestão de melhoria?
                    </div>
                </div>

                <div class="flex gap-2 w-full">
                    <input
                        type="text"
                        placeholder="Clique aqui para responder"
                        class="input input-bordered w-full"
                        bind:value={answers.question7}
                    />
                </div>

                <div class="divider"></div>

                <!-- question 8 -->
                <div
                    class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
                >
                    <div class="text-justify mx-4">
                        O que você achou dessa edição os mods da organização
                        ocorreram ao longo do projeto ao invés de só ocorrer no
                        final. Tem alguma sugestão de melhoria?
                    </div>
                </div>

                <div class="flex gap-2 w-full">
                    <input
                        type="text"
                        placeholder="Clique aqui para responder"
                        class="input input-bordered w-full"
                        bind:value={answers.question8}
                    />
                </div>

                <div class="divider"></div>

                <!-- question 9 -->
                <div
                    class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
                >
                    <div class="text-justify mx-4">
                        O que você achou dos mapas estavam em arquivos separados
                        ao invés de estarem com o áudio junto. Tem alguma
                        sugestão de melhoria?
                    </div>
                </div>

                <div class="flex gap-2 w-full">
                    <input
                        type="text"
                        placeholder="Clique aqui para responder"
                        class="input input-bordered w-full"
                        bind:value={answers.question9}
                    />
                </div>
            {/if}

            {#if step == 3}
                <!-- question 10 -->
                <div
                    class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
                >
                    <div class="text-justify mx-4">
                        Qual seu grau de satisfação em relação a:
                    </div>
                </div>

                <div class="flex flex-col gap-2 w-full">
                    <div>
                        <div>Animes/Musicas escolhidos para a maratona.</div>
                        <div
                            class="rating rating-lg rating-half"
                            onchange={(e) =>
                                (answers.question10.animesMusic = parseFloat(
                                    (e?.target as HTMLInputElement)?.value ?? 0,
                                ))}
                        >
                            <input
                                type="radio"
                                name="animesMusic"
                                class="rating-hidden"
                                value="0"
                                checked={true}
                            />
                            <input
                                type="radio"
                                name="animesMusic"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="0.5"
                            />
                            <input
                                type="radio"
                                name="animesMusic"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="1"
                            />
                            <input
                                type="radio"
                                name="animesMusic"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="1.5"
                            />
                            <input
                                type="radio"
                                name="animesMusic"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="2"
                            />
                            <input
                                type="radio"
                                name="animesMusic"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="2.5"
                            />
                            <input
                                type="radio"
                                name="animesMusic"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="3"
                            />
                            <input
                                type="radio"
                                name="animesMusic"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="3.5"
                            />
                            <input
                                type="radio"
                                name="animesMusic"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="4"
                            />
                            <input
                                type="radio"
                                name="animesMusic"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="4.5"
                            />
                            <input
                                type="radio"
                                name="animesMusic"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="5"
                            />
                        </div>
                    </div>

                    <div>
                        <div>
                            Divisão Feita pelos organizadores de participantes e
                            músicas.
                        </div>
                        <div
                            class="rating rating-lg rating-half"
                            onchange={(e) =>
                                (answers.question10.divisionParticipants =
                                    parseFloat(
                                        (e?.target as HTMLInputElement)
                                            ?.value ?? 0,
                                    ))}
                        >
                            <input
                                type="radio"
                                name="divisionParticipants"
                                class="rating-hidden"
                                value="0"
                                checked={true}
                            />
                            <input
                                type="radio"
                                name="divisionParticipants"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="0.5"
                            />
                            <input
                                type="radio"
                                name="divisionParticipants"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="1"
                            />
                            <input
                                type="radio"
                                name="divisionParticipants"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="1.5"
                            />
                            <input
                                type="radio"
                                name="divisionParticipants"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="2"
                            />
                            <input
                                type="radio"
                                name="divisionParticipants"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="2.5"
                            />
                            <input
                                type="radio"
                                name="divisionParticipants"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="3"
                            />
                            <input
                                type="radio"
                                name="divisionParticipants"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="3,5"
                            />
                            <input
                                type="radio"
                                name="divisionParticipants"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="4"
                            />
                            <input
                                type="radio"
                                name="divisionParticipants"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="4.5"
                            />
                            <input
                                type="radio"
                                name="divisionParticipants"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="5"
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            Reunião e comunicação do seu time para organizar o
                            mapa.
                        </div>
                        <div class="rating rating-lg rating-half"
                        onchange={(e) => answers.question10.teamMeeting = parseFloat((e?.target as HTMLInputElement)?.value ?? 0)}>
                            <input
                                type="radio"
                                name="teamMeeting"
                                class="rating-hidden"
                                value="0"
                                checked={true}
                            />
                            <input
                                type="radio"
                                name="teamMeeting"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="0.5"
                            />
                            <input
                                type="radio"
                                name="teamMeeting"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="1"
                            />
                            <input
                                type="radio"
                                name="teamMeeting"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="1.5"
                            />
                            <input
                                type="radio"
                                name="teamMeeting"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="2"
                            />
                            <input
                                type="radio"
                                name="teamMeeting"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="2.5"
                            />
                            <input
                                type="radio"
                                name="teamMeeting"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="3"
                            />
                            <input
                                type="radio"
                                name="teamMeeting"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="3,5"
                            />
                            <input
                                type="radio"
                                name="teamMeeting"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="4"
                            />
                            <input
                                type="radio"
                                name="teamMeeting"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="4.5"
                            />
                            <input
                                type="radio"
                                name="teamMeeting"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="5"
                            />
                        </div>
                    </div>
                    <div>
                        <div>Divisão das Partes em que cada um fez o mapa.</div>
                        <div class="rating rating-lg rating-half"
                        onchange={(e) => answers.question10.divisionParts = parseFloat((e?.target as HTMLInputElement)?.value ?? 0)}>
                            <input
                                type="radio"
                                name="divisionParts"
                                class="rating-hidden"
                                value="0"
                                checked={true}
                            />
                            <input
                                type="radio"
                                name="divisionParts"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="0.5"
                            />
                            <input
                                type="radio"
                                name="divisionParts"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="1"
                            />
                            <input
                                type="radio"
                                name="divisionParts"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="1.5"
                            />
                            <input
                                type="radio"
                                name="divisionParts"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="2"
                            />
                            <input
                                type="radio"
                                name="divisionParts"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="2.5"
                            />
                            <input
                                type="radio"
                                name="divisionParts"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="3"
                            />
                            <input
                                type="radio"
                                name="divisionParts"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="3,5"
                            />
                            <input
                                type="radio"
                                name="divisionParts"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="4"
                            />
                            <input
                                type="radio"
                                name="divisionParts"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="4.5"
                            />
                            <input
                                type="radio"
                                name="divisionParts"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="5"
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            Orientação recebidas pelo mapper experiente e da
                            organização.
                        </div>
                        <div class="rating rating-lg rating-half"
                            onchange={(e) => answers.question10.orientation = parseFloat((e?.target as HTMLInputElement)?.value ?? 0)}
                            >
                            
                            <input
                                type="radio"
                                name="orientation"
                                class="rating-hidden"
                                value="0"
                                checked={true}
                            />
                            <input
                                type="radio"
                                name="orientation"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="0.5"
                            />
                            <input
                                type="radio"
                                name="orientation"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="1"
                            />
                            <input
                                type="radio"
                                name="orientation"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="1.5"
                            />
                            <input
                                type="radio"
                                name="orientation"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="2"
                            />
                            <input
                                type="radio"
                                name="orientation"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="2.5"
                            />
                            <input
                                type="radio"
                                name="orientation"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="3"
                            />
                            <input
                                type="radio"
                                name="orientation"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="3,5"
                            />
                            <input
                                type="radio"
                                name="orientation"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="4"
                            />
                            <input
                                type="radio"
                                name="orientation"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="4.5"
                            />
                            <input
                                type="radio"
                                name="orientation"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="5"
                            />
                        </div>
                    </div>
                    <div>
                        <div>Prazo e tempo para fazer o mapa e hitsounds.</div>
                        <div class="rating rating-lg rating-half"
                            onchange={(e) => answers.question10.deadline = parseFloat((e?.target as HTMLInputElement)?.value ?? 0)}
                            >
                            <input
                                type="radio"
                                name="deadline"
                                class="rating-hidden"
                                value="0"
                                checked={true}
                            />
                            <input
                                type="radio"
                                name="deadline"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="0.5"
                            />
                            <input
                                type="radio"
                                name="deadline"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="1"
                            />
                            <input
                                type="radio"
                                name="deadline"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="1.5"
                            />
                            <input
                                type="radio"
                                name="deadline"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="2"
                            />
                            <input
                                type="radio"
                                name="deadline"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="2.5"
                            />
                            <input
                                type="radio"
                                name="deadline"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="3"
                            />
                            <input
                                type="radio"
                                name="deadline"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="3,5"
                            />
                            <input
                                type="radio"
                                name="deadline"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="4"
                            />
                            <input
                                type="radio"
                                name="deadline"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="4.5"
                            />
                            <input
                                type="radio"
                                name="deadline"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="5"
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            Comunicação da organização para informar sobre os
                            prazos e como fazer o projeto.
                        </div>
                        <div class="rating rating-lg rating-half"
                            onchange={(e) => answers.question10.organizationCommunication = parseFloat((e?.target as HTMLInputElement)?.value ?? 0)}
                        >
                            
                            <input
                                type="radio"
                                name="organizationCommunication"
                                class="rating-hidden"
                                value="0"
                                checked={true}
                            />
                            <input
                                type="radio"
                                name="organizationCommunication"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="0.5"
                            />
                            <input
                                type="radio"
                                name="organizationCommunication"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="1"
                            />
                            <input
                                type="radio"
                                name="organizationCommunication"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="1.5"
                            />
                            <input
                                type="radio"
                                name="organizationCommunication"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="2"
                            />
                            <input
                                type="radio"
                                name="organizationCommunication"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="2.5"
                            />
                            <input
                                type="radio"
                                name="organizationCommunication"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="3"
                            />
                            <input
                                type="radio"
                                name="organizationCommunication"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="3,5"
                            />
                            <input
                                type="radio"
                                name="organizationCommunication"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="4"
                            />
                            <input
                                type="radio"
                                name="organizationCommunication"
                                class="mask mask-star-2 mask-half-1 bg-green-500"
                                value="4.5"
                            />
                            <input
                                type="radio"
                                name="organizationCommunication"
                                class="mask mask-star-2 mask-half-2 bg-green-500"
                                value="5"
                            />
                        </div>
                    </div>
                </div>
            {/if}
            {#if step == 4}
                <!-- question 11 -->
                <div
                    class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
                >
                    <div class="text-justify mx-4">
                        Escreva sobre o que quiser
                    </div>
                </div>

                <div class="flex gap-2 w-full">
                    <input
                        type="text"
                        placeholder="Clique aqui para responder"
                        class="input input-bordered w-full"
                        bind:value={answers.question11}
                    />
                </div>
            {/if}
        </div>
        <div class="divider"></div>
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
