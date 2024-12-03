import { atom } from "jotai";
import { cartType } from "../types/cartType";
export const cart = atom<cartType>([]);
