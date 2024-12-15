<script lang="ts">
    import Authcheck from "$lib/authcheck.svelte";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    const animeMix: number = 2024;

    let answers: questions = $state({
        question: {
            anime01: 0,
            anime02: 0,
            anime03: 0,
            anime04: 0,
            anime05: 0,
            anime06: 0,
            anime07: 0,
            anime08: 0,
            anime09: 0,
            anime10: 0,
            anime11: 0,
            anime12: 0,
            anime13: 0,
            anime14: 0,
            anime15: 0,
            anime16: 0,
            anime17: 0,
            anime18: 0,
        },
    });

    interface questions {
        question: {
            anime01: number;
            anime02: number;
            anime03: number;
            anime04: number;
            anime05: number;
            anime06: number;
            anime07: number;
            anime08: number;
            anime09: number;
            anime10: number;
            anime11: number;
            anime12: number;
            anime13: number;
            anime14: number;
            anime15: number;
            anime16: number;
            anime17: number;
            anime18: number;
        };
    }

    async function submit() {
        let response = await fetch("/api/form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "score",
                formData: JSON.stringify(answers),
            }),
        });
        if (response.ok) {
            window.location.href = "/";
        } else {
            alert("submit error");
        }
    }

    /*
                Sousou no Frieren
                Sword Art Online Alternative: Gun Gale Online II
                Lv2 kara Cheat datta Motoyuusha Kouho no Mattari Isekai Life
                Make Heroine ga Oosugiru!
                Shangri-La Frontier: Kusoge Hunter, Kamige ni Idoman to su
                Kono Subarashii Sekai ni Shukufuku wo! 3
                Mashle: Shinkakusha Kouho Senbatsu Shiken-hen
                Monogatari Series: Off & Monster Season
                Nige Jouzu no Wakagimi
                Re:Zero kara Hajimeru Isekai Seikatsu 3rd Season
                Dandadan
                Boku no Kokoro no Yabai Yatsu 2nd Season
                Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e 3rd Season
                Ranma ½ (2024)
                Dosanko Gal wa Namara Menkoi
                Mahou Shoujo ni Akogarete
                "Oshi no Ko" 2nd Season
                Ookami to Koushinryou: Merchant Meets the Wise Wolf
*/
</script>

<Authcheck>
    <!-- <div>
    <div>{answers.question.anime01}</div>
    <div>{answers.question.anime02}</div>
    <div>{answers.question.anime03}</div>
    <div>{answers.question.anime04}</div>
    <div>{answers.question.anime05}</div>
    <div>{answers.question.anime06}</div>
    <div>{answers.question.anime07}</div>
    <div>{answers.question.anime08}</div>
    <div>{answers.question.anime09}</div>
    <div>{answers.question.anime10}</div>
    <div>{answers.question.anime11}</div>
    <div>{answers.question.anime12}</div>
    <div>{answers.question.anime13}</div>
    <div>{answers.question.anime14}</div>
    <div>{answers.question.anime15}</div>
    <div>{answers.question.anime16}</div>
    <div>{answers.question.anime17}</div>
    <div>{answers.question.anime18}</div>
