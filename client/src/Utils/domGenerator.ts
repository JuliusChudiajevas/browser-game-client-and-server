export class DomGenerator {
    private max: number;
    private randArray: Array<number>;
    private classString: string;
    private idString: string;

    // constructor(classString: string, idString: string) {
    //     // console.log("ok");
    //     this.max = 0;
    //     this.classString = classString;
    //     this.idString = idString;
    //     this.randArray = [0];
    // }
    constructor() {}

    // isFull(): boolean {
    //     if (this.randArray.length === 0) {
    //         return true;
    //     }
    //     return false;
    // }

    addDiv(classString: string, idString: string) {
        const tempDiv: HTMLDivElement = document.createElement("div");
        classString.split(" ").forEach((s) => {
            // console.log(s);
            tempDiv.classList.add(s);
        });
        tempDiv.id = idString;
        document.body.append(tempDiv);
        console.log("id created:", idString);
    }

    // addDivWithId(id: string) {
    //     const tempDiv: HTMLDivElement = document.createElement("div");
    //     this.classString.split(" ").forEach((s) => {
    //         // console.log(s);
    //         tempDiv.classList.add(s);
    //     });
    //     tempDiv.id = id;
    //     document.body.append(tempDiv);
    //     console.log("id created:", id);
    //     return id;
    // }

    // addDivAndGetId() {
    //     // console.log("asdfasdfsadfsadf");
    //     if (this.isFull()) {
    //         console.log("increasing max in dom generator:", this.classString);
    //         this.max++;
    //         this.randArray.push(this.max);
    //         console.log("rand array increased to:", this.randArray.length);
    //         return;
    //     }

    //     const tempDiv: HTMLDivElement = document.createElement("div");
    //     this.classString.split(" ").forEach((s) => {
    //         // console.log(s);
    //         tempDiv.classList.add(s);
    //     });
    //     const tempId: string = this.idString + this.randArray.pop().toString();
    //     tempDiv.id = tempId;
    //     document.body.append(tempDiv);
    //     console.log("id created:", tempId);
    //     return tempId;
    // }

    removeById(id: string) {
        const element = document.getElementById(id);
        element.remove();
    }
}
