const JVent = require("./jvent.js");

const hearts = [];

class Animal {

    constructor(name){
        this.name = name;
        this.events = {
            hungry: new JVent("animal hungry"),
            thirsty: new JVent("animal thirsty")
        };
        hearts.push(
            setInterval(() => {
                const brain = Math.random();
                if(brain > 0.6){
                    const events = Object.values(this.events);
                    events[Math.floor(Math.random() * events.length)].fire(Date.now());
                }
            }, 100)
        );
    }

}

class Cat extends Animal {

    constructor(name){
        super(name);
        this.events.attack = new JVent("cat attack");
    }

}

class Dog extends Animal {

    constructor(name){
        super(name);
        this.events.cuddle = new JVent("dog cuddle");
    }

}

class Owner{

    pets = {};

    constructor(name){
        this.name = name;
    }

    feed(e){
        console.log(e + `: ${this.name}'s pet has been fed`);
    }

    addAnimal(animal){
        animal.events.hungry.add(this, "feed");
        animal.events.thirsty.add(e => {
            console.log(e + `: ${this.name}'s ${animal.name} thirsty`);
        })
    }

    addCat(cat){
        this.addAnimal(cat);
        cat.events.attack.add(function(e){
            console.log(e + `: owner's ${cat.name} attacked)`)
        })
    }

    addDog(dog){
        this.addAnimal(dog)
    }

}

setTimeout(() => {
    hearts.forEach(heart => clearInterval(heart));
}, 3000)

const me = new Owner("My");
me.addCat(new Cat("C1"));
me.addCat(new Cat("C2"));
me.addCat(new Cat("C3"));
me.addCat(new Cat("C4"));
me.addCat(new Cat("C5"));
me.addDog(new Dog("D1"));
me.addDog(new Dog("D2"));
me.addDog(new Dog("D3"));
me.addDog(new Dog("D4"));
me.addDog(new Dog("D5"));