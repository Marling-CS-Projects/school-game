import { Loader } from "@pixi/loaders";

export let coins = 0

let coinsString = coins.toString()

const COINS_LOCAL_STORAGE_KEY = 'coin-count'

export function getCoins(){
    let coinAmount = localStorage.getItem(COINS_LOCAL_STORAGE_KEY)
    if(!coinAmount){
        coinAmount = "0";
    }

    return coinAmount
}

export function setCoins(delta: number){
    let coinsString = coins.toString()
    localStorage.setItem(COINS_LOCAL_STORAGE_KEY, coinsString)
}

