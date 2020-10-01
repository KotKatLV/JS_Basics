"use strict"

// Задание 1

// Создать html-страницу со списком сообщений на форуме и формой для добавления нового сообщения. После заполнения формы добавить сообщение к списку на экране.

const getElemValue = (id) => document.getElementById(id).value;
const createElem = (elemName) => document.createElement(elemName);

function createNewPost() {

    let userName = getElemValue("inputUserName");
    let userMess = getElemValue("txtArea");

    if (userName.length < 1 || userMess.length < 1) {
        alert("Ошибка при вводе данных!");

    } else {
        let postDiv = createElem("div");
        postDiv.setAttribute("class", "post");

        let userLoginDiv = createElem("div");
        userLoginDiv.setAttribute("class", "user-login");

        let loginNameP = createElem("p");
        loginNameP.setAttribute("class", "login-name");
        loginNameP.innerHTML = userName;

        let today = new Date();
        let date = today.getDate() + '.' + ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '.' + today.getFullYear();
        let time = today.getHours() + ":" + (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()) + ":" + (today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds()) + " ";
        let messTimeP = createElem("p");
        messTimeP.setAttribute("class", "message-time");
        messTimeP.innerHTML = time + date;

        let messageDiv = createElem("div");
        messageDiv.setAttribute("class", "message");

        let userMessageP = createElem("p");
        userMessageP.setAttribute("class", "user-message");
        userMessageP.innerHTML = userMess;

        userLoginDiv.appendChild(loginNameP);
        userLoginDiv.appendChild(messTimeP);
        messageDiv.appendChild(userMessageP);
        postDiv.appendChild(userLoginDiv);
        postDiv.appendChild(messageDiv);
        let forum = document.getElementById("posts");
        forum.appendChild(postDiv);

        document.getElementById("inputUserName").value = "";
        document.getElementById("txtArea").value = "";
    }
}

// Задание 2

//Создать html-страницу для прохождения теста. Вопросы теста имеют два варианта ответа(только 1 правильный). После прохождения теста, вывести количество правильных ответов.
let userPoints = 0;
let isFirstAnswered = false;
let isSecondAnswered = false;

function checkFirstAnswer() {
    if (document.getElementById("FiveRadio").checked && !isFirstAnswered) {
        ++userPoints;
        isFirstAnswered = true;
    }
}

function checkSecondAnswer() {
    if (document.getElementById("SixRadio").checked && !isSecondAnswered) {
        ++userPoints;
        isSecondAnswered = true;
    }
}

function getTestResult() {
    if (document.querySelector(".testRes") != null)
        document.querySelector(".testRes").remove();

    let newP = document.createElement("p");
    newP.setAttribute("class", "testRes");
    newP.innerHTML = `Результат: ${userPoints} пр. отв. из 2-х вопросов.`;
    let quiz = document.getElementById("quiz");
    quiz.appendChild(newP);
    userPoints = 0;
    isFirstAnswered = false;
    isSecondAnswered = false;
}

// Задание 3

// Создать html-страницу с формой для ввода стилизованного текста. После заполнения формы, вывести текст на экран в соответствии с указанными стилями.

const isChecked = (elemId) => document.getElementById(elemId).checked;
const removeElements = (elms) => elms.forEach(e => e.remove());

function createText(styles) {
    removeElements(document.querySelectorAll(".created-text"));

    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "created-text");
    newDiv.style.backgroundColor = "#FBF2E9"
    newDiv.style.margin = "auto";
    newDiv.style.width = "850px";
    newDiv.style.textAlign = "center";

    let resultP = document.createElement("p");
    resultP.style.textAlign = "left";
    resultP.textContent = "Результат:"

    let textP = document.createElement("p");
    textP.setAttribute("style", styles);
    textP.innerHTML = document.getElementById("userText").value;
    textP.style.border = "1px solid black";
    textP.style.padding = "5px";

    newDiv.appendChild(resultP);
    newDiv.appendChild(textP);

    let form = document.getElementById("stylizedTextContainer");
    form.appendChild(newDiv);
}

function showText() {
    let styles = [];
    let stylesResult = "";
    if (isChecked("boldText"))
        styles.push("font-weight: bold;");
    if (isChecked("underlineText"))
        styles.push("text-decoration: underline;");
    if (isChecked("italicsText"))
        styles.push("font-style: italic;");

    if (isChecked("leftAlign")) {
        styles.push("text-align: left;");
    } else if (isChecked("rightAlign")) {
        styles.push("text-align: right;");
    } else if (isChecked("justifyAlign")) {
        styles.push("text-align: justify;");
    }

    styles.forEach(s => stylesResult += s);
    createText(stylesResult);
}

// Задание 4

