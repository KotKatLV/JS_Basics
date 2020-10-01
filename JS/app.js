"use strict";

// 1.	Написать функцию, которая принимает строку и выводит статистику о ней: количество букв, количество цифр и количество других знаков.
function getInfoAboutUserString() {
    let userString = document.getElementById("userString_1").value;
    let countOfChars = 0,
        countOfDigits = 0,
        countOfOtherSymb = 0;
    userString.split("").forEach(s => {
        if (!isNaN(s) && s !== " ") ++countOfDigits;
        else if (s.match(/[а-яА-я]/iu) != null) ++countOfChars;
        else if (s !== " ") ++countOfOtherSymb;
    })

    document.getElementById("countOfChars").value = countOfChars;
    document.getElementById("countOfDigits").value = countOfDigits;
    document.getElementById("countOfOtherSymbols").value = countOfOtherSymb;
}

// 2.	Написать функцию, которая принимает двузначное число и возвращает его в текстовом виде.Например: 35–тридцать пять, 89–восемьдесят девять, 12–двенадцать.
function getStringViewOfUserValue() {
    let userValue = document.getElementById("userValue_1").value;

    if (userValue.split("").length !== 2) {
        alert("Неверное число!");
        return;
    }

    let valuesFrom_10_To_19 = new Map();
    valuesFrom_10_To_19.set(10, "Десять").set(11, "Одиннадцать").set(12, "Двенадцать").set(13, "Тринадцать").set(14, "Четырнадцать").set(15, "Пятнадцать").set(16, "Шестнадцать").set(17, "Семнадцать").set(18, "Восемнадцать").set(19, "Девятнацдцать");

    if (valuesFrom_10_To_19.has(+userValue)) {
        document.getElementById("stringViewOfUserValue").value = valuesFrom_10_To_19.get(+userValue);
    } else {
        let firstDigitMap = new Map();
        let secondDigitMap = new Map();
        firstDigitMap.set(0, "").set(1, "один").set(2, "два").set(3, "три").set(4, "четыре").set(5, "пять").set(6, "шесть").set(7, "семь").set(8, "восемь").set(9, "девять");
        secondDigitMap.set(2, "двадцать").set(3, "тридцать").set(4, "сорок").set(5, "пятьдесят").set(6, "шестьдесят").set(7, "семьдесят").set(8, "восемьдесят").set(9, "девяносто");
        document.getElementById("stringViewOfUserValue").value = secondDigitMap.get(+userValue[0]) + " " + firstDigitMap.get(+userValue[1]);
    }
}

// 3.	Написать функцию, которая заменяет в полученной строке большие буквы на маленькие, маленькие – на большие, а цифры – на знак нижнего подчеркивания.
function changeSymbols() {
    let str = document.getElementById("userString_2").value;
    str = str.replace(/\d/g, "_").split("");
    for (let i = 0; i < str.length; i++) {
        str[i] === str[i].toUpperCase() ? str[i] = str[i].replace(str[i], str[i].toLowerCase()) : str[i] = str[i].replace(str[i], str[i].toUpperCase());
    }
    document.getElementById("afterChangedSymb").value = str.join("");
}

// 4.	Написать функцию, которая преобразует названия css-стилей с дефисом в название в СamelСase стиле: font-size в fontSize, background-color в backgroundColor, text- align в textAlign.
function transformCSSStyle() {
    let str = document.getElementById("userString_3").value.split("-");
    document.getElementById("afterTransforming").value = str[0] + str[1].charAt(0).toUpperCase() + str[1].substring(1, str[1].length);
}

// 5.	Написать функцию, которая принимает словосочетание и превращает его в аббревиатуру. Например: cascading  style  sheets в CSS, объектно-ориентированное программирование в ООП.
function createAbbreviationFromString() {
    let result = "";
    document.getElementById("userString_4").value.split(/-|\s/).forEach(s => result += s.charAt(0).toUpperCase());
    document.getElementById("abbreviation").value = result;
}

// 6.	Написать функцию, которая принимает любое количество строк, объединяет их в одну длинную строку и возвращает ее.
function unionUserStrings() {
    document.getElementById("userStringsUnion").value = document.getElementById("userString_5").value.replace(/\s/g, "");
}

// 7.	Написать функцию – калькулятор. Функция принимает строку с примером, определяет, какое действие необходимо выполнить (+ - * /), переводит операнды в числа, решает пример и возвращает результат.
function getOperationResult() {
    let tmp = document.getElementById("dropdownList");
    let leftOperand = +document.getElementById("leftOperand").value;
    let rightOperand = +document.getElementById("rightOperand").value;
    document.getElementById("operationResult").value = eval(`${leftOperand} ${tmp.options[tmp.selectedIndex].text} ${rightOperand}`);
}

// 8.   Написать функцию, которая получает url и выводит под-робную информацию о нем. Например: url “https://itstep.org/ua/about”, информация “протокол: https, домен: itstep.org, путь: /ua/about”.
function parseURL() {
    let url = new URL(document.getElementById("userString_6").value);
    document.getElementById("parsedURL").value = `Протокол ${url.protocol}, домен: ${url.host}, путь: ${url.pathname}`;
}

// 9.	Написать функцию, которая принимает строку и разделитель(одиночный символ) и возвращает массив подстрок, разбитых с помощью указанного разделителя. Например: строка “10 / 08 / 2020”, разделитель “/”, результат: “10”, “08”, “2020”. Выполняя задание, не используйте функцию split().
function separateUserString() {
    let str = document.getElementById("userString_7").value;
    let sep = document.getElementById("separator").value;
    let result = [];
    for (let i = 0, tmp = 0; i < str.length; i++) {
        if (str[i] === sep) {
            result.push(str.slice(tmp, i));
            tmp = ++i;
        }

        if (i === str.length - 1 && str[--tmp] === sep) {
            result.push(str.slice(++tmp, str.length));
        }
    }
    document.getElementById("afterSeparation").value = result;
}

// 10.	Написать функцию вывода текста по заданному шаблону. Функция принимает первым параметром шаблон, в тексте которого может использоваться %, после символа % ука-зывается индекс входного параметра. При выводе вместо %индекс необходимо вывести значение соответствующего входного параметра. Например: print(“Today is % 1 % 2. % 3. % 4”, “Monday”, 10, 8, 2020) должна вывести “Today is Monday 10.8.2020”.
function makeStringFromTemplate() {
    let template = document.getElementById("template").value;
    let params = document.getElementById("params").value.split(",");

    for (let i = 0, j = 1; i < params.length; i++) {
        template = template.replace(`%${j++}`, params[i].trim());
    }

    document.getElementById("templateString").value = template;
}