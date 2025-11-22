import { customAlphabet } from "nanoid";

const nano=customAlphabet(
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',8
);

export function generateShortId(){
    const randomLength = Math.floor(Math.random() * 3) + 6;
    return nano().slice(0, randomLength);
}