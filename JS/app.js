"use strict"

// Задание 1

// Реализовать класс, описывающий окружность. В классе должны быть следующие компоненты:
class Circle {

    //поле, хранящее радиус окружности
    constructor(radius) {
        this.radius = radius;
    }

    // get-свойство, возвращающее радиус окружности
    get getRadius() {
        return this.radius;
    }

    // set-свойство, устанавливающее радиус окружности
    set setRadius(radius) {
        this.radius = radius;
    }

    // get-свойство, возвращающее диаметр окружности
    get getDiameter() {
        return 2 * this.getRadius;
    }

    // метод, вычисляющий площадь окружности
    calcAreaCircle() {
        return Math.PI * this.getRadius * this.getRadius;
    }

    // метод, вычисляющий длину окружности
    calcCircumference() {
        return 2 * Math.PI * this.getRadius * this.getRadius;
    }
}

// Продемонстрировать работу свойств и методов
let circle1 = new Circle(12);
console.log(`Радиус окружности: ${circle1.getRadius}, диаметр: ${circle1.getDiameter}, площадь: ${(circle1.calcAreaCircle()).toFixed(2)}, длина: ${(circle1.calcCircumference()).toFixed(2)}`);

// Задание 2

// Реализовать класс, описывающий html элемент. Класс HtmlElement должен содержать внутри себя:

class HtmlElement {

    // название тега, самозакрывающийся тег или нет, текстовое содержимое, массив атрибутов, массив стилей, массив вложенных таких же тегов
    constructor(tagName, isSelfClosing) {
        this.tagName = String(tagName);
        this.isSelfClosing = isSelfClosing;
        this.innerText = "";
        this.attributes = new Map();
        this.styles = new Map();
        this.htmlString = "";
    }

    // метод для установки атрибута
    setAttribute(attributeName, attributeValue) {
        this.attributes.set(attributeName, attributeValue);
    }

    // метод для установки стиля
    setStyle(styleName, styleValue) {
        this.styles.set(styleName, styleValue);
    }

    // метод для добавления вложенного элемента в конец текущего элемента;
    addElementToTheEnd(element) {
        this.innerText += " " + element.getHtml();
    }

    //метод для добавления вложенного элемента в начало текущего элемента
    addElementToTheBeginning(element) {
        this.innerText = element.getHtml() + " " + this.getHtml();
    }

    getHtml() {

        if (this.htmlString.length > 0)
            return this.htmlString;

        let style = "";
        let attribute = "";

        this.styles.forEach((value, key) => style += key + value);
        this.attributes.forEach((value, key) => attribute += key + value);

        if (this.styles.size > 0) {
            this.isSelfClosing ? this.htmlString = `<${this.tagName} style="${style}" ${attribute}>` : this.htmlString = `<${this.tagName} style="${style}" ${attribute}>${this.innerText}</${this.tagName}>`;
        } else {
            this.isSelfClosing && this.styles.size > 0 ? this.htmlString = `<${this.tagName} ${attribute}>` : this.htmlString = `<${this.tagName} ${attribute}>${this.innerText}</${this.tagName}>`;
        }

        return this.htmlString;
    }
}

// Раскомментировать для проверки результата 2 задания
{
    // let wrapper = new HtmlElement("div", false);
    // wrapper.setAttribute(`id = `, `"wrapper"`);
    // wrapper.setStyle("display: ", "flex;");

    // let a_1 = new HtmlElement("a", false);
    // a_1.setAttribute("href = ", `"https://www.lipsum.com/" `);
    // a_1.setAttribute("target = ", `"_blank"`);
    // a_1.innerText = "More...";

    // let par_1 = new HtmlElement("p", false);
    // par_1.setStyle("text-align: ", "justify;");
    // par_1.innerText = "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Consequatur accusamus sequi laudantium eaque soluta in nisi, enim natus dolores illum quis dicta consectetur molestiae repellendus perspiciatis eveniet, debitis eum.Amet.Soluta commodi esse istemagni facilis possimus ad dicta reprehenderit laudantium ? Veritatis quis, quidem architecto delectus tempora sapiente ? Accusantium et perspiciatis fugit libero sed hic veniam commodi pariatur totam porro.Laborum iusto labore quis inventore quo! Molestiaefacilis perspiciatis illum sequi id iste quisquam maiores nam laborum nulla! Quidem pariatur accusantium tempora enim, earum aliquid obcaecati cupiditate modi nostrum ad.Quam doloremque magni soluta ? Eveniet, temporibus ipsum ex vitae veritatis mollitia.";
    // par_1.addElementToTheEnd(a_1);

    // let img = new HtmlElement("img", true);
    // img.setStyle("width: ", "100%");
    // img.setAttribute("src = ", `"Images/004_lorem.jpg "`);
    // img.setAttribute("alt = ", `"Lorem Ipsum"`);

    // let h3 = new HtmlElement("h3", false);
    // h3.innerText = "What is Lorem Ipsum?"

    // let div2 = new HtmlElement("div", false);
    // div2.setStyle("width: ", "300px;");
    // div2.setStyle("margin: ", "10px;");

    // div2.addElementToTheEnd(h3);
    // div2.addElementToTheEnd(img);
    // div2.addElementToTheEnd(par_1);
    // wrapper.addElementToTheEnd(div2);
    // wrapper.addElementToTheEnd(div2);

    // document.write(wrapper.getHtml());
}

