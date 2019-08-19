// class constuctor
class Animal {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name
    }
}

let animal = new Animal('animal test');
console.log(animal.getName())

class Animal {
    constructor() {
        this.name = 'animal';
    }
    getName() {
        return this.name
    }
}

class Cat extends Animal {
    constructor() {
        super()
        this.name = 'cat';
    }
}

let animal = new Animal();
let cat = new Cat();
console.log(animal.getName())
console.log(cat.getName())


var name = 'Rosen',
    age = 18;
var obj = {
    name: name,
    age: age,
    getName: function () {
        return this.name;
    },
    getAge: function () {
        return this.age;
    }
}

let name = 'Rosen',
    age = 18;

let obj = {
    name,
    age,
    getName() {
        return this.name;
    },
    ['get' + 'Age']() {
        return this.age;
    }
}

Object.keys(obj);


