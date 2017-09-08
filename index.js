/**
 * Created by Magda on 2017-09-06.
 */

var Car = function(name, speed) {
    this.name = name;
    this.speed = speed;
    this.wheelNum = 4;
    this.getWheelNum = function(){
        console.log(this.wheelNum);
    };
    var przebieg = 88;
    this.getPrzebieg = function(){
        if(name == "hello"){
            return przebieg;
        }
        else{
            return false;
        }
    };
};

var myCar = new Car("hello", 13);
console.log(myCar);
myCar.getWheelNum();
console.log(myCar.getPrzebieg());

var opelCar = new Car("opel", 100);
var bmwCar = new Car("bmw", 110);
var fiatCar = new Car("fiat", 120);
var mazdaCar = new Car("mazda", 130);

Car.prototype.gwarancja = 2;

console.log("bmw: " + bmwCar.gwarancja);
Car.prototype.setGwarancja = function () {
    this.gwarancja = 7;
};

mazdaCar.setGwarancja();
console.log("mazda: " + mazdaCar.gwarancja);

Object.prototype.xxx = 999;