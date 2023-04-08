import { DomGenerator } from "./domGenerator";
import { ObjectFactory } from "./objectFactory";

export class GenericObjectDomController<
    T extends { new (...args: any[]): any }
> {
    private dom: DomGenerator;
    private obj: ObjectFactory<T>;

    constructor(domGenerator: DomGenerator, objectFactory: ObjectFactory<T>) {
        this.dom = domGenerator;
        this.obj = objectFactory;
    }

    add(...args: ConstructorParameters<T>) {
        type a = Pick<
            ConstructorParameters<T>,
            keyof ConstructorParameters<T>[0]
        >;
    }
}
