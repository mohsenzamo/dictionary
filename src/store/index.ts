import { defineStore } from 'pinia';
export const useStore = defineStore('main', {
    state() {
        return {
            modalValueClose: 0,
            modalValueOpen: 1
        }
    }
})