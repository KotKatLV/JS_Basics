"use strict"

//Задание 1

// Создать html-страницу с трекбаром. Предоставить пользователю возможность изменять положение синего указателя.
// P.s. Сделано с помощью HTML5 + CSS3.

// Задание 2

// Создать html-страницу с галереей.

let imgSrcArr = ["Img/css.png", "Img/html.png", "Img/js.png", ];
let imgAltArr = ["CSS3", "HTML5", "JS"];
let rightButton = document.getElementById("rightButton");
let leftButton = document.getElementById("leftButton");
let curImg = document.getElementById("main-pic");
let currentImgIndex = 0;

function back() {
    if (currentImgIndex > 0) {
        rightButton.style.visibility = "visible";
        curImg.setAttribute("src", imgSrcArr[--currentImgIndex]);
        curImg.setAttribute("alt", imgAltArr[currentImgIndex]);
    }

    if (currentImgIndex <= 0) {
        leftButton.style.visibility = "hidden";
    }
}

function next() {
    if (currentImgIndex < imgSrcArr.length - 1) {
        leftButton.style.visibility = "visible";
        curImg.setAttribute("src", imgSrcArr[++currentImgIndex]);
        curImg.setAttribute("alt", imgAltArr[currentImgIndex]);
    }

    if (currentImgIndex >= imgSrcArr.length - 1) {
        rightButton.style.visibility = "hidden";
    }
}

// Задание 3

// Создать html-страницу с блоками информации, которые от-крываются по щелчку на заголовок. В один момент времени может быть развернут только один блок информации.

