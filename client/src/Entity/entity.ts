import { DomGenerator } from "../Utils/domGenerator.js";

export class Entity {
    readonly entity: HTMLElement = null;
    public type: string = null;
    private dom = new DomGenerator();
    constructor(
        id: string,
        type: string,
        x: number,
        y: number,
        width: number,
        height: number
    ) {
        this.dom.addDiv("entity " + type, id);
        this.entity = document.getElementById(id);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
    }
    desctruct() {
        this.dom.removeById(this.entity.id);
    }

    get x() {
        return parseFloat(
            getComputedStyle(this.entity).getPropertyValue("--x")
        );
    }

    set x(value) {
        this.entity.style.setProperty("--x", value.toString());
    }

    get y() {
        return parseFloat(
            getComputedStyle(this.entity).getPropertyValue("--y")
        );
    }

    set y(value) {
        this.entity.style.setProperty("--y", value.toString());
    }

    get width() {
        return parseFloat(
            getComputedStyle(this.entity).getPropertyValue("--width")
        );
    }

    set width(value) {
        this.entity.style.setProperty("--width", value.toString());
    }

    get height() {
        return parseFloat(
            getComputedStyle(this.entity).getPropertyValue("--height")
        );
    }

    set height(value) {
        this.entity.style.setProperty("--height", value.toString());
    }

    get right() {
        return this.x + this.width;
    }

    get bottom() {
        return this.y + this.height;
    }

    getData() {
        let data = {
            id: this.entity.id,
            type: this.type,
            x: this.x,
            y: this.y,
        };
        return data;
    }
}