// Создать html-страницу для магазина книг. Пользователь должен иметь возможность выбрать книгу, указать количество экземпляров, ввести свое имя, дату доставки, адрес доставки и комментарий. После заполнения формы необходимо вывести на экран: «Имя покупателя, спасибо за заказ.Такой - то товар будет доставлен в такую-то дату по такому-то адресу».

// P.s. не делал проверок на null или 0 значения в вводимых полях

let bookPrice = 0;
let bookName = "";

function getInfoAboutSell() {
    removeElements(document.querySelectorAll(".sell-result"));

    let resDiv = document.createElement("div");
    resDiv.setAttribute("class", "sell-result");
    resDiv.style.backgroundColor = "#FBF2E9";

    let newP = document.createElement("p");
    newP.textContent = "Результат";
    newP.style.textAlign = "left";

    let textDiv = document.createElement("div");
    textDiv.style.border = "1px solid black";

    let textDivP1 = document.createElement("p");
    textDivP1.textContent = `${document.getElementById("userNumber").value}, спасибо за заказ!`

    let textDivP2 = document.createElement("p");
    bookPrice *= +document.getElementById("countOfBook").value;
    let date = document.getElementById("delyDate").value.split("-");

    textDivP2.textContent = `Книга "${document.getElementById("bookName").value}" будет доставлена ${date[2]}.${date[1]}.${date[0]}. по адресу ${document.getElementById("delyAddress").value}. Стоимость заказа составила ${bookPrice.toFixed(2)}$.`

    resDiv.appendChild(newP);
    textDiv.appendChild(textDivP1);
    textDiv.appendChild(textDivP2);
    resDiv.appendChild(textDiv);

    let tmp = document.getElementById("books-shop");
    tmp.appendChild(resDiv);
}

function choosedProduct(book) {
    let bookDescripElem = book.parentNode.nextSibling.parentElement.firstElementChild;
    bookDescripElem.childNodes.forEach(c => {
        if (c.className === "book-name") { bookName = c.innerHTML.trim(); }
        if (c.className === "book-price") { bookPrice = +(c.innerText.substring(0, c.innerText.length - 1)).replace(",", "."); }
    });
    document.getElementById("bookName").value = bookName;
    document.getElementById("countOfBook").value = 1;
}

// Задание 5

// Создать html-страницу с возможностью отмечать присутствующих на паре. Для начала пользователь выбирает группу и пару, дальше вводит тему занятия и отмечает присутствующих. Также добавить возможность посмотреть уже отмеченные пары. Хранить информацию в заранее подготовленных массивах.

const groups = ["Группа 1", "Группа 2", "Группа 3"];
const lessons = ["Занятие 1", "Занятие 2", "Занятие 3"];
const students = [
    { name: "Вася", groupName: "Группа 1" },
    { name: "Петя", groupName: "Группа 1" },
    { name: "Коля", groupName: "Группа 1" },
    { name: "Игорь", groupName: "Группа 2" },
    { name: "Сергей", groupName: "Группа 2" },
    { name: "Саша", groupName: "Группа 2" },
    { name: "Егор", groupName: "Группа 3" },
    { name: "Дима", groupName: "Группа 3" },
    { name: "Илья", groupName: "Группа 3" },
]
let markedLessons = [];
let listOfGroups = null;
let listOfLessons = null;

function createTable() {
    let newTable = createElem("table");
    newTable.setAttribute("class", "log-table");

    let firstTr = createElem("tr");
    let studentTh = createElem("th");
    studentTh.textContent = "Студент";
    let attendanceTh = createElem("th");
    attendanceTh.textContent = "Присутствие";

    firstTr.appendChild(studentTh);
    firstTr.appendChild(attendanceTh);
    newTable.appendChild(firstTr);

    let studentsOfSelectedGroup = students.filter(s => s.groupName === listOfGroups.options[listOfGroups.selectedIndex].text);
    let studentTr = null;
    let studentTd = null;
    let attendanceTd = null;
    let attendanceCb = null;
    studentsOfSelectedGroup.forEach(s => {
        studentTr = createElem("tr");
        studentTd = createElem("td");
        studentTd.textContent = s.name;

        attendanceTd = createElem("td");
        attendanceCb = createElem("input");
        attendanceCb.setAttribute("type", "checkbox");

        attendanceTd.appendChild(attendanceCb);
        studentTr.appendChild(studentTd);
        studentTr.appendChild(attendanceTd);
        newTable.appendChild(studentTr);
    });

    return newTable;
}

