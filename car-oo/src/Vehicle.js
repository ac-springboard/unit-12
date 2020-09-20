"use strict";

class Vehicle{
    constructor( make, model, year){
        this.make = make;
        this.model = model;
        this.year = year;
    }
    honk(){
        return 'Beep';
    }
    toString(){
        return `This vehicle is a ${this.make} ${this.model} from ${this.year}`;
    }
}

const vehicle = new Vehicle( "Cururu", "Trash", "55 BC");
console.log( vehicle.honk() );
console.log( vehicle.toString() );