// Задание 3

// Реализовать класс, который описывает css класс. Класс CssClass должен содержать внутри себя
class CSSClass {
    constructor(className) {
        // название css класса;
        this.className = className;

        // массив стилей
        this.styles = new Map();
    }

    // метод для установки стиля
    setStyle(styleName, styleValue) {
        this.styles.set(styleName, styleValue);
    }

    // метод для удаления стиля
    delStyle(styleName) {
        this.styles.delete(styleName);
    }

    // метод getCss(), который возвращает css код в виде стро-ки.
    getCSS() {
        let style = "";
        this.styles.forEach((value, key) => style += key + value + "\n" + " ");
        return `.${this.className} {\n ${style.trim()} \n}`;
    }
}

// Задание 4

// Реализовать класс, описывающий блок html документ. Класс HtmlBlock должен содержать внутри себя:
class HTMLBlock {
    constructor(css, html) {
        this.CSS = css;
        this.HTML = html;
    }

    getCode() {
        let styles = "<style>";
        this.CSS.forEach(styleClass => styles += styleClass.getCSS() + "\n");
        styles += "</style>";
        return styles + this.HTML.getHtml();
    }
}

let wrapClass = new CSSClass("wrap");
wrapClass.setStyle("display:", " flex;");

let blockClass = new CSSClass("block");
blockClass.setStyle("width:", " 300px;");
blockClass.setStyle("margin:", " 10px;");

let imgClass = new CSSClass("img");
imgClass.setStyle("width:", " 100%;");

let textClass = new CSSClass("text");
textClass.setStyle("text-align:", " justify;");

let wrapper = new HtmlElement("div", false);
wrapper.setAttribute(`id = `, `"wrapper"`);
wrapper.setAttribute(`class = `, `"wrap"`)

let a_1 = new HtmlElement("a", false);
a_1.setAttribute(`href = `, `"https://www.lipsum.com/" `);
a_1.setAttribute(`target = `, `"_blank"`);
a_1.innerText = "More...";

let par_1 = new HtmlElement("p", false);
par_1.setAttribute(`class = `, `"text"`);
par_1.innerText = "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Consequatur accusamus sequi laudantium eaque soluta in nisi, enim natus dolores illum quis dicta consectetur molestiae repellendus perspiciatis eveniet, debitis eum.Amet.Soluta commodi esse istemagni facilis possimus ad dicta reprehenderit laudantium ? Veritatis quis, quidem architecto delectus tempora sapiente ? Accusantium et perspiciatis fugit libero sed hic veniam commodi pariatur totam porro.Laborum iusto labore quis inventore quo! Molestiaefacilis perspiciatis illum sequi id iste quisquam maiores nam laborum nulla! Quidem pariatur accusantium tempora enim, earum aliquid obcaecati cupiditate modi nostrum ad.Quam doloremque magni soluta ? Eveniet, temporibus ipsum ex vitae veritatis mollitia.";
par_1.addElementToTheEnd(a_1);

let img = new HtmlElement("img", true);
img.setAttribute(`class = `, `"img"`);
img.setAttribute(`src = `, `"Images/004_lorem.jpg "`);
img.setAttribute(`alt = `, `"Lorem Ipsum"`);

let h3 = new HtmlElement("h3", false);
h3.innerText = "What is Lorem Ipsum?"

let div2 = new HtmlElement("div", false);
div2.setAttribute(`class = `, `"block"`);

div2.addElementToTheEnd(h3);
div2.addElementToTheEnd(img);
div2.addElementToTheEnd(par_1);
wrapper.addElementToTheEnd(div2);
wrapper.addElementToTheEnd(div2);

let htmlBlock = new HTMLBlock([wrapClass, blockClass, imgClass, textClass], wrapper);
document.write(htmlBlock.getCode());