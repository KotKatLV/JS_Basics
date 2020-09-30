"use strict"

// 1.	Запросить у пользователя его возраст и определить, кем он является: ребенком (0–2), подростком (12–18), взрослым (18_60) или пенсионером (60– ...).
let userAge = +prompt("Enter your age: ", "30");

if (userAge < 3) {
    alert("You are a child");
} else if (userAge >= 12 && userAge <= 18) {
    alert("You are a teenager");
} else if (userAge > 18 && userAge <= 60) {
    alert("You are an adult");
} else if (userAge > 60) {
    alert("You are a senior citizen");
}

// 2.	Запросить у пользователя число от 0 до 9 и вывести ему спецсимвол, который расположен на этой клавише (1–!, 2–@, 3–# и т. д).
let userValue = +prompt("Enter a number from 0 to 9: ", "5");
if (userValue >= 0 && userValue <= 9) {
    switch (userValue) {
        case 1:
            alert("!");
            break;
        case 2:
            alert("@");
            break;
        case 3:
            alert("#");
            break;
        case 4:
            alert("$");
            break;
        case 5:
            alert("%");
            break;
        case 6:
            alert("^");
            break;
        case 7:
            alert("&");
            break;
        case 8:
            alert("*");
            break;
        case 9:
            alert("(");
            break;
    }
}

// 3.	Запросить у пользователя трехзначное и число и проверить, есть ли в нем одинаковые цифры.
userValue = +prompt("Enter a three-digit number: ", "322");
let set = new Set(userValue.toString().split(''));
set.size === userValue.toString().split('').length ? alert("No") : alert("Yes");

// 4.	Запросить у пользователя год и проверить, високосный он или нет. Високосный год либо кратен 400, либо кратен 4 и при этом не кратен 100.
let userYear = +prompt("Enter year: ", "2000");
(userYear % 400 === 0 || (userYear % 4 === 0 && userYear % 100 !== 0)) ? alert("Leap year"): alert("Not leap year");

// 5.	Запросить у пользователя пятиразрядное число и определить, является ли оно палиндромом.
userValue = +prompt("Enter value: ", "101");
let revUserValue = userValue.toString().split('').reverse().join('')
userValue === revUserValue ? alert("This value is palindrome") : alert("This value isn't palindrome");

// 6.	Написать конвертор валют. Пользователь вводит количество USD, выбирает, в какую валюту хочет перевести: EUR, UAN или AZN, и получает в ответ соответствующую сумму.
userValue = +prompt("Enter amount of dollars: ", "500");
if (confirm("Convert to EUR")) {
    alert(userValue + "USD = " + (userValue * 0.91) + "EUR");
} else if (confirm("Convert to UAH")) {
    alert(userValue + "USD = " + (userValue * 27.30) + "UAH");
} else if (confirm("Convert to AZN")) {
    alert(userValue + "USD = " + (userValue * 1.7) + "AZN");
}

// 7.	Запросить у пользователя сумму покупки и вывести сумму к оплате со скидкой: от 200 до 300 – скидка будет 3%, от 300 до 500 – 5%, от 500 и выше – 7%.
userValue = +prompt("Enter purchase amount: ", "499");
switch (true) {
    case (userValue >= 200 && userValue < 300):
        alert("Discounted amount = " + (userValue - (userValue * 3) / 100));
        break;
    case (userValue > 300 && userValue < 500):
        alert("Discounted amount = " + (userValue - (userValue * 5) / 100));
        break;
    case userValue > 500:
        alert("Discounted amount = " + (userValue - (userValue * 7) / 100));
        break;
}

// 8.	Запросить у пользователя длину окружности и периметр квадрата. Определить, может ли такая окружность поместиться в указанный квадрат.
let circumference = +prompt("Enter circumference: ", "10");
let squarePerimeter = +prompt("Enter square perimeter: ", "40");
let circleRadius = circumference / (2 * Math.PI);
let squareSide = squarePerimeter / 4;
circleRadius <= squareSide / 2 ? alert("Circle is placed") : alert("circle isn't placed");

// 9.	Задать пользователю 3 вопроса, в каждом вопросе по 3 варианта ответа. За каждый правильный ответ начисляется 2 балла. После вопросов выведите      пользователю количество набранных баллов.
let countOfPoints = 0;
alert("Question № 1. The capital of Hungary:")
if (confirm("Bucharest")) {

} else if (confirm("Bratislava")) {

} else if (confirm("Budapest")) {
    countOfPoints += 2;
}

alert("Question № 2. The oldest city in Belarus:");
if (confirm("Novopolotsk")) {

} else if (confirm("Polotsk")) {
    countOfPoints += 2;
} else if (confirm("Novogrudok")) {

}

alert("Question № 3. In what year was the constitution of the Republic of Belarus adopted:");
if (confirm("1993")) {
    countOfPoints += 2;
} else if (confirm("1994")) {

} else if (confirm("1995")) {

}

alert("You scored " + countOfPoints + " points");

// 10.	Запросить дату (день, месяц, год) и вывести следующую за ней дату. Учтите возможность перехода на следующий месяц, год, а также високосный год.
let userDate = prompt("Enter date: ", "31.12.2020");
// let date = new Date(2020, 11, 1);
let tmp = userDate.split('.');
let date;
date = new Date(parseInt(tmp[2]), parseInt(tmp[1] - 1), parseInt(tmp[0]));
date.setDate(date.getDate() + 1)
alert(date);