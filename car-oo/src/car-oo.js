"use strict";

console.log('\n### VEHICLE ###')
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

console.log('\n### CAR ###')
class Car extends Vehicle {
    constructor(make, model, year){
        super( make, model, year);
        this.numWheels = 4;
    }
}

let myFirstCar = new Car( 'Toyota', 'Corolla', 2005 );
console.log( myFirstCar.toString() );
console.log( myFirstCar.honk() );
console.log( myFirstCar.numWheels );
