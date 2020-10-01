// Мой apikey
const apiKey = "80b87e96";

// последний отображенный элемент из 9
let indexOfLastShowedDiv = 0;

// Номер страницы
let currentPageNumber = 1;

let divs = [];
let buttons = [];
let countOfPages = 0;

function searchMovie() {
    if ($("#titleInput").val() !== "") {
        $.getJSON(`http://www.omdbapi.com/?s=${$("#titleInput").val().replace(" ", "+")}&apikey=${apiKey}&type=${$("#typelist").children("option:selected").val()}&page=${currentPageNumber}`, function(data) {
            if (data.Search !== undefined) {
                updateStartValues();
                countOfPages = Math.ceil(data.totalResults / 10);

                for (let i = 0; i < data.Search.length; i++) {
                    divs.push(createFilmDiv(data.Search[i].Poster, data.Search[i].Title, data.Search[i].Type, data.Search[i].Year, data.Search[i].imdbID));
                };

                showFilmDivs();
            } else {
                alert("Film not found!");
            }
        });

    } else {
        alert("Enter movie title!");
    };
}

function updateStartValues() {
    $(".films-main-wrapper").empty();
    // $(".pagination").remove();
    $(".film-description-wrapper").remove();
    divs.length = 0;
    indexOfLastShowedDiv = 0;
}

function detailsButtonClicked() {
    $.getJSON(`http://www.omdbapi.com/?i=${event.target.value}&apikey=${apiKey}&plot=short`, function(data) {
        if ($(".film-description-wrapper").length > 0) {
            $(".film-description-wrapper").replaceWith(createFilmDescriptionDiv(data));
        } else {
            $(".main-wrapper").append(createFilmDescriptionDiv(data));
        }
    });
}

function createFilmDiv(postSrc, title, type, year, imdbId) {
    let mainDiv = $("<div>").attr("class", "film-wrapper");
    let firstDiv = $("<div>").attr("class", "poster-img-wrapper").append($("<img>").attr({
        "class": "poster-img",
        "src": postSrc
    })).appendTo(mainDiv);

    let secondDiv = $("<div>").attr("class", "description").append($("<p>").text(type)).append($("<p>").text(title)).append($("<p>").text(year)).append($("<button>").text("Details").val(imdbId).attr("class", "details-button")).click(function(event) {
        detailsButtonClicked(event);
    }).appendTo(mainDiv);

    return mainDiv;
};

function createPagDiv() {
    let div = $("<div>").attr("class", "pagination");
    let innerElems = $(`<button class="previous">&laquo;</button><button>1</button><button>2</button><button>3</button><button>4</button><button>5</button><button class="next">&raquo;</button>`).appendTo(div);
    div.appendTo($(".main-wrapper"));

    buttons = $(".pagination > button").filter(`:not([class="previous"])`).filter(`:not([class="next"])`);

    $(".pagination > button").filter(`:not([class="previous"])`).filter(`:not([class="next"])`).click(function() {
        currentPageNumber = +$(this).text();
        searchMovie();
    });

    $(".pagination button").first().on("click", function() {
        if (+buttons[0].textContent == 1) return;

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].textContent = +buttons[i].textContent - 5;
            $(buttons[i]).css("visibility", "visible");
        }
    });

    $(".pagination button").last().on("click", function() {
        if (+buttons[4].textContent == countOfPages)
            return;

        for (let i = 0; i < buttons.length; i++) {
            if (+buttons[4].textContent + i + 1 <= countOfPages) {
                buttons[i].textContent = +buttons[4].textContent + i + 1;
            } else {
                $(buttons[i]).css("visibility", "hidden");
            };
        };
    });
}

function updateFilmDiv(jsonElem) {
    if (jsonElem.length == divs.length) {
        for (let i = 0; i < jsonElem.length; i++) {
            newDiv = createFilmDiv(jsonElem[i].Poster, jsonElem[i].Title, jsonElem[i].Type, jsonElem[i].Year, jsonElem[i].imdbID);
            divs[i].replaceWith(newDiv);
            divs[i] = newDiv;
        };
    } else {
        divs = [];
        for (let i = 0; i < jsonElem.length; i++) {
            divs[i].push(createFilmDiv(jsonElem[i].Poster, jsonElem[i].Title, jsonElem[i].Type, jsonElem[i].Year, jsonElem[i].imdbID));
        };
    }
}