</div> -->

    <div class="flex flex-col flex-1 items-center p-2 gap-2">
        <header class="flex flex-row h-10 text-3xl font-bold gap-2 p-2">
            <div>Anime {animeMix} Mix</div>
        </header>

        <div class="divider"></div>

        <header class="flex flex-row text-3xl font-italic gap-2 p-2">
            <div>Dê uma nota para os mapas =)</div>
        </header>

        <div class="divider"></div>

        <div class="grow flex flex-col gap-4 items-center text-lg w-[64rem]">
            <div
                class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
            >
                <div class="text-justify mx-4">Sousou no Frieren</div>
            </div>

            <div
                class="rating rating-lg rating-half"
                onchange={(e) =>
                    (answers.question.anime01 = parseFloat(
                        (e?.target as HTMLInputElement)?.value ?? 0,
                    ))}
            >
                <input
                    type="radio"
                    name="anime01"
                    class="rating-hidden"
                    value="0"
                    checked={true}
                />
                <input
                    type="radio"
                    name="anime01"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="0.5"
                />
                <input
                    type="radio"
                    name="anime01"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="1"
                />
                <input
                    type="radio"
                    name="anime01"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="1.5"
                />
                <input
                    type="radio"
                    name="anime01"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="2"
                />
                <input
                    type="radio"
                    name="anime01"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="2.5"
                />
                <input
                    type="radio"
                    name="anime01"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="3"
                />
                <input
                    type="radio"
                    name="anime01"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="3,5"
                />
                <input
                    type="radio"
                    name="anime01"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="4"
                />
                <input
                    type="radio"
                    name="anime01"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="4.5"
                />
                <input
                    type="radio"
                    name="anime01"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="5"
                />
            </div>

            <div
                class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
            >
                <div class="text-justify mx-4">
                    Sword Art Online Alternative: Gun Gale Online II
                </div>
            </div>

            <div
                class="rating rating-lg rating-half"
                onchange={(e) =>
                    (answers.question.anime02 = parseFloat(
                        (e?.target as HTMLInputElement)?.value ?? 0,
                    ))}
            >
                <input
                    type="radio"
                    name="anime02"
                    class="rating-hidden"
                    value="0"
                    checked={true}
                />
                <input
                    type="radio"
                    name="anime02"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="0.5"
                />
                <input
                    type="radio"
                    name="anime02"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="1"
                />
                <input
                    type="radio"
                    name="anime02"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="1.5"
                />
                <input
                    type="radio"
                    name="anime02"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="2"
                />
                <input
                    type="radio"
                    name="anime02"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="2.5"
                />
                <input
                    type="radio"
                    name="anime02"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="3"
                />
                <input
                    type="radio"
                    name="anime02"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="3,5"
                />
                <input
                    type="radio"
                    name="anime02"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="4"
                />
                <input
                    type="radio"
                    name="anime02"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="4.5"
                />
                <input
                    type="radio"
                    name="anime02"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="5"
                />
            </div>
            <div
                class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
            >
                <div class="text-justify mx-4">
                    Lv2 kara Cheat datta Motoyuusha Kouho no Mattari Isekai Life
                </div>
            </div>

            <div
                class="rating rating-lg rating-half"
                onchange={(e) =>
                    (answers.question.anime03 = parseFloat(
                        (e?.target as HTMLInputElement)?.value ?? 0,
                    ))}
            >
                <input
                    type="radio"
                    name="anime03"
                    class="rating-hidden"
                    value="0"
                    checked={true}
                />
                <input
                    type="radio"
                    name="anime03"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="0.5"
                />
                <input
                    type="radio"
                    name="anime03"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="1"
                />
                <input
                    type="radio"
                    name="anime03"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="1.5"
                />
                <input
                    type="radio"
                    name="anime03"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="2"
                />
                <input
                    type="radio"
                    name="anime03"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="2.5"
                />
                <input
                    type="radio"
                    name="anime03"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="3"
                />
                <input
                    type="radio"
                    name="anime03"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="3,5"
                />
                <input
                    type="radio"
                    name="anime03"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="4"
                />
                <input
                    type="radio"
                    name="anime03"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="4.5"
                />
                <input
                    type="radio"
                    name="anime03"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="5"
                />
            </div>
            <div
                class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
            >
                <div class="text-justify mx-4">Make Heroine ga Oosugiru!</div>
            </div>

            <div
                class="rating rating-lg rating-half"
                onchange={(e) =>
                    (answers.question.anime04 = parseFloat(
                        (e?.target as HTMLInputElement)?.value ?? 0,
                    ))}
            >
                <input
                    type="radio"
                    name="anime04"
                    class="rating-hidden"
                    value="0"
                    checked={true}
                />
                <input
                    type="radio"
                    name="anime04"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="0.5"
                />
                <input
                    type="radio"
                    name="anime04"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="1"
                />
                <input
                    type="radio"
                    name="anime04"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="1.5"
                />
                <input
                    type="radio"
                    name="anime04"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="2"
                />
                <input
                    type="radio"
                    name="anime04"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="2.5"
                />
                <input
                    type="radio"
                    name="anime04"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="3"
                />
                <input
                    type="radio"
                    name="anime04"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="3,5"
                />
                <input
                    type="radio"
                    name="anime04"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="4"
                />
                <input
                    type="radio"
                    name="anime04"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="4.5"
                />
                <input
                    type="radio"
                    name="anime04"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="5"
                />
            </div>
            <div
                class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
            >
                <div class="text-justify mx-4">
                    Shangri-La Frontier: Kusoge Hunter, Kamige ni Idoman to su
                </div>
            </div>

            <div
                class="rating rating-lg rating-half"
                onchange={(e) =>
                    (answers.question.anime05 = parseFloat(
                        (e?.target as HTMLInputElement)?.value ?? 0,
                    ))}
            >
                <input
                    type="radio"
                    name="anime05"
                    class="rating-hidden"
                    value="0"
                    checked={true}
                />
                <input
                    type="radio"
                    name="anime05"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="0.5"
                />
                <input
                    type="radio"
                    name="anime05"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="1"
                />
                <input
                    type="radio"
                    name="anime05"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="1.5"
                />
                <input
                    type="radio"
                    name="anime05"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="2"
                />
                <input
                    type="radio"
                    name="anime05"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="2.5"
                />
                <input
                    type="radio"
                    name="anime05"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="3"
                />
                <input
                    type="radio"
                    name="anime05"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="3,5"
                />
                <input
                    type="radio"
                    name="anime05"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="4"
                />
                <input
                    type="radio"
                    name="anime05"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="4.5"
                />
                <input
                    type="radio"
                    name="anime05"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="5"
                />
            </div>

            <div
                class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
            >
                <div class="text-justify mx-4">
                    Kono Subarashii Sekai ni Shukufuku wo! 3
                </div>
            </div>

            <div
                class="rating rating-lg rating-half"
                onchange={(e) =>
                    (answers.question.anime06 = parseFloat(
                        (e?.target as HTMLInputElement)?.value ?? 0,
                    ))}
            >
                <input
                    type="radio"
                    name="anime06"
                    class="rating-hidden"
                    value="0"
                    checked={true}
                />
                <input
                    type="radio"
                    name="anime06"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="0.5"
                />
                <input
                    type="radio"
                    name="anime06"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="1"
                />
                <input
                    type="radio"
                    name="anime06"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="1.5"
                />
                <input
                    type="radio"
                    name="anime06"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="2"
                />
                <input
                    type="radio"
                    name="anime06"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="2.5"
                />
                <input
                    type="radio"
                    name="anime06"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="3"
                />
                <input
                    type="radio"
                    name="anime06"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="3,5"
                />
                <input
                    type="radio"
                    name="anime06"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="4"
                />
                <input
                    type="radio"
                    name="anime06"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="4.5"
                />
                <input
                    type="radio"
                    name="anime06"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="5"
                />
            </div>

            <div
                class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
            >
                <div class="text-justify mx-4">
                    Mashle: Shinkakusha Kouho Senbatsu Shiken-hen
                </div>
            </div>

            <div
                class="rating rating-lg rating-half"
                onchange={(e) =>
                    (answers.question.anime07 = parseFloat(
                        (e?.target as HTMLInputElement)?.value ?? 0,
                    ))}
            >
                <input
                    type="radio"
                    name="anime07"
                    class="rating-hidden"
                    value="0"
                    checked={true}
                />
                <input
                    type="radio"
                    name="anime07"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="0.5"
                />
                <input
                    type="radio"
                    name="anime07"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="1"
                />
                <input
                    type="radio"
                    name="anime07"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="1.5"
                />
                <input
                    type="radio"
                    name="anime07"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="2"
                />
                <input
                    type="radio"
                    name="anime07"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="2.5"
                />
                <input
                    type="radio"
                    name="anime07"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="3"
                />
                <input
                    type="radio"
                    name="anime07"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="3,5"
                />
                <input
                    type="radio"
                    name="anime07"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="4"
                />
                <input
                    type="radio"
                    name="anime07"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="4.5"
                />
                <input
                    type="radio"
                    name="anime07"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="5"
                />
            </div>

            <div
                class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
            >
                <div class="text-justify mx-4">
                    Monogatari Series: Off & Monster Season
                </div>
            </div>

            <div
                class="rating rating-lg rating-half"
                onchange={(e) =>
                    (answers.question.anime08 = parseFloat(
                        (e?.target as HTMLInputElement)?.value ?? 0,
                    ))}
            >
                <input
                    type="radio"
                    name="anime08"
                    class="rating-hidden"
                    value="0"
                    checked={true}
                />
                <input
                    type="radio"
                    name="anime08"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="0.5"
                />
                <input
                    type="radio"
                    name="anime08"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="1"
                />
                <input
                    type="radio"
                    name="anime08"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="1.5"
                />
                <input
                    type="radio"
                    name="anime08"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="2"
                />
                <input
                    type="radio"
                    name="anime08"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="2.5"
                />
                <input
                    type="radio"
                    name="anime08"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="3"
                />
                <input
                    type="radio"
                    name="anime08"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="3,5"
                />
                <input
                    type="radio"
                    name="anime08"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="4"
                />
                <input
                    type="radio"
                    name="anime08"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="4.5"
                />
                <input
                    type="radio"
                    name="anime08"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="5"
                />
            </div>

            <div
                class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
            >
                <div class="text-justify mx-4">Nige Jouzu no Wakagimi</div>
            </div>

            <div
                class="rating rating-lg rating-half"
                onchange={(e) =>
                    (answers.question.anime09 = parseFloat(
                        (e?.target as HTMLInputElement)?.value ?? 0,
                    ))}
            >
                <input
                    type="radio"
                    name="anime09"
                    class="rating-hidden"
                    value="0"
                    checked={true}
                />
                <input
                    type="radio"
                    name="anime09"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="0.5"
                />
                <input
                    type="radio"
                    name="anime09"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="1"
                />
                <input
                    type="radio"
                    name="anime09"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="1.5"
                />
                <input
                    type="radio"
                    name="anime09"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="2"
                />
                <input
                    type="radio"
                    name="anime09"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="2.5"
                />
                <input
                    type="radio"
                    name="anime09"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="3"
                />
                <input
                    type="radio"
                    name="anime09"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="3,5"
                />
                <input
                    type="radio"
                    name="anime09"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="4"
                />
                <input
                    type="radio"
                    name="anime09"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="4.5"
                />
                <input
                    type="radio"
                    name="anime09"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="5"
                />
            </div>

            <div
                class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
            >
                <div class="text-justify mx-4">
                    Re:Zero kara Hajimeru Isekai Seikatsu 3rd Season
                </div>
            </div>

            <div
                class="rating rating-lg rating-half"
                onchange={(e) =>
                    (answers.question.anime10 = parseFloat(
                        (e?.target as HTMLInputElement)?.value ?? 0,
                    ))}
            >
                <input
                    type="radio"
                    name="anime10"
                    class="rating-hidden"
                    value="0"
                    checked={true}
                />
                <input
                    type="radio"
                    name="anime10"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="0.5"
                />
                <input
                    type="radio"
                    name="anime10"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="1"
                />
                <input
                    type="radio"
                    name="anime10"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="1.5"
                />
                <input
                    type="radio"
                    name="anime10"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="2"
                />
                <input
                    type="radio"
                    name="anime10"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="2.5"
                />
                <input
                    type="radio"
                    name="anime10"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="3"
                />
                <input
                    type="radio"
                    name="anime10"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="3,5"
                />
                <input
                    type="radio"
                    name="anime10"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="4"
                />
                <input
                    type="radio"
                    name="anime10"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="4.5"
                />
                <input
                    type="radio"
                    name="anime10"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="5"
                />
            </div>

            <div
                class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
            >
                <div class="text-justify mx-4">Dandadan</div>
            </div>

            <div
                class="rating rating-lg rating-half"
                onchange={(e) =>
                    (answers.question.anime11 = parseFloat(
                        (e?.target as HTMLInputElement)?.value ?? 0,
                    ))}
            >
                <input
                    type="radio"
                    name="anime11"
                    class="rating-hidden"
                    value="0"
                    checked={true}
                />
                <input
                    type="radio"
                    name="anime11"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="0.5"
                />
                <input
                    type="radio"
                    name="anime11"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="1"
                />
                <input
                    type="radio"
                    name="anime11"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="1.5"
                />
                <input
                    type="radio"
                    name="anime11"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="2"
                />
                <input
                    type="radio"
                    name="anime11"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="2.5"
                />
                <input
                    type="radio"
                    name="anime11"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="3"
                />
                <input
                    type="radio"
                    name="anime11"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="3,5"
                />
                <input
                    type="radio"
                    name="anime11"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="4"
                />
                <input
                    type="radio"
                    name="anime11"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="4.5"
                />
                <input
                    type="radio"
                    name="anime11"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="5"
                />
            </div>

            <div
                class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
            >
                <div class="text-justify mx-4">
                    Boku no Kokoro no Yabai Yatsu 2nd Season
                </div>
            </div>

            <div
                class="rating rating-lg rating-half"
                onchange={(e) =>
                    (answers.question.anime12 = parseFloat(
                        (e?.target as HTMLInputElement)?.value ?? 0,
                    ))}
            >
                <input
                    type="radio"
                    name="anime12"
                    class="rating-hidden"
                    value="0"
                    checked={true}
                />
                <input
                    type="radio"
                    name="anime12"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="0.5"
                />
                <input
                    type="radio"
                    name="anime12"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="1"
                />
                <input
                    type="radio"
                    name="anime12"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="1.5"
                />
                <input
                    type="radio"
                    name="anime12"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="2"
                />
                <input
                    type="radio"
                    name="anime12"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="2.5"
                />
                <input
                    type="radio"
                    name="anime12"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="3"
                />
                <input
                    type="radio"
                    name="anime12"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="3,5"
                />
                <input
                    type="radio"
                    name="anime12"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="4"
                />
                <input
                    type="radio"
                    name="anime12"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="4.5"
                />
                <input
                    type="radio"
                    name="anime12"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="5"
                />
            </div>

            <div
                class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
            >
                <div class="text-justify mx-4">
                    Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e 3rd Season
                </div>
            </div>

            <div
                class="rating rating-lg rating-half"
                onchange={(e) =>
                    (answers.question.anime13 = parseFloat(
                        (e?.target as HTMLInputElement)?.value ?? 0,
                    ))}
            >
                <input
                    type="radio"
                    name="anime13"
                    class="rating-hidden"
                    value="0"
                    checked={true}
                />
                <input
                    type="radio"
                    name="anime13"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="0.5"
                />
                <input
                    type="radio"
                    name="anime13"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="1"
                />
                <input
                    type="radio"
                    name="anime13"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="1.5"
                />
                <input
                    type="radio"
                    name="anime13"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="2"
                />
                <input
                    type="radio"
                    name="anime13"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="2.5"
                />
                <input
                    type="radio"
                    name="anime13"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="3"
                />
                <input
                    type="radio"
                    name="anime13"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="3,5"
                />
                <input
                    type="radio"
                    name="anime13"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="4"
                />
                <input
                    type="radio"
                    name="anime13"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="4.5"
                />
                <input
                    type="radio"
                    name="anime13"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="5"
                />
            </div>

            <div
                class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
            >
                <div class="text-justify mx-4">Ranma ½ (2024)</div>
            </div>

            <div
                class="rating rating-lg rating-half"
                onchange={(e) =>
                    (answers.question.anime14 = parseFloat(
                        (e?.target as HTMLInputElement)?.value ?? 0,
                    ))}
            >
                <input
                    type="radio"
                    name="anime14"
                    class="rating-hidden"
                    value="0"
                    checked={true}
                />
                <input
                    type="radio"
                    name="anime14"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="0.5"
                />
                <input
                    type="radio"
                    name="anime14"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="1"
                />
                <input
                    type="radio"
                    name="anime14"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="1.5"
                />
                <input
                    type="radio"
                    name="anime14"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="2"
                />
                <input
                    type="radio"
                    name="anime14"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="2.5"
                />
                <input
                    type="radio"
                    name="anime14"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="3"
                />
                <input
                    type="radio"
                    name="anime14"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="3,5"
                />
                <input
                    type="radio"
                    name="anime14"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="4"
                />
                <input
                    type="radio"
                    name="anime14"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="4.5"
                />
                <input
                    type="radio"
                    name="anime14"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="5"
                />
            </div>

            <div
                class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
            >
                <div class="text-justify mx-4">
                    Dosanko Gal wa Namara Menkoi
                </div>
            </div>

            <div
                class="rating rating-lg rating-half"
                onchange={(e) =>
                    (answers.question.anime15 = parseFloat(
                        (e?.target as HTMLInputElement)?.value ?? 0,
                    ))}
            >
                <input
                    type="radio"
                    name="anime15"
                    class="rating-hidden"
                    value="0"
                    checked={true}
                />
                <input
                    type="radio"
                    name="anime15"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="0.5"
                />
                <input
                    type="radio"
                    name="anime15"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="1"
                />
                <input
                    type="radio"
                    name="anime15"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="1.5"
                />
                <input
                    type="radio"
                    name="anime15"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="2"
                />
                <input
                    type="radio"
                    name="anime15"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="2.5"
                />
                <input
                    type="radio"
                    name="anime15"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="3"
                />
                <input
                    type="radio"
                    name="anime15"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="3,5"
                />
                <input
                    type="radio"
                    name="anime15"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="4"
                />
                <input
                    type="radio"
                    name="anime15"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="4.5"
                />
                <input
                    type="radio"
                    name="anime15"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="5"
                />
            </div>

            <div
                class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
            >
                <div class="text-justify mx-4">Mahou Shoujo ni Akogarete</div>
            </div>

            <div
                class="rating rating-lg rating-half"
                onchange={(e) =>
                    (answers.question.anime16 = parseFloat(
                        (e?.target as HTMLInputElement)?.value ?? 0,
                    ))}
            >
                <input
                    type="radio"
                    name="anime16"
                    class="rating-hidden"
                    value="0"
                    checked={true}
                />
                <input
                    type="radio"
                    name="anime16"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="0.5"
                />
                <input
                    type="radio"
                    name="anime16"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="1"
                />
                <input
                    type="radio"
                    name="anime16"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="1.5"
                />
                <input
                    type="radio"
                    name="anime16"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="2"
                />
                <input
                    type="radio"
                    name="anime16"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="2.5"
                />
                <input
                    type="radio"
                    name="anime16"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="3"
                />
                <input
                    type="radio"
                    name="anime16"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="3,5"
                />
                <input
                    type="radio"
                    name="anime16"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="4"
                />
                <input
                    type="radio"
                    name="anime16"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="4.5"
                />
                <input
                    type="radio"
                    name="anime16"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="5"
                />
            </div>

            <div
                class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
            >
                <div class="text-justify mx-4">"Oshi no Ko" 2nd Season</div>
            </div>

            <div
                class="rating rating-lg rating-half"
                onchange={(e) =>
                    (answers.question.anime17 = parseFloat(
                        (e?.target as HTMLInputElement)?.value ?? 0,
                    ))}
            >
                <input
                    type="radio"
                    name="anime17"
                    class="rating-hidden"
                    value="0"
                    checked={true}
                />
                <input
                    type="radio"
                    name="anime17"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="0.5"
                />
                <input
                    type="radio"
                    name="anime17"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="1"
                />
                <input
                    type="radio"
                    name="anime17"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="1.5"
                />
                <input
                    type="radio"
                    name="anime17"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="2"
                />
                <input
                    type="radio"
                    name="anime17"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="2.5"
                />
                <input
                    type="radio"
                    name="anime17"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="3"
                />
                <input
                    type="radio"
                    name="anime17"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="3,5"
                />
                <input
                    type="radio"
                    name="anime17"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="4"
                />
                <input
                    type="radio"
                    name="anime17"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="4.5"
                />
                <input
                    type="radio"
                    name="anime17"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="5"
                />
            </div>

            <div
                class="card bg-base-200 rounded-box h-full w-full place-items-center p-2"
            >
                <div class="text-justify mx-4">
                    Ookami to Koushinryou: Merchant Meets the Wise Wolf
                </div>
            </div>

            <div
                class="rating rating-lg rating-half"
                onchange={(e) =>
                    (answers.question.anime18 = parseFloat(
                        (e?.target as HTMLInputElement)?.value ?? 0,
                    ))}
            >
                <input
                    type="radio"
                    name="anime18"
                    class="rating-hidden"
                    value="0"
                    checked={true}
                />
                <input
                    type="radio"
                    name="anime18"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="0.5"
                />
                <input
                    type="radio"
                    name="anime18"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="1"
                />
                <input
                    type="radio"
                    name="anime18"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="1.5"
                />
                <input
                    type="radio"
                    name="anime18"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="2"
                />
                <input
                    type="radio"
                    name="anime18"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="2.5"
                />
                <input
                    type="radio"
                    name="anime18"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="3"
                />
                <input
                    type="radio"
                    name="anime18"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="3,5"
                />
                <input
                    type="radio"
                    name="anime18"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="4"
                />
                <input
                    type="radio"
                    name="anime18"
                    class="mask mask-star-2 mask-half-1 bg-green-500"
                    value="4.5"
                />
                <input
                    type="radio"
                    name="anime18"
                    class="mask mask-star-2 mask-half-2 bg-green-500"
                    value="5"
                />
            </div>
        </div>

        <div class="divider"></div>

        <div>
            <footer
                class="flex flex-row h-20 w-full gap-2 items-center justify-center"
            >
                <button
                    class="btn btn-primary btn-success btn-wide"
                    onclick={() => submit()}
                >
                    Submit
                </button>
            </footer>
        </div>
    </div></Authcheck
>