function selectLesson() {
    listOfGroups.removeAttribute("disabled", "");
    listOfLessons.removeAttribute("disabled", "");
    removeElements(document.querySelectorAll(".log"));

    let newDiv = createElem("div");
    newDiv.setAttribute("class", "log");

    let newP = createElem("p");
    newP.setAttribute("class", "topic");
    newP.textContent = "Тема: ";

    let newInput = createElem("input");
    newInput.setAttribute("class", "lesson-topic");
    newInput.setAttribute("type", "text");

    newP.appendChild(newInput);

    let inputSaveButton = createElem("input");
    inputSaveButton.setAttribute("type", "button");
    inputSaveButton.setAttribute("class", "save-log-button");
    inputSaveButton.setAttribute("value", "Сохранить");
    inputSaveButton.setAttribute("onclick", "saveInfo()");

    newDiv.appendChild(newP);
    newDiv.appendChild(createTable());
    newDiv.appendChild(inputSaveButton);

    let wrapper = document.getElementById("mainWrapper");
    wrapper.appendChild(newDiv);
}

function changeTable() {
    let newP = null;
    let table = document.querySelector(".log-table");
    let child = "";
    for (let i = 1; i < table.rows.length; i++) {
        newP = createElem("p");
        newP.style.margin = 0;
        if (table.rows[i].cells[1].children[0].checked) {
            newP.textContent = "присутствует";
            child = table.rows[i].cells[1].children[0];
            table.rows[i].cells[1].removeChild(child);
            table.rows[i].cells[1].appendChild(newP);
        } else {
            newP.textContent = "";
            child = table.rows[i].cells[1].children[0];
            table.rows[i].cells[1].removeChild(child);
            table.rows[i].cells[1].appendChild(newP);
        }
    }
}

function saveInfo() {
    let newP = createElem("p");
    newP.textContent = listOfGroups.options[listOfGroups.selectedIndex].text + ". " + listOfLessons.options[listOfLessons.selectedIndex].text + ".";
    newP.style.textAlign = "left";
    newP.style.margin = "16px";

    changeTable();
    let lessonTopic = document.querySelector(".lesson-topic");
    lessonTopic.setAttribute("readonly", "");
    lessonTopic.style.backgroundColor = "#FBF2E9";
    lessonTopic.style.border = 0;
    lessonTopic.style.outline = "none";

    listOfGroups.setAttribute("disabled", "");
    listOfLessons.setAttribute("disabled", "");

    removeElements(document.querySelectorAll(".save-log-button"));
    let wrapper = document.querySelector(".log");
    wrapper.insertBefore(newP, wrapper.firstChild);
    markedLessons.push(wrapper);
}

function showMarkedLessons() {
    removeElements(document.querySelectorAll(".log"));
    let wrapper = document.getElementById("mainWrapper");
    markedLessons.forEach(ms => wrapper.appendChild(ms));
}

// Задание 6 

// Создать html-страницу с возможностью забронировать билеты на поезд. Для начала пользователь выбирает направление поезда и дату поездки, дальше отмечает места для брони. Также добавить возможность посмотреть уже забронированные билеты. Хранить информацию в заранее подготовленных массивах.

// P.s. функцию резервации мест с последующим запоминанием по направлению и дате не делал, т.к. в ТЗ такого не было.

const directions = ["Москва-Гомель", "Минск-Гомель", "Киев-Минск", "Гомель-Витебск", "Гомель-Гродно"];
const countOfSeats = 28;
const countOfSeatsInOneSection = 4;
let listOfDirections = null;
let orderedTicketArr = [];
let orderedTicketTableDiv = null;

function bodyLoad() {
    listOfGroups = document.getElementById("dropdownListOfGropus");
    listOfLessons = document.getElementById("dropdownListOfLessons");
    listOfDirections = document.getElementById("listOfDirections");
    let newOption = null;

    groups.forEach(g => {
        newOption = createElem("option");
        newOption.textContent = g;
        listOfGroups.appendChild(newOption);
    });

    lessons.forEach(l => {
        newOption = createElem("option");
        newOption.textContent = l;
        listOfLessons.append(newOption);
    });

    directions.forEach(d => {
        newOption = createElem("option");
        newOption.textContent = d;
        listOfDirections.appendChild(newOption);
    });
}

function createSection(numOfSeat, table, seatPrice) {
    let td1 = null;
    let td2 = null;
    let cb1 = null;
    let cb2 = null;
    let tr = null;

    for (let i = 0; i < 2; i++) {
        tr = createElem("tr");
        td1 = createElem("td");
        cb1 = createElem("input");
        cb1.setAttribute("type", "checkbox");
        cb1.setAttribute("value", seatPrice);
        td1.innerHTML = (i === 0 ? numOfSeat : --numOfSeat);
        td1.appendChild(cb1);
        td2 = createElem("td");
        cb2 = createElem("input");
        cb2.setAttribute("type", "checkbox");
        cb2.setAttribute("value", seatPrice);
        td2.innerHTML = numOfSeat += 2;
        td2.appendChild(cb2);
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
    }
}

