export class ObjectFactory<T extends { new (...args: any[]): any }> {
    private classToCreate: T;
    public objectArray: Set<T>;

    constructor(classToCreate: T) {
        this.classToCreate = classToCreate;
    }

    add(...args: ConstructorParameters<T>) {
        this.objectArray.add(new this.classToCreate(...args));
    }

    delete(obj: T) {
        this.objectArray.delete(obj);
    }
}
