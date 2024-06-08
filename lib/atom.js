import { atom } from "jotai";
//ffmpegJotais
export const videoAtom = atom(null);
export const titleHiddenAtom = atom(false);
export const videoFileURL = atom([]);
export const ffmpegLoadedAtom = atom(false);
export const frameInterval = atom(1);
export const ytURL = atom("");
export const fileInputType = atom("");