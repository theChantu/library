import { v4 as uuidv4 } from "uuid";

export default class book {
    constructor() {
        this.id = uuidv4();
        this.author = "";
        this.title = "";
        this.pages = "";
    }
}
