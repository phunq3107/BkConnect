import {randomImages} from "../constants/image";

export const randomImage = (seed = "") => {
    let sum = 0
    for (let i = 0; i < seed.length; i++) sum += seed.charCodeAt(i)
    return randomImages[sum % randomImages.length]
}