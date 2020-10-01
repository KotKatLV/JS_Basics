"use strict"

// Задание 1

// Создать массив «Список покупок». Каждый элемент массива является объектом, который содержит название продукта, необходимое количество и куплен или нет. Написать несколько функций для работы с таким массивом.
let shoppingList = [
    { productName: "Телевизор", necessaryCount: 10, isBought: false },
    { productName: "Смартфон", necessaryCount: 3, isBought: true },
    { productName: "Наушники", necessaryCount: 9, isBought: false },
    { productName: "Компьютерная мышь", necessaryCount: 5, isBought: false },
    { productName: "Компьютерная клавиатура", necessaryCount: 2, isBought: true },
];

// 1.	Вывод всего списка на экран таким образом, чтобы сначала шли некупленные продукты, а потом – купленные.
shoppingList.sort(p => p.isBought ? 1 : -1).forEach(p => console.log(p));

// 2.	Добавление покупки в список. Учтите, что при добавлении покупки с уже существующим в списке продуктом, необходимо увеличивать количество в существующей покупке, а не добавлять новую.
let purchase1 = { productName: "Телевизор", necessaryCount: 2, isBought: false };
let purchase2 = { productName: "Микрофон", necessaryCount: 1, isBought: true };

function addToShoppingList(purchase, list) {
    let index = list.findIndex(p => p.productName === purchase.productName);
    index !== -1 ? list[index].necessaryCount += purchase.necessaryCount : list.push(purchase);
}

addToShoppingList(purchase1, shoppingList);
addToShoppingList(purchase2, shoppingList);

// 3.	Покупка продукта. Функция принимает название продукта и отмечает его как купленный.
function productPurchase(puchaseName, list) {
    let index = list.findIndex(p => p.productName === puchaseName && !p.isBought);
    index !== -1 ? list[index].isBought = true : alert("Ошибка при отметке!");
}

productPurchase("Компьютерная мышь", shoppingList);

// Задание 2

// Создать массив, описывающий чек в магазине. Каждый элемент массива состоит из названия товара, количества и цены за единицу товара. Написать следующие функции.
let receipt = [
    { productName: "Телевизор", count: 10, cost: 210 },
    { productName: "Смартфон", count: 3, cost: 590 },
    { productName: "Наушники", count: 9, cost: 20 },
    { productName: "Компьютерная мышь", count: 5, cost: 10 },
    { productName: "Компьютерная клавиатура", count: 2, cost: 70 },
];

// 1.	Распечатка чека на экран.
receipt.forEach(r => console.log(r.productName + ", " + r.count + " шт., " + "цeна за единицу: " + r.cost + "."));

// 2.	Подсчет общей суммы покупки
let sum = 0;
receipt.forEach(r => sum += (r.cost * r.count));
console.log("Общая сумма покупки = " + sum + " р.");

// 3.	Получение самой дорогой покупки в чеке.
console.log("Самая дорогая покупка в чеке - " + receipt.sort((r1, r2) => (r1.cost * r1.count) < (r2.cost * r2.count))[0].productName);

// 4.	Подсчет средней стоимости одного товара в чеке.
console.log("Средняя стоимость одного товара в чеке: " + (sum / receipt.length).toFixed(2) + " р.");

// Задание 3

// Создать массив css-стилей (цвет, размер шрифта, выравнивание, подчеркивание и т. д.). Каждый элемент массива – это объект, состоящий из двух свойств: название стиля и значение стиля.
let styles = [
    { backgroundColor: "background-color: brown;" },
    { fontSize: "font-size: xx-large;" },
    { alignment: "text-align: center;" },
    { underline: "border-bottom: 2px solid green;" }
];

// Написать функцию, которая принимает массив стилей и текст, и выводит этот текст с помощью document.write() в тегах <p></p>, добавив в открывающий тег атрибут style со всеми стилями, перечисленными в массиве.
function textOutput(someStyles, text) {
    let str = "";
    for (let i = 0; i < styles.length; i++) {
        for (let style in styles[i]) {
            str += styles[i][style] + " ";
        }
    }

    document.write('<p style=' + `"${str}">` + `${text}</p>`);
}

textOutput(styles, "Рандомный текст");

// Задание 4

// Создать массив аудиторий академии. Объект-аудитория состоит из названия, количества посадочных мест (от 10 до 20) и названия факультета, для которого она предназначена.

let audiences = [
    { name: "1-2", countOfSeats: 15, faculty: "Геолого-географический" },
    { name: "2-1", countOfSeats: 11, faculty: "Математический" },
    { name: "1-3", countOfSeats: 11, faculty: "Геолого-географический" },
    { name: "3-5", countOfSeats: 19, faculty: "Физический" },
    { name: "4-9", countOfSeats: 17, faculty: "Филологический" },
    { name: "3-1", countOfSeats: 19, faculty: "Физический" },
    { name: "2-7", countOfSeats: 18, faculty: "Математический" },
];

// 1.	Вывод на экран всех аудиторий.
audiences.forEach(a => console.log("Номер аудитории: " + a.name + ". Количество посадочных мест: " + a.countOfSeats + ". Факультет: " + a.faculty));

// 2.	Вывод на экран аудиторий для указанного факультета.
let userFaculty = "Геолого-географический";
audiences.forEach(a => { if (a.faculty === userFaculty) console.log(a.name) });

// 3.	Вывод на экран только тех аудиторий, которые подходят для переданной группы. Объект-группа состоит из названия, количества студентов и названия факультета.
let groups = [
    { name: "ГЭ-21", countOfStudents: 20, faculty: "Геолого-географический" },
    { name: "Г-41", countOfStudents: 15, faculty: "Геолого-географический" },
    { name: "ГР-31", countOfStudents: 17, faculty: "Геолого-географический" },
    { name: "АГ-22", countOfStudents: 19, faculty: "Математический" },
    { name: "ВМП-41", countOfStudents: 10, faculty: "Математический" },
    { name: "ОФ-11", countOfStudents: 19, faculty: "Физический" },
    { name: "ОФ-21", countOfStudents: 10, faculty: "Физический" },
    { name: "БЯ-52", countOfStudents: 16, faculty: "Филологический" },
];

function getAudience(group) {
    audiences.forEach(a => { if (a.faculty === group.faculty && a.countOfSeats >= group.countOfStudents) console.log(a.name); });
}

groups.forEach(g => getAudience(g));

// 4.	Функция сортировки аудиторий по количеству мест.
audiences.sort((a1, a2) => a1.countOfSeats - a2.countOfSeats).forEach(a => console.log(a));

// 5.	Функция сортировки аудиторий по названию (по алфавиту).
audiences.sort((a1, a2) => a1.faculty - a2.faculty).forEach(a => console.log(a));