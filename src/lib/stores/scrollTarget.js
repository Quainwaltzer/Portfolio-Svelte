import { writable } from "svelte/store";

export const scrollTarget = writable({
  home: null,
  about: null,
  projects: null,
  contact: null
});

export const headerObj = writable(null);