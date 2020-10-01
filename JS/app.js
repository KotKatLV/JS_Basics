 const imgArr = ["Img/Wood/1.jpg", "Img/Wood/2.jpg", "Img/Wood/3.jpg", "Img/Wood/4.jpg", "Img/Wood/5.jpg"];
 let currentImg = 0;
 let intervalId = 0;

 $(document).ready(function() {
     $(".circles-div div:eq(0)").css("background", "#5A4A42");
     $(".buttons #toBegin, #prev").css("filter", "opacity(25%)");
 });

 function getFirstImg() {
     checkSituation(0);
     $(".circles-div div").css("background", "white")
     $(`.circles-div #${1}`).css("background", "#5A4A42");
     $(".img-div img").attr("src", `${imgArr[0]}`);
 }

 function getPrevImg() {
     if (currentImg === 0) {
         return;
     } else {
         $(".circles-div div").css("background", "white")
         $(`.circles-div #${currentImg}`).css("background", "#5A4A42");
         $(".img-div img").fadeOut(1000, function() {
             $(".img-div img").attr("src", `${imgArr[--currentImg]}`);
             checkSituation(currentImg);
         }).fadeIn(1000);
     }
 }

 function startSilde() {
     if (currentImg === imgArr.length - 1) {
         return;
     } else {
         let tmp = $(".buttons #play img").attr("src");
         if (tmp.includes("Img/Nav/stop.jpg")) {
             clearInterval(intervalId);
             $(".buttons #play img").attr("src", "Img/Nav/play.jpg");
             if (currentImg === imgArr.length - 1) {
                 $(".buttons #play").css("filter", "opacity(25%)");
             }
         } else {
             $(".buttons #play img").attr("src", "Img/Nav/stop.jpg");
             intervalId = setInterval(getNextImg, 4000);
         }
     }
 }

 function getNextImg() {
     if (currentImg === imgArr.length - 1) {
         $(".buttons #play img").attr("src", "Img/Nav/play.jpg");
         $(".buttons #play").css("filter", "opacity(25%)");
         clearInterval(intervalId);
         return;
     } else {
         $(".circles-div div").css("background", "white")
         $(`.circles-div #${currentImg+=2}`).css("background", "#5A4A42");
         $(".img-div img").fadeOut(1000, function() {
             $(".img-div img").attr("src", `${imgArr[--currentImg]}`);
             checkSituation(currentImg);
         }).fadeIn(2000);
     }
 }

 function getLastImg() {
     checkSituation(imgArr.length - 1);
     $(".circles-div div").css("background", "white")
     $(`.circles-div #${imgArr.length}`).css("background", "#5A4A42");
     $(".img-div img").attr("src", `${imgArr[imgArr.length - 1]}`);
 }

 function setImg(event) {
     checkSituation(event.id - 1);
     $(".circles-div div").css("background", "white")
     $(`.circles-div #${event.id}`).css("background", "#5A4A42");
     $(".img-div img").fadeOut(1000, function() {
         $(".img-div img").attr("src", `${imgArr[currentImg]}`);
     }).fadeIn(1000);
 }

 function checkSituation(id) {
     currentImg = id;
     if (currentImg === 0) {
         $(".buttons #toBegin, #prev, #play").css("filter", "opacity(25%)");
     }

     if (currentImg > 0) {
         $(".buttons #toBegin, #prev, #play").css("filter", "");
     }

     if (currentImg === imgArr.length - 1) {
         $(".buttons #toEnd, #next, #play").css("filter", "opacity(25%)");
     }

     if (currentImg < imgArr.length - 1) {
         $(".buttons #toEnd, #next, #play").css("filter", "");
     }
 }

 function openModal() {
     $("#myModal").css("display", "block");
     $("#img01").attr("src", imgArr[currentImg]);
     $(".close").click(function() {
         $("#myModal").css("display", "none");
     });
 }