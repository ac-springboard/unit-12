"use strict";

// 01 - Hangouts

class Cat {
    constructor( name ){
        this.name = name;
    }
    dance( style ){
        return `I am ${this.name} and I like to dance ${style}`
    }
}

let cat = new Cat( 'Meow');
console.log( cat.name );
console.log( cat.dance('samba'));

let dance = cat.dance;
// dance('mambo'); // It's my time now: WTF???
//
console.log( 'dance:', dance );

function whatIsThis(){
    console.log( 'this is', this);
}

let o = { fn: whatIsThis }
o.fn(); // didn't work like the handout. The output was: this is { fn: [Function: whatIsThis] }

// whatIsThis(); // Same as
//window.whatIsThis(); // both fail

const result = dance.call( cat, 'bolero'); // This will work
console.log( result );

let dancing = dance.bind( cat );
console.log( dancing( 'rumba'));

function applyTax( taxRate, price ){
    return price * ( 1 + taxRate );
}
const salesWithTax = applyTax.bind( null, 0.0725 ); // 0.0725 will be the FIRST argument of the function 'applyTax'
const total = salesWithTax( 50 ); // 50 will be the SECOND argument - because the first is already bond
console.log( total ); // 53.625

function applyTax1( price, taxRate){ // Inverting the parameters
    return price * ( 1 + taxRate );
}
const salesWithTax1 = applyTax1.bind( null, 0.0725 ); // 0.0725 will be the price (FIRST argument)
const total1 = salesWithTax1( 50 ); // 50 will be the tax rate (SECOND argument)
console.log( total1 ); // 0.0725 + ( 1 + 50) = 3.6975

function applyTax2( taxRate, price, bribePct ){
    return price * ( 1 + taxRate + bribePct );
}
const salesWithTax2 = applyTax2.bind( null, 0.5, 10, 0.5 );
const total2 = salesWithTax2( 0.0725, 50 ); // These two will be discarded (shifted to the right) because the 0.5, 10, 0.5 are prepend to the method signature.
console.log( "total2", total2 ); // 20

let stop = true;