function showTrainSeats() {
    if (!document.getElementById("dateOfTrip").value) {
        alert("Необходимо указать дату отправления!");
        return;
    }
    let seatPrice = 62;
    removeElements(document.querySelectorAll(".ordered-tickets"));
    removeElements(document.querySelectorAll(".seats"));
    let orderedSeats = [];
    let totalPrice = 0;
    let wrapDiv = createElem("div");
    wrapDiv.setAttribute("class", "seats");

    let mainTable = createElem("table");
    mainTable.setAttribute("class", "train-seats");
    mainTable.setAttribute("cellspacing", "3");

    let mainTableTr = createElem("tr");

    let wrapTd = null;
    let table = null;
    let j = 1;
    for (let i = 0; i < countOfSeats / countOfSeatsInOneSection; i++) {
        wrapTd = createElem("td");
        table = createElem("table");
        table.setAttribute("cellspacing", "1");
        createSection(j, table, seatPrice);
        j += countOfSeatsInOneSection;
        seatPrice -= 4;
        wrapTd.appendChild(table);
        mainTableTr.appendChild(wrapTd);
    }
    let pTotalCost = createElem("p");
    pTotalCost.textContent = "Итоговая стоимость: 0$";
    pTotalCost.setAttribute("class", "totalPrice");
    let buttonOrder = createElem("input");
    buttonOrder.setAttribute("type", "button");
    buttonOrder.setAttribute("value", "Заказать");
    buttonOrder.setAttribute("class", "ticket-order-button");

    mainTable.appendChild(mainTableTr);
    wrapDiv.appendChild(mainTable);
    wrapDiv.appendChild(pTotalCost);
    wrapDiv.appendChild(buttonOrder);
    let mainDiv = document.querySelector(".ticket-market-wrapper");
    mainDiv.appendChild(wrapDiv);

    Array.from(document.querySelector(".train-seats").querySelectorAll("input[type=checkbox]")).forEach(i => i.addEventListener("click", function(el) {
        let p = document.querySelector(".totalPrice");
        if (el.target.checked) {
            orderedSeats.push(+el.target.previousSibling.textContent);
            totalPrice += +el.target.value;
            p.textContent = `Итоговая стоимость: ${totalPrice}$.`;
        } else {
            orderedSeats.splice(orderedSeats.indexOf(+el.target.previousSibling.textContent), 1);
            totalPrice -= +el.target.value;
            p.textContent = `Итоговая стоимость: ${totalPrice}$.`;
        }
    }));

    document.querySelector(".ticket-order-button").addEventListener("click", () => {
        removeElements(document.querySelectorAll(".seats"));
        showOrderedTicketsInfo(listOfDirections.options[listOfDirections.selectedIndex].text, document.getElementById("dateOfTrip").value.split("-").reverse().join("."), orderedSeats);
    })
}

function createOrderedTicketTable(direction, date, seats) {
    let newTable = createElem("table");
    newTable.setAttribute("class", "ordered-tickets-table");

    let newCaption = createElem("caption");
    newCaption.textContent = "Мои билеты";
    newTable.appendChild(newCaption);

    let tr = createElem("tr");
    let th1 = createElem("th");
    th1.textContent = "Маршрут";
    let th2 = createElem("th");
    th2.textContent = "Дата отправления";
    let th3 = createElem("th");
    th3.textContent = "Места, №";
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    newTable.appendChild(tr);

    tr = createElem("tr");
    let td1 = createElem("td");
    td1.textContent = direction;
    let td2 = createElem("td");
    td2.textContent = date;
    let td3 = createElem("td");
    td3.textContent = seats;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    newTable.appendChild(tr);
    return newTable;
}

function addOrderedTicket(direction, date, seats, mainDiv) {
    let table = orderedTicketTableDiv.querySelector(".ordered-tickets-table");
    let tr = createElem("tr");
    let td1 = createElem("td");
    td1.textContent = direction;
    let td2 = createElem("td");
    td2.textContent = date;
    let td3 = createElem("td");
    td3.textContent = seats;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    table.appendChild(tr);
    mainDiv.appendChild(orderedTicketTableDiv);
}

function showOrderedTicketsInfo(direction, date, seats) {
    let mainDiv = document.querySelector(".ticket-market-wrapper");
    if (orderedTicketTableDiv != null) {
        addOrderedTicket(direction, date, seats, mainDiv);
    } else {
        let newDiv = createElem("div");
        newDiv.setAttribute("class", "ordered-tickets");
        newDiv.appendChild(createOrderedTicketTable(direction, date, seats));
        mainDiv.appendChild(newDiv);
        orderedTicketTableDiv = newDiv;
    }
}