"use strict";

// 01 - Handout

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
// dance('mambo'); // It's my time now: WTF??? OK! (See below)
//
console.log( 'dance:', dance );
// console.log( 'dance/call/global:', dance.call(window, 'cha cha cha') );
console.log( 'dance/call/cat:', dance.call( cat, 'ballet' ));

function whatIsThis( msg ){
    console.log( msg, 'this is', this);
}

let o = { fn: whatIsThis }
console.log( '---- o.fn(); ----' );
o.fn(); // didn't work like the handout. The output was: this is { fn: [Function: whatIsThis] }

// whatIsThis(); // Same as
//window.whatIsThis(); // both fail

whatIsThis.call(o, 'What Is This:');

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

// 05 - Call

class A {
    constructor( a, b ) {
        this.va = a;
        this.vb = b;
    }
    a1(){
        console.log( "===>>> THIS:", this );
        console.log( `from a1: ${this.va}, ${this.vb}` );
    }
    a2(){
        console.log( "===>>> THIS:", this );
        console.log( `from a2: ${this.va}, ${this.vb}` );
    }
    a3( m, n ){
        console.log( "===>>> THIS:", this );
        console.log( `from a3: ${m}, ${n}` );
    }
}

console.log( '----- tst 01 -----');
let a = new A( 1, 2 );
console.log( '-- I --');
a.a1();
a.a2();
console.log( '-- II --');
let a1 = a.a1;
let a2 = a.a2;
console.log( '-- III --');
a1.call( a );
a2.call( a );

console.log( '----- tst 02 -----');

const b = { a: -1, b: -2 }

console.log( '-- I --');
a1.call( b );

console.log( '-- II --');
const c = { m: -10, n: -20 }
let a3 = a.a3;
a3.call( c, -100, -200 ); // <<-- This is the weird part. The method a3 (from A) was kind of 'injected' into the object 'c'!!!!


let stop = true;


// 04 - Strict Mode
/*
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

First, the value passed as [this] to a function in strict mode is not forced into being an object (a.k.a. "boxed").
 For a normal function, [this] is always an object: either the provided object if called with an object-valued this;
  the value, boxed, if called with a Boolean, string, or number this; or the global object if called with
   an undefined or null this. (Use call, apply, or bind to specify a particular this.) Not only is automatic boxing a
   performance cost, but exposing the global object in browsers is a security hazard because the global object provides
    access to functionality that "secure" JavaScript environments must restrict. Thus for a strict mode function,
     the specified this is not boxed into an object, and if unspecified, this will be undefined:

'use strict';
function fun() { return this; }
console.assert(fun() === undefined);
console.assert(fun.call(2) === 2);
console.assert(fun.apply(null) === null);
console.assert(fun.call(undefined) === undefined);
console.assert(fun.bind(true)() === true);

That means, among other things, that in browsers it's no longer possible to reference the window object through [this]
 inside a strict mode function.

 */

// 07 - Bind

// I'm under the impression that 'bind()' is just a special case of 'closure'
// Let me try...

function membership( name, total ){
    return ( fee ) => {
        total -= fee;
        return name + ' remaining balance: ' + total;
    }
}

const bobsMembership = membership( 'Bob', 250 );
const annsMembership = membership( 'Ann', 1000 );

/* Is the above simpler than the 'bind' approach on collectMontlyFee( fee )? */

console.log( bobsMembership(5) );
console.log( bobsMembership(5) );
console.log( bobsMembership(5) );
console.log( annsMembership(10) );
console.log( annsMembership(10) );
console.log( annsMembership(10) );
