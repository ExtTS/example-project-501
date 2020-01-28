import { ClassB } from "libs/subs/ClassB";

export class ClassA {
    name:string;
    static Test () {
        ClassB.Test();
    }
    static CONSTANT = 5;
    constructor () {
        this.name = "";
    }
    handler () {
        
    }
}