class MovieService {
    constructor() {
        this.apiKey = "80b87e96";
    }

    searchMovie(title, type, page) {
        $.ajax({
            type: "GET",
            url: `http://www.omdbapi.com/?s=${title}&apikey=${this.apiKey}&type=${type}&page=${page}`,
            success: function(data) {
                createFilmsDivs(data.Search);
            }
        });
    }

    getFilmFullDesc(imdbID) {
        $.ajax({
            type: "GET",
            url: `http://www.omdbapi.com/?i=${imdbID}&apikey=${this.apiKey}&plot=short`,
            success: function(data) {
                createModalWindow(data);
            }
        });
    };
}

let ms = new MovieService();
let currentPageNumber = 1;

$(document).ready(function() {
    $(".load-img > img").css("display", "none");
    $(".load-img-more > img").css("display", "none");
})

function hideImg() {
    $(".modal-content > img").hide();
}

function successGetFilmFullDesc() {
    $(".modal").toggleClass("show-modal");
    $(".modal-content img").css("margin-left", "0");
    $(".modal-content").css({
        "width": "650px",
        "height": "410px"
    });
}

function hideLoadImgs() {
    $(".load-img > img").hide();
    $(".load-img-more > img").hide();
}

function createModalWindow(film) {
    successGetFilmFullDesc();
    let imgTitle = $("<div>").attr("class", "img-title").append($("<img>").attr({
        "src": film.Poster
    })).appendTo($(".modal-content"));
    createFilmDescrTable(film).appendTo($(".modal-content"));
    $(".modal").toggleClass("show-modal");
    $(".modal-content > img").hide();
}

function createMoreButton() {
    let div = $("<div>").attr("class", "button-container").append($("<button>").attr("onclick", "loadMore()").text("More"));
    $(".main-wrapper").append(div);
}

function search() {
    if ($("#titleInput").val().length > 0) {
        $(".button-container").remove();
        createMoreButton();
        $(".load-img > img").show();
        currentPageNumber = 1;
        $(".film-search-results").empty();
        ms.searchMovie($("#titleInput").val().replace(" ", "+"), $("#typelist").children("option:selected").val(), 1);
    } else {
        alert("Error! Input filed title is empty!");
    }
}

function createFilmsDivs(films) {

    if (films.length > 0) {
        let flag = $(".film-search-results").length !== 0;
        let filmSearchResDiv = $("<div>").attr("class", "film-search-results");

        for (let i = 0; i < films.length; i++) {
            let div = $("<div>").attr("class", "film-wrapper");
            let titleWrapper = $("<div>").attr("class", "title-wrapper").append($("<img>").attr({
                "src": films[i].Poster,
                "alt": films.Title
            })).appendTo(div);

            let descDiv = $("<div>").attr("class", "description");
            $("<p>").text(films[i].Title).appendTo(div).appendTo(descDiv);
            $("<p>").text(films[i].Year).appendTo(div).appendTo(descDiv);
            $("<button>").attr("class", "button-details").text("Details").val(films[i].imdbID).click(function() {
                $(".modal-content").css({
                    "width": "150px",
                    "height": "40px"
                });
                $(".modal-content img").css("margin-left", "50px");
                $(".modal-content > img").show();
                $(".modal").toggleClass("show-modal");
                ms.getFilmFullDesc(this.value);
            }).appendTo(div).appendTo(descDiv);
            descDiv.appendTo(div);

            flag ? $(".film-search-results").append(div) : filmSearchResDiv.append(div);
        }

        if (!flag) filmSearchResDiv.insertBefore($(".load-img-more"));
        films.length < 10 ? $(".button-container > button").attr("disabled", true) : $(".button-container > button").attr("disabled", false);
        hideLoadImgs();
    }
}

function loadMore() {
    $(".button-container > button").attr("disabled", true)
    $(".load-img-more > img").show();
    ms.searchMovie($("#titleInput").val().replace(" ", "+"), $("#typelist").children("option:selected").val(), ++currentPageNumber);
}

function createFilmDescrTable(film) {
    let secondDiv = $("<div>").attr("class", "description-table");
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

$(".close-button").click(function() {
    $(".modal").toggleClass("show-modal");
    $(".img-title").remove();
    $(".description-table").remove();
});