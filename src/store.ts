import { writable } from "svelte/store";
import { get_store_value } from 'svelte/internal'

export const score = writable(0);
export const lastScoreChange = writable(0);
export const isGameOver = writable(false);

export const seed = writable("0")

const storedHiScore = localStorage.getItem('hiScore') ?? "0"
export const hiScore = writable(storedHiScore)
hiScore.subscribe(val => localStorage.setItem('hiScore', val))
score.subscribe(val => {
  const oldHiScore = parseInt(get_store_value(hiScore))
  if (oldHiScore == NaN || val > oldHiScore) {
    hiScore.set(val.toString())
  }
})