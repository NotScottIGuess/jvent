import JVent from "./jvent.js";

const hearts:number[] = [];

interface anyobject {
    [key: string]: any  
}

class Animal {

    name:string;
    events:anyobject;

    constructor(name:string){
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

    constructor(name:string){
        super(name);
        this.events.attack = new JVent("cat attack");
    }

}

class Dog extends Animal {

    constructor(name:string){
        super(name);
        this.events.cuddle = new JVent("dog cuddle");
    }

}

class Owner{

    name:string;
    pets = {};

    standardHandler:Function = () => {};
    arrowHandler:Function = () => {};

    constructor(name:string){
        this.name = name;
    }

    feed(e:any){
        console.log(e + `: ${this.name}'s pet has been fed`);
    }

    addAnimal(animal:Animal){
        animal.events.hungry.add(this, "feed");
        animal.events.thirsty.add(this.arrowHandler = (e:any) => {
            console.log(e + `: ${this.name}'s ${animal.name} thirsty`);
        })
    }

    addCat(cat:Cat){
        this.addAnimal(cat);
        
        this.standardHandler = function(e:any){
            console.log(e + `: owner's ${cat.name} attacked)`)
        }
        cat.events.attack.add(this.standardHandler);
    }

    addDog(dog:Dog){
        this.addAnimal(dog)
    }

    sellAnimal(animal:Animal){
        animal.events.hungry.remove(this, "feed");
        animal.events.attack.remove(this.standardHandler);
        animal.events.thirsty.remove(this.arrowHandler);
        console.log("SOLD: " + animal.name)
    }

}

setTimeout(() => {
    hearts.forEach(heart => clearInterval(heart));
}, 3000)

const me = new Owner("My");
const cats = [new Cat("C1"), new Cat("C2"), new Cat("C3"), new Cat("C4"), new Cat("C5")]
me.addCat(cats[0]);
me.addCat(cats[1]);
me.addCat(cats[2]);
me.addCat(cats[3]);
me.addCat(cats[4]);
me.addDog(new Dog("D1"));
me.addDog(new Dog("D2"));
me.addDog(new Dog("D3"));
me.addDog(new Dog("D4"));
me.addDog(new Dog("D5"));