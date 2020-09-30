"use strict"

// 1.	Запросите у пользователя его имя и выведите в ответ: «Привет, его имя!».
let name = prompt("Enter your name:", "Konstantin");
alert("Hi, " + name + "!");

// 2.	Запросите у пользователя год его рождения, посчитайте, сколько ему лет и выведите результат. Текущий год укажите в коде как константу.
const currentYear = new Date().getFullYear();
let yearOfBirth = +prompt("Enter your year of birth:", "1996");
alert("You are " + (currentYear - yearOfBirth) + " y.o.");

// 3.	Запросите у пользователя длину стороны квадрата и выведите периметр такого квадрата.
let side = +prompt("Enter the side of the square:", "4");
alert("Square perimeter = " + side * 4);

// 4.	Запросите у пользователя радиус окружности и выведите площадь такой окружности.
let radius = +prompt("Enter radius:", "4");
alert("Circle area = " + (Math.PI * radius * radius).toFixed(2) + "cs.");

// 5.    Запросите у пользователя расстояние в км между двумя городами и за сколько часов он хочет добраться. Посчитайте скорость, с которой необходимо двигаться, чтобы успеть вовремя.
let distanceInKM = +prompt("Enter the distance between two cities in km: ", "25");
let timeInHours = +prompt("Enter how many hours does you want to get: ", "2");
alert("If you move at a min speed of " + (distanceInKM / timeInHours).toFixed(2) + " km/h you will arrive on time.")

// 6.   Реализуйте конвертор валют. Пользователь вводит доллары, программа переводит в евро. Курс валюты храните в константе.
const oneEuroToDollar = 0.91;
let userAmountInDollars = +prompt("Enter the amount in dollars: ", "25");
alert(userAmountInDollars + "$ = " + Math.round((userAmountInDollars * oneEuroToDollar)) + "€");

// 7.   Пользователь указывает объем флешки в Гб. Программа должна посчитать сколько файлов размером в 820 Мб по-мещается на флешку.
let fileSizeInGb = (820 / 1000).toFixed(2);
let fleshSizeInGb = +prompt("Enter flesh size in gigabyte: ", "5");
let countOfFilesToRead = 0;

while (fleshSizeInGb - fileSizeInGb > 0) {
    countOfFilesToRead++;
    fleshSizeInGb -= fileSizeInGb;
}
alert("You can record " + countOfFilesToRead + " file(s).");

// 8.	Пользователь вводит сумму денег в кошельке и цену одной шоколадки. Программа выводит сколько шоколадок может купить пользователь и сколько сдачи у него останется.
let userCash = parseFloat(prompt("Enter amount of money in your wallet: ", "250"));
let oneChocolateCost = parseFloat(prompt("Enter the price of one chocolate bar: ", "8"));
let countOfChocolates = 0;

while (userCash - oneChocolateCost > 0) {
    countOfChocolates++;
    userCash -= oneChocolateCost;
}
alert("You can buy " + countOfChocolates + " chocolates. Yours change = " + userCash);

// 9.	Запросите у пользователя трехзначное число и выведите его задом наперед. Для решения задачи вам понадобится оператор % (остаток от деления).
let userValue = +prompt("Enter value: ", "123");
alert(('' + userValue).split('').reverse().join(''));

// 10.	Запросите у пользователя целое число и выведите в ответ, четное число или нет. В задании используйте логические операторы. В задании не надо использовать if или switch.
userValue = +prompt("Enter value: ", "6");
userValue % 2 === 0 ? alert("Even number") : alert("Odd number");