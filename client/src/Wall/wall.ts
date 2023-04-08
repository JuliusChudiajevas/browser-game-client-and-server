import { Entity } from "../Entity/entity.js";

export class Wall extends Entity {
    constructor(id: string, x, y, width, height) {
        super(id, "wall", x, y, width, height);
    }
}
