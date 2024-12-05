import { writable, type Writable } from "svelte/store";
import type { User } from "$lib/osuInterfaces";

// import {
//     derived,
//     fromStore,
//     get,
//     readable,
//     readonly,
//     toStore,
//     writable,
// } from "svelte/store";

export const user: Writable<User | null> = writable<User | null>(null);