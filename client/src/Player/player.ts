import { Entity } from "../Entity/entity.js";
import { KeyboardManager } from "../Utils/keyboardManager.js";
export class Player extends Entity {
    key: KeyboardManager;
    speed: number = 0.05;
    constructor(id: string, x: number, y: number, color: string = "red") {
        super(id, "player", x, y, 10, 10);
        this.entity.style.setProperty("--color", color);
        this.key = new KeyboardManager([
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight",
        ]);
    }

    collide(entities: Array<Entity>) {
        entities.forEach((e) => {
            switch (e.type) {
                case "wall": {
                    break;
                }
                default: {
                    console.log(
                        "UNHANDELED COLLISION:",
                        this.entity.id,
                        e.entity.id
                    );
                }
            }
        });
    }

    update(delta: number) {
        if (this.key.getKey("ArrowLeft")) {
            this.x -= this.speed * delta;
        }
        if (this.key.getKey("ArrowRight")) {
            this.x += this.speed * delta;
        }
        if (this.key.getKey("ArrowUp")) {
            this.y += this.speed * delta;
        }
        if (this.key.getKey("ArrowDown")) {
            this.y -= this.speed * delta;
        }
    }
}
