"use strict"

// Задание 1

// Реализовать класс, описывающий простой маркер. В классе должны быть следующие компоненты:
class Marker {

    constructor() {
        // цвет маркера
        this.color = "";

        // количество(%) чернил
        this.inkQuantity = 100;

        // один не пробельный символ – это 0,5% чернил в маркере
        this.oneSymbToInk = 0.5;
    }

    // метод для печати (метод принимает строку и выводит текст соответствующим цветом; текст выводится до тех пор, пока в маркере есть чернила; один не пробельный символ – это 0,5% чернил в маркере).
    print(userString) {

        if (this.inkQuantity <= 0) {
            alert("В маркере нет чернил!");

        } else {
            let countOfSymb = userString.match(/\S/gi).length;
            let countOfNecessaryInkToPrint = countOfSymb * this.oneSymbToInk;
            if (countOfNecessaryInkToPrint > this.inkQuantity) {
                document.write(`<p style="color:${this.color}">${userString.substr(0, this.inkQuantity * this.oneSymbToInk)}</p>`)
                this.inkQuantity = 0;
            } else {
                document.write(`<p style="color:${this.color}">${userString}</p>`);
                this.inkQuantity -= countOfNecessaryInkToPrint;
                if (this.inkQuantity < 0) {
                    alert("В маркере закончились чернила!");
                    this.inkQuantity = 0;
                }
            }
        }
    }
}

// Реализовать класс, описывающий заправляющийся маркер, унаследовав его от простого маркера и добавив метод для заправки маркера.
class MarkerRefueling extends Marker {
    static RefuelMarker(marker) {
        marker.inkQuantity = 100;
    }
}

let marker = new Marker();
marker.color = "red";

while (true) {
    marker.print("Ля ля");
    marker.print("Ля ля")
    marker.print("Ля ля")
    marker.print("r\;jkgeroihjgegpwekfweguweiodplewighreifoplqwldkf43tfwyuhijdokplwqfewgyhfdjqwo-pflreghre87fghwe0fkjewiofjwefgjwe-9gjew8gjew0gijweiugewhjgweihgwe9g");
    if (marker.inkQuantity <= 0) {
        MarkerRefueling.RefuelMarker(marker);
        alert("Маркер был заправлен!");
        break;
    }
}

// Задание 2

// Реализуйте класс ExtendedDate, унаследовав его от стандартного класса Date и добавив следующие возможности:
class ExtendedDate extends Date {
    constructor() {
        super();
        this.daysFrom_1_To_19 = new Map();
        this.secondDigitMap = new Map();
        this.months = new Map();
        this.months.set(0, "Января").set(1, "Февраля").set(2, "Марта").set(3, "Апреля").set(4, "Мая").set(5, "Июня").set(6, "Июля").set(7, "Августа").set(8, "Сентября").set(9, "Октября").set(10, "Ноября").set(11, "Декабря");
        this.daysFrom_1_To_19.set(1, "Первое").set(2, "Второе").set(3, "Третье").set(4, "Четвертое").set(5, "Пятое").set(6, "Шестое").set(7, "Седьмое").set(8, "Восьмое").set(9, "Девятое").set(10, "Десятое").set(11, "Одиннадцатое").set(12, "Двенадцатое").set(13, "Тринадцатое").set(14, "Четырнадцатое").set(15, "Пятнадцатое").set(16, "Шестнадцатое").set(17, "Семнадцатое").set(18, "Восемнадцатое").set(19, "Девятнацдцатое");
        this.secondDigitMap.set(2, "двадцать").set(3, "тридцать");
    }

    // метод для вывода даты (числа и месяца) текстом
    getTextDate() {
        let now = new Date();
        let date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let actualDay = date.getDate();
        let actualMonth = date.getMonth();
        if (actualDay < 20) {
            return this.daysFrom_1_To_19.get(actualDay) + " " + this.months.get(actualMonth);
        } else if (actualDay > 19 && actualDay < 32) {
            let str = actualDay.toString().split("");
            return this.secondDigitMap.get(str[0]) + " " + this.daysFrom_1_To_19(str[1]) + " " + this.months.get(actualMonth);
        }
    }

    // метод для проверки – это прошедшая дата или будущая (если прошедшая, то метод возвращает false; если будущая или текущая, то true)
    isFutureDate(date) {
        let userDate = new Date(date);
        let now = new Date();
        let currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return currentDate < userDate;
    }

    // метод для проверки – високосный год или нет
    isLeapYear(userYear) {
        return (userYear % 400 === 0 || (userYear % 4 === 0 && userYear % 100 !== 0));
    }

    // метод, возвращающий следующую дату
    // "следующую дату" я понял как следующий день
    getNextDate(sourceDate) {
        let userDate = new Date(sourceDate);
        userDate.setDate(userDate.getDate() + 1);
        return userDate.toDateString();
    }
}

let myDate = new ExtendedDate();
console.log(myDate.getTextDate());

myDate.isFutureDate("2021-01-26") ? console.log("Указанная дата является будующей") : console.log("Указанная дата явяется прошлой");

myDate.isLeapYear(2000) ? console.log("Указанный Вами год является високосным") : console.log("Указанный Вами год не является високосным");

console.log(myDate.getNextDate("2021-01-26"));

// Задание 3

// Реализовать класс Employee, описывающий работника, и создать массив работников банка.
class Employee {
    constructor(firstName, secondName, position) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.position = position;
    }
}

let emp1 = new Employee("Иван", "Иванов", "Генеральный директор");
let emp2 = new Employee("Петр", "Петров", "Зам. генерального директора");
let emp3 = new Employee("Алексей", "Алексеев", "Начальник самого важного отдела");
let emp4 = new Employee("Василий", "Васильев", "Начальник менее важного отдела");

let employees = [emp1, emp2, emp3, emp4];

// Реализовать класс EmpTable для генерации html кода таблицы со списком работников банка. Массив работников необходимо передавать через конструктор, а получать html код с помощью метода getHtml(). Создать объект класса EmpTable и вывести на экран результат работы метода getHtml().
class EmpTable {
    constructor(employees) {
        this.employees = employees;
    }

    getHtml() {
        let result =
            `<table>
                <caption>Работники банка</caption>
                    <tr>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>Должность</th>
                    </tr>`;

        for (let i = 0; i < this.employees.length; i++) {
            result +=
                `<tr>
                    <td>${this.employees[i].firstName}</td>
                    <td>${this.employees[i].secondName}</td>
                    <td>${this.employees[i].position}</td>
                <tr>`;
        }
        result += `</table>`;
        return result;
    }
}

// Раскомментировать для проверки результата 3 задания
// let emptable1 = new EmpTable(employees);
//document.write(emptable1.getHtml());

// Задание 4

// Реализовать класс StyledEmpTable, который наследуется от класса EmpTable. Добавить метод getStyles(), который возвращает строку со стилями для таблицы в тегах style. Переопределить метод getHtml(), который добавляет стили к тому, что возвращает метод getHtml() из родительского класса. Создать объект класса StyledEmpTable и вывести на экран результат работы метода getHtml().
class StyledEmpTable extends EmpTable {

    constructor(employees) {
        super(employees);
    }

    // Поскольку в ТЗ не было указано каких-либо конкретных стилей и формата их хранения в текущем классе - я сделал это в виде строки с уже опрделенными стилями
    getStyles() {
        return `<style> table {border: 1px solid grey;} th {border: 1px solid grey;}td {border: 1px solid grey;}</style>`;
    }

    getHtml() {
        return this.getStyles() + super.getHtml();
    }
}

let semt = new StyledEmpTable(employees);
document.write(semt.getHtml());