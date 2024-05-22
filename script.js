 filterSelection("all");
 sizeit();
 makepositions();
 makesizeinshowcase();
 navactive();
 background();
 youtube();

 $('document').ready(function() {

     // $('iframe[src^="https://www.youtube.com/embed/"]').each(function() {
     //     $(this).replaceWith('<div class="js-lazyYT" data-youtube-id="' + $(this).attr("src").split("embed/")[1] + '" data-width="' + $(this).attr("width") + '" data-height="' + $(this).attr("height") + '"></div>');
     // });
     // $('.js-lazyYT').lazyYT();
 });


 window.addEventListener("resize", function() {
     sizeit();
     makepositions();
     makesizeinshowcase();
     background();
 });



 $("a[href^=http").prop("target", "_blank");

 function youtube() {
     $('iframe[src^="https://www.youtube.com/embed/"]').each(function() {
         $(this).replaceWith('<div width="560" height="315" class="embed-youtube" data-video-id="' + $(this).attr("src").split("embed/")[1] + '"><div class="embed-youtube-play"></div></div>');
     });
     let YouTubeContainers = document.querySelectorAll(".embed-youtube");

     // Iterate over every YouTube container 
     for (let i = 0; i < YouTubeContainers.length; i++) {
         let container = YouTubeContainers[i];
         let imageSource = "https://img.youtube.com/vi/" + container.dataset.videoId + "/sddefault.jpg";

         // Load the Thumbnail Image asynchronously
         let image = new Image();
         image.src = imageSource;
         image.addEventListener("load", function() {
             container.appendChild(image);
         });

         // When the user clicks on the container, load the embedded YouTube video
         container.addEventListener("click", function() {
             let iframe = document.createElement("iframe");

             iframe.setAttribute("frameborder", "0");
             iframe.setAttribute("allowfullscreen", "");
             iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
             // Important: add the autoplay GET parameter, otherwise the user would need to click over the YouTube video again to play it 
             iframe.setAttribute("src", "https://www.youtube.com/embed/" + this.dataset.videoId + "?rel=0&showinfo=0&autoplay=1");

             // Clear Thumbnail and load the YouTube iframe
             this.innerHTML = "";
             this.appendChild(iframe);
         });
     }
 }

 function togglenav() {
     $("#scrollbox").toggleClass("shown");

 }

 var cards = document.getElementsByClassName("box");
 for (var i = 0; i < cards.length; i++) {
     cards[i].addEventListener("click", function() {
         this.classList.toggle("flip");
     });
 }



 function sizeit() {
     var numperrow = calnumperrow();
     var w = document.getElementById("showcase").clientWidth;
     var them = document.getElementsByClassName("filteritem");
     var available = w / numperrow;
     var realwidth = available - 10;
     for (var g = 0; g < them.length; g++) {
         them[g].style.width = realwidth + "px";
     }
     return available;
 }

 function calnumperrow() {
     if (document.getElementById("showcase").clientWidth >= 1000) {
         return 3;
     } else if (document.getElementById("showcase").clientWidth >= 650) {
         return 2;
     } else if (document.getElementById("showcase").clientWidth < 650) {
         return 1;
     }
 }

 function filterSelection(c) {
     var x, i;
     x = document.getElementsByClassName("filteritem");
     if (c == "all") c = "";
     for (i = 0; i < x.length; i++) {
         w3RemoveClass(x[i], "show");
         if (x[i].className.indexOf(c) > -1) {
             w3AddClass(x[i], "show");
         }
     }

     /*if (c == "all") c = "";
     $(".filteritem").each(function() {
         if ($(this).hasClass(c)) {
             $(this).animate({
                 display: "toggle",
             }, 3000);
         } else {
             $(this).fadeOut();
         }
     });*/
     makepositions();
 }

 function makepositions() {
     var heightadd = 0;
     var width = sizeit();
     var numperrow = calnumperrow();
     var theshown = document.getElementsByClassName("show");
     for (var u = 0; u < theshown.length; u++) {
         if (u % numperrow == 0) {
             if (u / numperrow == 0) {
                 theshown[u].style.position = "absolute";
                 theshown[u].style.top = "0";
                 theshown[u].style.left = "0";
             } else {
                 theshown[u].style.position = "absolute";
                 heightadd = 0;
                 for (var total = u / numperrow, done = 0; done < total; done++) {
                     heightadd += theshown[done * numperrow].clientHeight + 10;
                 }
                 theshown[u].style.top = heightadd + "px";
                 theshown[u].style.left = "0";
             }
         }

         if (u % numperrow == 1) {
             if (u == 1) {
                 theshown[u].style.position = "absolute";
                 theshown[u].style.top = "0";
                 theshown[u].style.left = width + "px";
             } else {
                 theshown[u].style.position = "absolute";
                 heightadd = 0;
                 for (
                     var total = Math.floor(u / numperrow), done = 1, counter = 0; counter < total; counter++, done += numperrow
                 ) {
                     heightadd += theshown[done].clientHeight + 10;
                 }
                 theshown[u].style.top = heightadd + "px";
                 theshown[u].style.left = width + "px";
             }
         }

         if (u % numperrow == 2) {
             if (u == 2) {
                 theshown[u].style.position = "absolute";
                 theshown[u].style.top = "0";
                 theshown[u].style.left = width * 2 + "px";
             } else {
                 theshown[u].style.position = "absolute";
                 heightadd = 0;
                 for (
                     var total = Math.floor(u / numperrow), done = 2, counter = 0; counter < total; counter++, done += numperrow
                 ) {
                     heightadd += theshown[done].clientHeight + 10;
                 }
                 theshown[u].style.top = heightadd + "px";
                 theshown[u].style.left = width * 2 + "px";
             }
         }
     }
     makesizeinshowcase();
     background();
 }

 function w3AddClass(element, name) {
     var i, arr1, arr2;
     arr1 = element.className.split(" ");
     arr2 = name.split(" ");
     for (i = 0; i < arr2.length; i++) {
         if (arr1.indexOf(arr2[i]) == -1) {
             element.className += " " + arr2[i];
         }
     }
 }

 function w3RemoveClass(element, name) {
     var i, arr1, arr2;
     arr1 = element.className.split(" ");
     arr2 = name.split(" ");
     for (i = 0; i < arr2.length; i++) {
         while (arr1.indexOf(arr2[i]) > -1) {
             arr1.splice(arr1.indexOf(arr2[i]), 1);
         }
     }
     element.className = arr1.join(" ");
 }

 var btnContainer = document.getElementById("myBtnContainer");
 var btns = btnContainer.getElementsByClassName("btn");
 for (var i = 0; i < btns.length; i++) {
     btns[i].addEventListener("click", function() {
         var current = document.getElementsByClassName("activebutton");
         current[0].className = current[0].className.replace(" activebutton", "");
         this.className += " activebutton";
     });
 }

 function makesizeinshowcase() {
     var all = document.getElementsByClassName("filteritem");
     var numperrow = calnumperrow();
     if (numperrow == 1) {
         var totalheight = 0;
         for (var i = 0; i < all.length; i = i + numperrow) {
             totalheight += all[i].clientHeight + 10;
         }
         document.getElementById("rowofitems").style.height = totalheight + 20 + "px";
     } else if (numperrow == 2) {
         var totalheight0 = 0;
         var totalheight1 = 0;
         for (var i = 0; i < all.length; i = i + numperrow) {
             totalheight0 += all[i].clientHeight + 10;
         }
         for (var i = 1; i < all.length; i = i + numperrow) {
             totalheight1 += all[i].clientHeight + 10;
         }
         if (totalheight0 >= totalheight1) {
             document.getElementById("rowofitems").style.height = totalheight0 + 20 + "px";
         }
         if (totalheight1 > totalheight0) {
             document.getElementById("rowofitems").style.height = totalheight1 + 20 + "px";
         }
     } else if (numperrow == 3) {
         var totalheight0 = 0;
         var totalheight1 = 0;
         var totalheight2 = 0;
         for (var i = 0; i < all.length; i = i + numperrow) {
             totalheight0 += all[i].clientHeight + 10;
         }
         for (var i = 1; i < all.length; i = i + numperrow) {
             totalheight1 += all[i].clientHeight + 10;
         }
         for (var i = 2; i < all.length; i = i + numperrow) {
             totalheight2 += all[i].clientHeight + 10;
         }
         if (totalheight0 >= totalheight1) {
             var round1winner = totalheight0
         }
         if (totalheight1 >= totalheight0) {
             var round1winner = totalheight1
         }
         if (round1winner >= totalheight2) {
             document.getElementById("rowofitems").style.height = round1winner + 20 + "px";
         }
         if (round1winner < totalheight2) {
             document.getElementById("rowofitems").style.height = totalheight2 + 20 + "px";
         }
     }
 }


 var slideIndex = 0;
 doslides();

 function arrowclicked(value) {
     if (value == 1) {
         doslides();
         background();
     } else if (value == -1) {
         slideIndex = slideIndex - 2;
         doslides();
         background();
     }
 }

 function doslides() {
     var i;
     var slides = document.getElementsByClassName("slide");
     var dots = document.getElementsByClassName("dot");
     for (i = 0; i < slides.length; i++) {
         slides[i].style.display = "none";
     }
     slideIndex++;
     if (slideIndex > slides.length) { slideIndex = 1 }
     if (slideIndex <= 0) { slideIndex = slides.length; }
     for (i = 0; i < dots.length; i++) {
         dots[i].className = dots[i].className.replace(" activedot", "");
     }
     slides[slideIndex - 1].style.display = "block";
     dots[slideIndex - 1].className += " activedot";
 }

 var interval = setInterval(function() {
     doslides();
     background();
 }, 5000);
 var play = true;
 var old;

 function playpause() {
     if (play == true) {
         play = false;
         clearInterval(interval);
         $("#control").replaceWith('<i onclick="playpause()" id="control" class="fas fa-play"></i>')
     } else if (play == false) {
         play = true;
         interval = setInterval(function() {
             doslides();
         }, 5000);
         $("#control").replaceWith('<i onclick="playpause()" id="control" class="fas fa-pause"></i>')
     }
 }



 var active;

 $(window).scroll(function() {
     navactive();
 });

 function navactive() {
     var sections = $(".section-container");
     var currentScroll = $(this).scrollTop();
     sections.each(function() {
         var divPosition = $(this).offset().top;
         if (divPosition - 1 < currentScroll) {
             active = $(this);
         }
     });
     $("a").removeClass("active");
     var now = document.querySelectorAll("a[href='#" + active.attr("id") + "']");
     now[0].className += " active"
 }

 $("#navigation a, footer a[href='#top'], a[href^='#']").on('click', function(event) {
     if (this.hash !== "") {
         event.preventDefault();
         var hash = this.hash;
         $('html, body').animate({
             scrollTop: $(hash).offset().top
         }, 800, function() {
             window.location.hash = hash;
         });
     }
 });

 //form

 $(".counted .notblank").blur(function() {
     var fieldvalue = $(this).val().trim();
     var elementexhists = $(this).next("p").length > 0;
     if (fieldvalue == "") {
         if (elementexhists) {} else {
             $(this).after("<p>please enter the requested information</p>");
         }

     } else {
         if (elementexhists) {
             $(this).next("p").remove();
         }
     }
 });

 $(".counted .numcheck").blur(function() {
     var fieldvalue = $(this).val().trim();
     var elementexhists = $(this).next("p").length > 0;
     if (isNaN(fieldvalue) || fieldvalue == "") {
         if (elementexhists) {} else {
             $(this).after("<p>please enter only numbers</p>");
         }
     } else {
         if (elementexhists) {
             $(this).next("p").remove();
         }
     }
 });

 $(".counted .emailcheck").blur(function() {
     var fieldvalue = $(this).val().trim();
     var elementexhists = $(this).next("p").length > 0;
     var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if (!(filter.test(fieldvalue)) || fieldvalue == "") {
         if (elementexhists) {} else {
             $(this).after("<p>please enter your valid email</p>");
         }
     } else {
         if (elementexhists) {
             $(this).next("p").remove();
         }
     }
 });

 $(".counted .phonenumber").blur(function() {
     var fieldvalue = $(this).val().trim();
     var elementexhists = $(this).next("p").length > 0;
     var filter = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
     if (!(filter.test(fieldvalue)) || fieldvalue == "") {
         if (elementexhists) {} else {
             $(this).after("<p>please enter your valid phone number</p>");
         }
     } else {
         if (elementexhists) {
             $(this).next("p").remove();
         }
     }
 });

 $("#bdwregister .notblank").blur(function() {
     var fieldvalue = $(this).val().trim();
     var elementexhists = $(this).next("p").length > 0;
     if (fieldvalue == "") {
         if (elementexhists) {} else {
             $(this).after("<p>please enter the requested information</p>");
         }

     } else {
         if (elementexhists) {
             $(this).next("p").remove();
         }
     }
 });

 $("#bdwregister .emailcheck").blur(function() {
     var fieldvalue = $(this).val().trim();
     var elementexhists = $(this).next("p").length > 0;
     var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if (!(filter.test(fieldvalue)) || fieldvalue == "") {
         if (elementexhists) {} else {
             $(this).after("<p>please enter your valid email</p>");
         }
     } else {
         if (elementexhists) {
             $(this).next("p").remove();
         }
     }
 });

 $("#bdwregister .phonenumber").blur(function() {
     var fieldvalue = $(this).val().trim();
     var elementexhists = $(this).next("p").length > 0;
     var filter = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
     if (!(filter.test(fieldvalue)) || fieldvalue == "") {
         if (elementexhists) {} else {
             $(this).after("<p>please enter your valid phone number</p>");
         }
     } else {
         if (elementexhists) {
             $(this).next("p").remove();
         }
     }
 });


 $("#child").click(function() {
     if ($(this).prop("checked")) {
         $("#mychildselected").slideDown("slow");
         $("#myselfselected").slideUp("slow");
         $("#mychildselected").addClass("counted");
         $("#myselfselected input").val("");
         $("#myselfselected input").next("p").remove();
         $("#myselfselected").removeClass("counted");
     }
 });

 $("#adult").click(function() {
     if ($(this).prop("checked")) {
         $("#myselfselected").slideDown("slow");
         $("#mychildselected").slideUp("slow");
         $("#mychildselected").removeClass("counted");
         $("#mychildselected input").val("");
         $("#mychildselected input").next("p").remove();
         $("#myselfselected").addClass("counted");
     }
 });

 $("#studentage").focus(function() {
     $("#allrest").slideDown("slow");
     background();
 });

 $("#phonenumber").focus(function() {
     $("#allrest").slideDown("slow");
     background();
 });

 $("input[type='checkbox']").click(function() {
     $("#dancetypecheckboxes").next("p").remove();
 });

 $(".notblank").click(function() {
     $(this).next("p").remove();
 });


 $(document).mouseup(function(e) {
     var container = $("#unlaunch");
     if (!container.is(e.target) && container.has(e.target).length === 0) {
         $("#allrest").slideUp("slow");
         background();
     }
 });

 $("#formregister").submit(function(event) {
     //make sure at least one checkbox is filled
     var checkboxes = $("input[type='checkbox']");
     var onechecked = false;
     var a = 0;
     for (var i = 0; i < checkboxes.length; i++) {
         var currentcheckbox = checkboxes[i];
         if (currentcheckbox.checked) {
             onechecked = true;
         }
     }
     if (onechecked == false) {
         if ($("#dancetypecheckboxes").next("p").length > 0) {
             a = a + 1;
         } else {
             $("#dancetypecheckboxes").after("<p>please select at least one</p>");
             a = a + 1;
         }
     } else {
         $("#dancetypecheckboxes").next("p").remove();

     }
     //make sure that all required fields have value
     var notblanktext = $(".counted .notblank");
     var currentvalue;
     var oneblank = false;
     for (var i = 0; i < notblanktext.length; i++) {
         currentvalue = notblanktext[i].value.trim();
         if (currentvalue == "") {
             var thenow = notblanktext[i].id;
             oneblank = true;
             $("#" + thenow).next("p").remove();
             $("#" + thenow).after("<p>please enter the requested information</p>");
         } else {
             $("#" + thenow).next("p").remove();
         }
     }
     if (oneblank == true) {
         a = a + 1;
     }
     //check if email is valid
     var requiredemail = $(".counted .emailcheck")
     var emailfieldvalue = $(requiredemail).val().trim();
     var elementexhists = requiredemail.next("p").length > 0;
     var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if (!(filter.test(emailfieldvalue))) {
         a = a + 1;
         if (elementexhists) {

         } else {
             $(requiredemail).after("<p>please enter your valid email</p>");
         }
     } else {
         if (elementexhists) {
             $(requiredemail).next("p").remove();
         }
     }

     //check if phone nember is valid
     var requiredphone = $(".counted .phonenumber")
     var fieldvalue = requiredphone.val().trim();
     var elementexhists = requiredphone.next("p").length > 0;
     var filter = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
     if (!(filter.test(fieldvalue))) {
         a = a + 1;
         if (elementexhists) {

         } else {
             requiredphone.after("<p>please enter your valid phone number</p>");
         }
     } else {
         if (elementexhists) {
             requiredphone.next("p").remove();
         }
     }
     //check if only numbers are inputted
     var requirednumber = $(".counted .numcheck")
     var fieldvalue = requirednumber.val().trim();
     var elementexhists = requirednumber.next("p").length > 0;
     if (isNaN(fieldvalue)) {
         a = a + 1;
         if (elementexhists) {} else {
             requirednumber.after("<p>please enter only numbers</p>");
         }
     } else {
         if (elementexhists) {
             requirednumber.next("p").remove();
         }
     }

     var total = a;
     if (total <= 0) {
         return true;
     } else {
         return false;
     }
 });

 $("#bdwregister").submit(function(event) {
     //make sure that all required fields have value
     var notblanktext = $("#bdwregister .notblank");
     var currentvalue;
     var oneblank = false;
     var a = 0;
     for (var i = 0; i < notblanktext.length; i++) {
         currentvalue = notblanktext[i].value.trim();
         if (currentvalue == "") {
             var thenow = notblanktext[i].id;
             oneblank = true;
             $("#" + thenow).next("p").remove();
             $("#" + thenow).after("<p>please enter the requested information</p>");
         } else {
             $("#" + thenow).next("p").remove();
         }
     }
     if (oneblank == true) {
         a = a + 1;
     }
     //check if email is valid
     var requiredemail = $("#bdwregister .emailcheck")
     var emailfieldvalue = $(requiredemail).val().trim();
     var elementexhists = requiredemail.next("p").length > 0;
     var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if (!(filter.test(emailfieldvalue))) {
         a = a + 1;
         if (elementexhists) {

         } else {
             $(requiredemail).after("<p>please enter your valid email</p>");
         }
     } else {
         if (elementexhists) {
             $(requiredemail).next("p").remove();
         }
     }

     //check if phone nember is valid
     var requiredphone = $("#bdwregister .phonenumber")
     var fieldvalue = requiredphone.val().trim();
     var elementexhists = requiredphone.next("p").length > 0;
     var filter = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
     if (!(filter.test(fieldvalue))) {
         a = a + 1;
         if (elementexhists) {

         } else {
             requiredphone.after("<p>please enter your valid phone number</p>");
         }
     } else {
         if (elementexhists) {
             requiredphone.next("p").remove();
         }
     }

     var total = a;
     if (total <= 0) {
         return true;
     } else {
         return false;
     }
 });




 $("#child").click();

 // Background color

 function background() {
     var heights = [];
     var realheights = [];
     var addition = 0;
     var counter = 0;
     $(".section-container").each(function() {
             var currentheight = $(this).outerHeight(true);
             addition = addition + currentheight;
             heights.push(addition);
             if (counter == 0) {
                 realheights.push(currentheight / 2)
             } else {
                 realheights.push((currentheight / 2) + heights[counter - 1])
             }
             counter++

         })
         //console.log(heights);
         //console.log(realheights);0
     var finalstyle = "linear-gradient(rgba(238, 130, 238, .2) 0px, rgba(255, 0, 0, .2) " + realheights[0] + "px, rgba(255, 165, 0, .2) " + realheights[1] + "px, rgba(255, 255, 0, .2) " + realheights[2] + "px,  rgba(0, 255, 0, .2) " + realheights[3] + "px, rgba(0, 0, 255, .2) " + realheights[4] + "px, rgba(75, 0, 130, .2) " + realheights[5] + "px, rgba(238, 130, 238, .2) " + realheights[6] + "px, rgba(255, 0, 0, .2) " + realheights[7] + "px)";
     $("body").css("background-image", finalstyle);
     //console.log(finalstyle);

 }