function showFilmDivs() {

    if (divs.length > 3) {
        $(".films-main-wrapper").append($("<img>").attr({
            "class": "leftArrowPict",
            "src": "Img/leftArrow.png",
            "title": "back"
        }).click(function() {
            if (indexOfLastShowedDiv == 2) {
                return;
            } else {
                if (indexOfLastShowedDiv % 3 == 0) {
                    indexOfLastShowedDiv -= 1;
                } else {
                    indexOfLastShowedDiv = indexOfLastShowedDiv - (indexOfLastShowedDiv % 3) - 1;
                }

                $(".films-main-wrapper > div").remove();
                for (let i = 0; i < 3; i++) {
                    $(".films-main-wrapper img:eq(0)").after(divs[indexOfLastShowedDiv]);
                    $(`.${divs[indexOfLastShowedDiv--][0].className} button`).click(function(event) {
                        detailsButtonClicked(event);
                    });
                }
                indexOfLastShowedDiv += $(".films-main-wrapper > div").length;
            }
        }));

        for (let i = 0; i < 3; i++) {
            $(".films-main-wrapper").append(divs[indexOfLastShowedDiv++]);
        }
        --indexOfLastShowedDiv;

        $(".films-main-wrapper").append($("<img>").attr({
            "class": "rightArrowPict",
            "src": "Img/rightArrow.png",
            "title": "next"
        }).click(function() {
            if (indexOfLastShowedDiv >= divs.length - 1) {
                return;
            } else {
                $(".films-main-wrapper > div").remove();
                for (let i = 0; i < 3; i++) {
                    if (indexOfLastShowedDiv == divs.length - 1) {
                        $(".films-main-wrapper img:eq(0)").after(divs[indexOfLastShowedDiv]);
                        $(`.${divs[indexOfLastShowedDiv][0].className} button`).click(function(event) {
                            detailsButtonClicked(event);
                        });
                    } else {
                        $(".films-main-wrapper img:eq(0)").after(divs[++indexOfLastShowedDiv]);
                        $(`.${divs[indexOfLastShowedDiv][0].className} button`).click(function(event) {
                            detailsButtonClicked(event);
                        });
                    }
                }
            }
        }));

        if ($(".pagination").length == 0) {
            createPagDiv();
        }

    } else {
        for (let i = 0; i < divs.length; i++) {
            $(".films-main-wrapper").append(divs[indexOfLastShowedDiv++]);
        }
    }
}

function createFilmDescriptionDiv(object) {
    let mainDiv = $("<div>").attr("class", "film-description-wrapper");
    let firstDiv = $("<div>").attr("class", "film-description-img").append($("<img>").attr({
        "src": object.Poster,
        "alt": object.Title
    }));

    mainDiv.append(firstDiv).append(createFilmDescrTable(object));
    return mainDiv;
}

function createFilmDescrTable(film) {
    let secondDiv = $("<div>").attr("class", "full-film-description");
    let table = $("<table>").attr("class", "table");
    table.append($("<tr>").append($("<td>").append($("<b>").text("Title"))).append($("<td>").text(film.Title)));
    table.append($("<tr>").append($("<td>").append($("<b>").text("Released"))).append($("<td>").text(film.Released)));
    table.append($("<tr>").append($("<td>").append($("<b>").text("Genre"))).append($("<td>").text(film.Genre)));
    table.append($("<tr>").append($("<td>").append($("<b>").text("Country"))).append($("<td>").text(film.Country)));
    table.append($("<tr>").append($("<td>").append($("<b>").text("Director"))).append($("<td>").text(film.Director)));
    table.append($("<tr>").append($("<td>").append($("<b>").text("Writer"))).append($("<td>").text(film.Writer)));
    table.append($("<tr>").append($("<td>").append($("<b>").text("Actors"))).append($("<td>").text(film.Actors)));
    table.append($("<tr>").append($("<td>").append($("<b>").text("Awards"))).append($("<td>").text(film.Awards)));
    secondDiv.append(table);
    return secondDiv;
}