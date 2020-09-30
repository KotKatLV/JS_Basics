"use strict"

let getValueFromForm = (formId, elementId) => document.forms[formId].elements[elementId].value;

function clearResultFieldsFr() {
    document.getElementById("add").value = "";
    document.getElementById("sub").value = "";
    document.getElementById("mul").value = "";
    document.getElementById("div").value = "";
    document.getElementById("red_1").value = "";
    document.getElementById("red_2").value = "";
}

function clearResultFieldsTime() {
    document.getElementById("afterAddHours").value = "";
    document.getElementById("afterAddMin").value = "";
    document.getElementById("afterAddSec").value = "";
}

// Задание 1

// Создать объект, описывающий автомобиль (производитель, модель, год выпуска, средняя скорость), и следующие функции для работы с этим объектом.
function makeCar(producer, model, yearOfIssue, avgSpeed) {
    return {
        producer,
        model,
        yearOfIssue,
        avgSpeed,
    }
}

function updateCar(car) {
    car.producer = getValueFromForm("FirstTask", "producer");
    car.model = getValueFromForm("FirstTask", "model");
    car.yearOfIssue = getValueFromForm("FirstTask", "yearOfIssue");
    car.avgSpeed = getValueFromForm("FirstTask", "avgSpeed");
}

let car = makeCar(getValueFromForm("FirstTask", "producer"), getValueFromForm("FirstTask", "model"), getValueFromForm("FirstTask", "yearOfIssue"), getValueFromForm("FirstTask", "avgSpeed"));

// Функция для вывода на экран информации об автомобиле
car.toString = function() {
    return car.producer + " " + car.model + " " + car.yearOfIssue + " года выпуска, средняя скорость: " + car.avgSpeed + " км/ч.";
}

function getInfoAboutCar() {
    updateCar(car);
    document.getElementById("infoAboutCar").value = car.toString();
}

// Функция для подсчета необходимого времени для преодоления переданного расстояния со средней скоростью. Учтите, что через каждые 4 часа дороги водителю необходимо делать перерыв на 1 час.
car.timeInWay = function(distance) {
    let result = Math.round(distance / car.avgSpeed);

    if (result < 4) {
        return result;
    } else {
        for (let i = 0; i < result; i++) {
            if (i % 4 === 0) {
                result += 1;
            }
        }
        return result;
    }
}

function getTimeInWay() {
    updateCar(car);
    document.getElementById("timeInWay").value = car.timeInWay(getValueFromForm("FirstTask", "distance")) + " ч.";
}

// Задание 2

// Создать объект, хранящий в себе отдельно числитель и знаменатель дроби, и следующие функции для работы с этим объектом.
function Fraction(numerator, denumerator) {
    this.numerator = numerator;
    this.denumerator = denumerator;

    this.NOK = function(A) {
        let n = A.length;
        let a = Math.abs(A[0]);
        for (let i = 1; i < n; i++) {
            let b = Math.abs(A[i]),
                c = a;
            while (a && b) { a > b ? a %= b : b %= a; }
            a = Math.abs(c * A[i]) / (a + b);
        }
        return a;
    }

    this.NOD = function(A) {
        let n = A.length;
        let x = Math.abs(A[0]);
        for (let i = 1; i < n; i++) {
            let y = Math.abs(A[i]);
            while (x && y) { x > y ? x %= y : y %= x; }
            x += y;
        }
        return x;
    }

    this.sum = function(fraction) {
        if (this.denumerator !== fraction.denumerator) {
            return new Fraction((this.numerator * fraction.denumerator) + (fraction.numerator * this.denumerator), this.NOK([this.denumerator, fraction.denumerator]));
        } else {
            return new Fraction(+this.numerator + +fraction.numerator, this.denumerator);
        }
    }

    this.sub = function(fraction) {
        if (this.denumerator !== fraction.denumerator) {
            return new Fraction((this.numerator * fraction.denumerator) - (fraction.numerator * this.denumerator), this.NOK([this.denumerator, fraction.denumerator]));
        } else {
            return new Fraction(this.numerator - fraction.denumerator, this.denumerator);
        }
    }

    this.mul = function(fraction) {
        return new Fraction(this.numerator * fraction.numerator, this.denumerator * fraction.denumerator);
    }

    this.div = function(fraction) {
        if (this.denumerator !== fraction.denumerator) {
            return new Fraction(this.numerator * fraction.denumerator, this.denumerator * fraction.numerator);
        } else {
            return new Fraction(this.numerator - fraction.denumerator, this.denumerator);
        }
    }

    this.red = function() {
        let nod = this.NOD([this.numerator, this.denumerator]);
        return new Fraction(this.numerator / nod, this.denumerator / nod);
    }
}

