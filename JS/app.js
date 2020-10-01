"use strict";

// Задание 1

// Создать html-страницу для ввода имени пользователя. Необходимо проверять каждый символ, который вводит пользователь.Если он ввел цифру, то не отображать ее в input.
document.forms.inputField.inputName.oninput = () => {
    document.getElementById("inputName").value = document.getElementById("inputName").value.replace(/\d/g, "");
}

// Задание 2

//Создать html-страницу с кнопкой Открыть и модальным окном. На модальном окне должен быть текст и кнопка Закрыть. Изначально модальное окно не отображается.При клике на кнопку Открыть появляется модальное окно, на кнопку Закрыть – исчезает.
document.getElementById("openModalWindow").addEventListener("click", () => {
    document.getElementById("prompt-form-container").style.visibility = "visible";
})

document.getElementById("cancelButton").addEventListener("click", () => {
    document.getElementById("prompt-form-container").style.visibility = "hidden";
})

// Задание 3

// Создать html-страницу с футбольным полем, которое занимает всю ширину и высоту экрана, и мячом размером 100 на 100 пикселей.Сделать так, чтобы при клике мышкой по полю, мяч плавно перемещался на место клика. Учтите: необходимо, чтобы центр мяча останавливался именно там, где был совершен клик мышкой.Также предусмотрите, чтобы мяч не выходил за границы поля.

field.onclick = function(event) {

    let fieldCoords = this.getBoundingClientRect();

    let ballCoords = {
        top: event.clientY - fieldCoords.top - field.clientTop - ball.clientHeight / 2,
        left: event.clientX - fieldCoords.left - field.clientLeft - ball.clientWidth / 2
    };

    if (ballCoords.top < 0) ballCoords.top = 0;

    if (ballCoords.left < 0) ballCoords.left = 0;

    if (ballCoords.left + ball.clientWidth > field.clientWidth) {
        ballCoords.left = field.clientWidth - ball.clientWidth;
    }

    if (ballCoords.top + ball.clientHeight > field.clientHeight) {
        ballCoords.top = field.clientHeight - ball.clientHeight;
    }

    ball.style.left = ballCoords.left + 'px';
    ball.style.top = ballCoords.top + 'px';
}

// Задание 4

// Создать html-страницу со светофором и кнопкой, которая переключает светофор на следующий цвет.

let trafficRound = document.querySelectorAll(".round");
let currentRound = 1;

document.querySelector("#button-next").addEventListener("click", function() {

    switch (currentRound) {
        case 0:
            trafficRound[2].style.backgroundColor = "unset";
            trafficRound[0].style.backgroundColor = "red";
            break;
        case 1:
            trafficRound[0].style.backgroundColor = "unset";
            trafficRound[1].style.backgroundColor = "yellow";
            break;
        case 2:
            trafficRound[1].style.backgroundColor = "unset";
            trafficRound[2].style.backgroundColor = "green";
            break;
    }

    if (currentRound++ === 2) currentRound = 0;
});

// Задание 5

// Создать html-страницу со списком книг. 
// При щелчке на книгу, цвет фона должен меняться на оранжевый. Учтите, что при повторном щелчке на другую книгу, предыдущей – необходимо возвращать прежний цвет.

function clearBackColorInOL() {
    Array.from(document.querySelectorAll('#books-list>li')).forEach(e => e.style.backgroundColor = "unset");
}

document.querySelector(".books-list").addEventListener("click", () => {
    let elem = document.querySelector(`.${event.target.className}`);
    if (elem.style.backgroundColor === "orange") {
        elem.style.backgroundColor = "unset";

    } else {
        clearBackColorInOL();
        elem.style.backgroundColor = "orange";
    }
});

// Задание 6

// Создать html-страницу с несколькими кнопками.
// При наведении на кнопку, должна появляться подсказка с текстом. По умолчанию – подсказка появляется сверху от кнопки.Но если она не помещается сверху от кнопки, тогда отображается снизу.

let tooltipElem;

document.onmouseover = function(event) {
    let target = event.target;

    let tooltipHtml = target.dataset.tooltip;
    if (!tooltipHtml) return;

    tooltipElem = document.createElement('div');
    tooltipElem.className = 'tooltip';
    tooltipElem.innerHTML = tooltipHtml;
    document.body.append(tooltipElem);

    let coords = target.getBoundingClientRect();

    let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
    if (left < 0) left = 0;

    let top = coords.top - tooltipElem.offsetHeight - 5;
    if (top < 0) {
        top = coords.top + target.offsetHeight + 5;
    }

    tooltipElem.style.left = left + 'px';
    tooltipElem.style.top = top + 'px';
};

document.onmouseout = function() {
    if (tooltipElem) {
        tooltipElem.remove();
        tooltipElem = null;
    }
};