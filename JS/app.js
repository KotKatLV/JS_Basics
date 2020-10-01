"use strict";

// Задание 1

// Создать html-страницу со списком ссылок. Ссылки на внешние источники (которые начинаются с http://) необходимо подчеркнуть пунктиром. Искать такие ссылки в списке и устанавливать им дополнительные стили необходимо с помощью JS.

let ref = Array.from(document.querySelectorAll('#ul-references>li>a'));
ref.forEach(a => {
    if (a.innerHTML.search(/[https:]\/\//) !== -1) {
        a.style.borderBottom = "1px dashed #000080";
    }
});

// Задание 2

// Создать html-страницу с деревом вложенных директорий.При клике на элемент списка, он должен сворачиваться или
// разворачиваться.При наведении на элемент, шрифт должен становится жирным(с помощью CSS).

for (let li of tree.querySelectorAll('li')) {
    let span = document.createElement('span');
    li.prepend(span);
    span.append(span.nextSibling);
}

tree.onclick = function(event) {
    if (event.target.tagName !== 'SPAN') {
        return;
    }
    let childrenContainer = event.target.parentNode.querySelector('ul');
    if (!childrenContainer) return;
    childrenContainer.hidden = !childrenContainer.hidden;
}

// Задание 3

// Создать html-страницу со списком книг. При щелчке на элемент, цвет текста должен меняться на оранжевый. При повторном щелчке на другую книгу, предыдущей необходимо возвращать прежний цвет.Если при клике мышкой была зажата клавиша Ctrl, то элемент добавляется / удаляется из выделенных.Если при клике мышкой была зажата клавиша Shift, то к выделению добавляются все элементы в промежутке от предыдущего кликнутого до текущего.

let arrOfLiElems = Array.from(document.querySelectorAll('#books-list>li'));
let changeColor = "orange";

function clearBackColorInOL() {
    arrOfLiElems.forEach(e => e.style.backgroundColor = "unset");
}

function findLastClickedElemIndex() {
    for (let i = arrOfLiElems.length - 1; i >= 0; i--) {
        if (arrOfLiElems[i].style.backgroundColor === changeColor)
            return i;
    }
}

function fillBackColor(leftBorder, rightBorder) {

    if (leftBorder === rightBorder) {
        arrOfLiElems[leftBorder].style.backgroundColor = changeColor;
    }

    for (let i = leftBorder; i < rightBorder - 1; i++) {
        arrOfLiElems[i].style.backgroundColor = changeColor;
    }
}

document.querySelector(".books-list").addEventListener("click", () => {
    let elem = document.querySelector(`.${event.target.className}`);

    if (elem.style.backgroundColor === changeColor) {
        elem.style.backgroundColor = "unset";

    } else if (event.ctrlKey) {
        elem.style.backgroundColor = changeColor;
    } else if (event.shiftKey) {
        if (elem.id < arrOfLiElems.findIndex(e => e.style.backgroundColor === changeColor)) {
            let tmp = arrOfLiElems.findIndex(e => e.style.backgroundColor === changeColor);
            fillBackColor(elem.id, ++tmp)
        } else {
            let lastClicked = findLastClickedElemIndex();
            lastClicked > elem.id ? fillBackColor(elem.id, lastClicked) : fillBackColor(lastClicked, elem.id);
        }
    } else {
        clearBackColorInOL();
        elem.style.backgroundColor = changeColor;
    }
});

// Задание 4 

// Создать html-страницу для отображения / редактирования текста.При открытии страницы текст отображается с помощью тега div.При нажатии Ctrl + E, вместо div появляется textarea с тем же текстом, который теперь можно редактировать.При нажатии Ctrl + S, вместо textarea появляет div с уже измененным текстом.Не забудьте выключить поведение по умолчанию для этих сочетаний клавиш.

document.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.keyCode === 69) {
        e.preventDefault();
        let pText = document.getElementById("sourceText");
        pText.style.visibility = "hidden";
        let textArea = document.createElement("textarea");
        textArea.setAttribute("id", "textArea");
        textArea.style.height = "200px";
        textArea.style.width = "100%";
        textArea.value = pText.innerHTML;
        document.getElementById("div-text").removeChild(pText);
        document.getElementById("div-text").appendChild(textArea);
    } else if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        let textArea = document.getElementById("textArea");
        let pText = document.createElement("p");
        pText.setAttribute("id", "sourceText");
        pText.innerHTML = document.getElementById("textArea").value;
        document.getElementById("div-text").appendChild(pText);
        document.getElementById("div-text").removeChild(textArea);
    }
})

//Задание 5

// Создать html-страницу с большой таблицей.
// При клике по заголовку колонки, необходимо отсортировать данные по этой колонке.Например: на скриншоте люди отсортированы по возрасту. Учтите, что числовые значения должны сортироваться как числа, а не как строки.

function headerClick(event) {
    let arr = [];
    let table = document.getElementById("table");

    for (let i = 1; i < table.rows.length; i++) {
        arr.push(table.rows[i].cells[event.cellIndex].innerHTML);
    }

    arr.sort((x, y) => x < y ? -1 : 1)

    for (let i = 1, j = 0; i < table.rows.length; i++, j++) {
        table.rows[i].cells[event.cellIndex].innerHTML = arr[j];
    }
}