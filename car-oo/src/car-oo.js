"use strict";

console.log('\n### PART ONE - VEHICLE ###')
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

console.log('\n### PART TWO - CAR ###')
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

console.log('\n### PART THREE - MOTORCYCLE ###')
class Motorcycle extends Vehicle {
    constructor( model, make, year ){
        super( model, make, year );
        this.numWheels = 2;
    }
    revEngine(){
        return "VROOM!!!"
    }
}

let {honk, numWheels, revEngine} = new Motorcycle('Honda', 'Nighthawk', 2000);
console.log( honk() );
console.log( revEngine() );
console.log( numWheels );