let headTextMap = new Map();
headTextMap.set("Заголовок 1", "Информация заголовка 1");
headTextMap.set("Заголовок 2", "Информация заголовка 2");
headTextMap.set("Заголовок 3", "Информация заголовка 3");
headTextMap.set("Заголовок 4", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, voluptatum totam eveniet voluptatem delectus eum recusandae quia odit distinctio unde, maxime nobis placeat sint id debitis officiis dolorem deserunt praesentium.Iusto assumenda consectetur omnis, eveniet rerum mollitia excepturi veritatis fugiat, asperiores illum sint maiores commodi! Qui, enim ipsum. Mollitia dignissimos eveniet dicta quis velit veritatis commodi, alias et atque nihil?Totam est ad neque omnis maiores vero voluptas earum quidem blanditiis quae? Distinctio saepe aperiam pariatur, nulla fugit id aspernatur neque expedita. Voluptatem harum rerum nesciunt fugiat accusamus aliquid ut!Non voluptatibus ipsam et! Saepe, commodi repellendus nisi dolorem modi officiis enim nemo consectetur fugit magni blanditiis quidem consequatur similique reprehenderit eum dolor facilis reiciendis maiores optio sequi voluptas rem.Qui illo unde quos rerum sint nulla maiores repellat ut omnis accusantium placeat modi corrupti non, impedit velit quasi autem laudantium rem veniam quibusdam, in assumenda? Nihil quod eligendi iste.Exercitationem dolorum nihil magnam at voluptate soluta sunt fuga, voluptates aliquid similique ratione, odit doloribus eos voluptatum quam error consequuntur delectus nulla deserunt? Quia veritatis inventore earum, rerum illum impedit.Recusandae modi sit obcaecati eaque quam est iste, repellendus veritatis maiores molestiae dolorum veniam aliquid magni officiis natus? Odit dolorem sed quasi. Eaque dolores aliquam rem eius esse fugiat quae?Temporibus commodi voluptate ratione a quisquam, quas dolorem labore reprehenderit odit voluptates voluptatum quaerat ducimus officiis, nobis repellat eos ad cumque nihil ipsam. Quisquam nostrum nam voluptatibus optio. Itaque, sint?Quae expedita velit rerum nam, cumque, soluta odit autem cum eos veniam nulla totam! Magni, rem veniam praesentium, eum molestiae quasi qui ducimus iure, nulla natus quae. Non, odio assumenda.Id earum exercitationem placeat eveniet nam nobis nisi mollitia. Ex molestias debitis commodi praesentium tempore, cumque voluptates officiis tenetur veritatis minima. Beatae quibusdam nemo sit in accusamus aliquid inventore quis.");

const styleClass = "text-p";
const removeElements = (elms) => elms.forEach(e => e.remove());

function headerClick(element) {
    if (element.parentElement.children.length > 1) {
        removeElements(document.querySelectorAll(`.${styleClass}`));
    } else {
        removeElements(document.querySelectorAll(`.${styleClass}`));
        let newPar = document.createElement("p");
        newPar.setAttribute("class", styleClass);
        newPar.innerHTML = headTextMap.get(element.textContent);
        element.parentElement.append(newPar);
    }
}

// Задание 4

// Создать html-страницу с новостями.
// Необходимо отлавливать, когда скролл доходит до конца страницы, и догружать еще новости в список. Новости для подгрузки хранить в заранее подготовленном массиве.

let newsData = new Map();
newsData.set("Заголовок новости 4", "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem sequi repellendus obcaecati necessitatibus maxime? Quisquam quos dolorum nihil corporis obcaecati libero, temporibus, omnis quae rem placeat perferendis ullam numquam. Animi?");
newsData.set("Заголовок новости 5", "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem sequi repellendus obcaecati necessitatibus maxime? Quisquam quos dolorum nihil corporis obcaecati libero, temporibus, omnis quae rem placeat perferendis ullam numquam. Animi?");
newsData.set("Заголовок новости 6", "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem sequi repellendus obcaecati necessitatibus maxime? Quisquam quos dolorum nihil corporis obcaecati libero, temporibus, omnis quae rem placeat perferendis ullam numquam. Animi?");
let keysIter = newsData.keys();
let valuesIter = newsData.values();

const isScrollbarAtBottom = (element) => element.offsetHeight + element.scrollTop >= element.scrollHeight;

function LoadNews(element) {
    if (isScrollbarAtBottom(element)) {
        let newDiv = document.createElement("div");
        let newPHeader = document.createElement("p");
        let newPText = document.createElement("p");

        newPHeader.textContent = keysIter.next().value;
        newPHeader.style.fontWeight = "bold";
        newPText.textContent = valuesIter.next().value;

        newDiv.appendChild(newPHeader);
        newDiv.appendChild(newPText);
        element.appendChild(newDiv);
    }
}

// Задание 5

// Создать html-страницу, на которой пользователь может ввести номер месяца, год, и получить календарь на указанный месяц.

function createMonthTable() {
    let str = `<table class="month-table"> <tr> <th>Пн</th> <th>Вт</th> <th>Ср</th> <th>Чт</th> <th>Пт</th> <th>Сб</th> <th>Вск</th> `;
    for (let i = 0; i < 5; i++) {
        str += `<tr>`
        for (let j = 0; j < 7; j++) {
            str += `<td></td>`
        }
        str += `</tr>`
    }
    str += `</table>`
    return str;
}

function fillInTable(table, countOfDays, firstDay) {
    for (let i = 1, d = 1; i < 6; i++) {
        for (let j = firstDay; j < 7; j++) {
            if (d === countOfDays + 1) {
                return;
            }
            table.rows[i].cells[j].innerHTML = d++;
        }
        firstDay = 0;
    }
}

function createCalendar() {
    let date = new Date();
    let userMonth = document.getElementById("userMonth").value;
    let userYear = document.getElementById("userYear").value;

    if (userMonth < 1 || userMonth > 12 || userYear > date.getFullYear() || userYear < 1970) {
        alert("Неверно введены данные!");
        document.getElementById("userMonth").value = "";
        document.getElementById("userYear").value = "";

    } else {
        removeElements(document.querySelectorAll(`.month-table`));
        document.getElementById("monthCalendar").innerHTML += createMonthTable();
        fillInTable(document.getElementsByClassName("month-table")[0], new Date(userYear, --userMonth + 1, 0).getDate(), new Date(userYear, userMonth, 1).getDay() - 1);
    }
}