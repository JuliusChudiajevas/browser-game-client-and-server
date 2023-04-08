export class KeyboardManager {
    private keysDown: Map<string, boolean>;

    constructor(keys: Array<string>) {
        if (keys) {
            this.keysDown = new Map<string, boolean>();
            keys.forEach((key) => this.keysDown.set(key, false));
            // console.log(keys);//DBG
        }

        document.addEventListener("keydown", (event) => {
            // console.log(event.key, "down"); //DBG

            if (this.keysDown.has(event.key) === false) {
                // console.log(event.key, "key is invalid"); //DBG
                return;
            }
            if (this.keysDown.get(event.key) === true) {
                // console.log(event.key, "key already set to true"); //DBG
                return;
            }
            this.keysDown.set(event.key, true);
        });

        document.addEventListener("keyup", (event) => {
            // console.log(event.key, "up"); //DBG

            if (this.keysDown.has(event.key) === false) {
                // console.log(event.key, "key is invalid"); //DBG
                return;
            }
            if (this.keysDown.get(event.key) === false) {
                // console.log(event.key, "key already set to false"); //DBG
                return;
            }
            this.keysDown.set(event.key, false);
        });
    }

    getKey(key: string) {
        if (this.keysDown.has(key) === false) {
            console.log(key, "get key is invalid"); //DBG
            return;
        }
        return this.keysDown.get(key);
    }
}