let fraction_1 = new Fraction(getValueFromForm("SecondTask", "numerator_1"), getValueFromForm("SecondTask", "denumerator_1"));
let fraction_2 = new Fraction(getValueFromForm("SecondTask", "numerator_2"), getValueFromForm("SecondTask", "denumerator_2"));

function updateFunctions(fraction_1, fraction_2) {
    fraction_1.numerator = getValueFromForm("SecondTask", "numerator_1");
    fraction_1.denumerator = getValueFromForm("SecondTask", "denumerator_1");
    fraction_2.numerator = getValueFromForm("SecondTask", "numerator_2");
    fraction_2.denumerator = getValueFromForm("SecondTask", "denumerator_2");
}

function additionOfFractions() {
    updateFunctions(fraction_1, fraction_2);
    document.getElementById("add").value = fraction_1.sum(fraction_2).numerator + " / " + fraction_1.sum(fraction_2).denumerator;
}

function subtractionOfFractions() {
    updateFunctions(fraction_1, fraction_2);
    document.getElementById("sub").value = fraction_1.sub(fraction_2).numerator + " / " + fraction_1.sub(fraction_2).denumerator;
}

function fractionMultiplication() {
    updateFunctions(fraction_1, fraction_2);
    document.getElementById("mul").value = fraction_1.mul(fraction_2).numerator + " / " + fraction_1.mul(fraction_2).denumerator;
}

function fractionDivision() {
    updateFunctions(fraction_1, fraction_2);
    document.getElementById("div").value = fraction_1.div(fraction_2).numerator + " / " + fraction_1.div(fraction_2).denumerator;
}

function fractionReduction() {
    updateFunctions(fraction_1, fraction_2);
    document.getElementById("red_1").value = "Первая дробь после сокращения: " + fraction_1.red().numerator + " / " + fraction_1.red().denumerator + ".";
    document.getElementById("red_2").value = "Вторая дробь после сокращения: " + fraction_2.red().numerator + " / " + fraction_2.red().denumerator + ".";
}

// Задание 3

// Создать объект, описывающий время (часы, минуты, секунды), и следующие функции для работы с этим объектом.
function Time() {
    this.hours = null;
    this.min = null;
    this.sec = null;

    this.setHours = function(h) {
        if (h < 24) {
            this.hours = h;
        } else {
            alert("Ошибка при добавлении! Количество часов в сутках не может быть больше 23!")
        }
    }

    this.setMinutes = function(m) {
        if (m < 60) {
            this.min = m;
        }
    }

    this.setSeconds = function(s) {
        if (s < 60) {
            this.sec = s;
        }
    }

    this.toString = function() {
        return this.hours + ":" + this.min + ":" + this.sec;
    }

    this.ToSeconds = function() {
        return this.hours * 3600 + this.min * 60 + +this.sec;
    }

    this.FromSecondsToHMS = function(timeInSec) {
        this.setHours(timeInSec / 3600 ^ 0);
        this.setMinutes((timeInSec - this.hours * 3600) / 60 ^ 0);
        this.setSeconds(timeInSec - this.hours * 3600 - this.min * 60);
    }

    this.AddHours = function(userHours) {
        let totalSec = this.ToSeconds() + (userHours * 3600)
        this.FromSecondsToHMS(totalSec);
    }

    this.AddMinutes = function(userMinutes) {
        let totalSec = this.ToSeconds() + (userMinutes * 60)
        this.FromSecondsToHMS(totalSec);
    }

    this.AddSeconds = function(userSeconds) {
        let totalSec = this.ToSeconds() + +userSeconds;
        this.FromSecondsToHMS(totalSec);
    }
}

let time = new Time();
time.setHours(getValueFromForm("ThirdTask", "hours"));
time.setMinutes(getValueFromForm("ThirdTask", "min"));
time.setSeconds(getValueFromForm("ThirdTask", "sec"));

function updateTime(time) {
    time.setHours(getValueFromForm("ThirdTask", "hours"));
    time.setMinutes(getValueFromForm("ThirdTask", "min"));
    time.setSeconds(getValueFromForm("ThirdTask", "sec"));
}

function showTime() {
    updateTime(time);
    document.getElementById("getTime").value = time.toString();
}

function addHours() {
    updateTime(time);
    time.AddHours(getValueFromForm("ThirdTask", "addUserHours"));
    document.getElementById("afterAddHours").value = time.toString();
}

function addMin() {
    updateTime(time);
    time.AddMinutes(getValueFromForm("ThirdTask", "addUserMin"));
    document.getElementById("afterAddMin").value = time.toString();
}

function addSec() {
    updateTime(time);
    time.AddSeconds(getValueFromForm("ThirdTask", "addUserSeconds"));
    document.getElementById("afterAddSec").value = time.toString();
}