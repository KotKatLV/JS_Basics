"use strict"

let getValueFromForm = (formId, elementId) => document.forms[formId].elements[elementId].value;

// Во всех заданиях обязательно использовать рекурсию.

// 1.	Написать функцию возведения числа в степень
function getFirstTaskResult() {
    let value = getValueFromForm("FirstTask", "value");
    let power = getValueFromForm("FirstTask", "pow");

    function degree(value, pow) {
        return pow === 1 ? value : value * degree(value, pow - 1);
    }
    document.getElementById("firstTaskResult").value = degree(value, power);
}

// 2.	Запросить 2 числа и найти только наибольший общий делитель
function getSecondTaskResult() {
    let firstValue = getValueFromForm("SecondTask", "firstValue");
    let secondValue = getValueFromForm("SecondTask", "secondValue");
    const gcd = (x, y) => x ? gcd(y % x, x) : y;
    document.getElementById("secondTaskResult").value = gcd(firstValue, secondValue);
}

// 3.	Написать функцию для поиска максимальной цифры в числе.
// Здесь не использовал рекурсию
function getThirdTaskResult() {
    let value = getValueFromForm("ThirdTask", "userValue").split('');
    document.getElementById("thirdTaskResult").value = Math.max(...value);
}

// 4.	Написать функцию, которая определяет простое ли переданное число.
function getFourthTaskResult() {
    let value = getValueFromForm("FourthTask", "userValue_2");

    if (value < 2) {
        document.getElementById("fourthTaskResult").value = "Ошибка! Число должно быть больше 1";
    } else if (value === 2) {
        document.getElementById("fourthTaskResult").value = "Простое число";
    }

    const limit = Math.sqrt(value);

    function IsPrime(x, y) {
        if (y > limit)
            return true;
        else {
            return x % y === 0 ? false : IsPrime(x, ++y);
        }
    }

    if (IsPrime(value, 2)) {
        document.getElementById("fourthTaskResult").value = "Простое число";
    } else {
        document.getElementById("fourthTaskResult").value = "Составное число";
    }
}

// 5.	Написать функцию для вывода всех множителей переданного числа в возрастающем порядке. Например: число 18 – множители 2 * 3 * 3.
function getFifthTaskResult() {
    let value = getValueFromForm("FifthTask", "userValue_3");
    let result = [];

    // x - исх. число, y - множитель
    function GetNumberFactors(x, y) {
        if (x === 1)
            return;
        if (x % y === 0) {
            result.push(y);
            GetNumberFactors(x / y, y);
        } else {
            if (y === 2) {
                GetNumberFactors(x, y + 1);
            } else {
                GetNumberFactors(x, y + 2);
            }
        }
    }

    GetNumberFactors(value, 2);
    document.getElementById("fifthTaskResult").value = result;
}

// 6. Написать функцию, которая возвращает число Фибоначчи по переданному порядковому номеру.Числа Фибоначчи: 1, 1, 2, 3, 5, 8, 13… Ряд основывается на том, что каждое число равно сумме двух предыдущих чисел.Например: порядковый номер 3– число 2, порядковый номер 6– число 8.

// P.S. это решение будет работать ОЧЕНЬ медленно при выборе больших чисел, но способ, решающий эту проблему, реализуется через ДП с использованием циклов, которые по ТЗ нельзя использовать.
function getSixthTaskResult() {
    let value = getValueFromForm("SixthTask", "value_1");

    function fib(n) {
        return n <= 1 ? n : fib(n - 1) + fib(n - 2);
    }
    document.getElementById("sixthTaskResult").value = fib(value);
}