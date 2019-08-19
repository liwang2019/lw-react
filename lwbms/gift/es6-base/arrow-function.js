let value = 2;
let double = x => 2 * x;
let treble = x => {
    return 3 * x;
}
console.log('double:', double(value));
console.log('treble:', treble(value));

var obj = {
    commonFn: function () {
        console.log(this);
    },
    arrowFn: () => {
        console.log(this);
    }
}
obj.commonFn();
obj.arrowFn();

let Animal = function () {

}
let animal = new Animal();

let Animal = () => {

}
let animal = new Animal();

let commonFn = function () { };
let arrowFn = () => { };

console.log(commonFn.prototype);
console.log(arrowFn.prototype);

