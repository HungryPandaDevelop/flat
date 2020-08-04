$(document).ready(function () {

    var tempFile = $("<div class='file-decorate'><span class='btn'>Выберете файл...</span><i></i></div>");

    var ObjfieldFile = $(".input-file");

    var flagFileMulti = 1;
    $(".input-file").after(tempFile);

    $("body").on("click", ".file-decorate span", function () {
        $(this).parent().prev().trigger("click");

    });

    $("body").on("change", ".input-file", function () {
        var nameFile = $(this).val().replace(/C:\\fakepath\\/i, '');
        if (nameFile.length > 0) {
            $(this).next().find("span").text(nameFile);
            $(this).next().addClass("full");
            if (flagFileMulti == 1) {
                $(this).next().after(ObjfieldFile.clone().val(""));
                tempFile = $("<div class='file-decorate'><span class='btn'>Выберете файл...</span><i></i></div>");
                $(this).next().next().after(tempFile.clone());
            }
        }
    });

    $("body").on("click", ".file-decorate i", function (e) {
        e.stopPropagation();
        var choiseParent = $(this).parents(".file-decorate");
        if (flagFileMulti == 1) {
            choiseParent.prev().remove();
            choiseParent.remove();
        } else {
            choiseParent.prev().val("");
            choiseParent.find("span").text("Выберете файл...");
        }


    });
    // style input file
    // check email
    var r = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
    var mailInput;
    var mailFlag = 1;

    function checkMail(elThis) {
        mailInput = elThis.val();

        if (!r.test(mailInput)) {
            mailFlag = 0;
            elThis.addClass("error-input");

        } else {
            mailFlag = 1;
            elThis.removeClass("error-input")
        }
    }

    $(".check-mail").on("keyup", function () {
        checkMail($(this));

        if (mailInput.length == 0) {
            $(this).removeClass("error-input")
        }
    });
    // check email

    // check require

    $(".btn-send").on("click", function (e) {

        var isEmpty = false;

        checkMail($(this).parents(".form").find(".check-mail"));

        $(this).parents(".form").find(".require").each(function () {

            if ($(this).attr("type") == "checkbox") {
                if (!$(this).is(":checked")) {
                    $(this).parent().addClass("error-input");
                    isEmpty = true;
                }
            }
            if ($(this).is(".style-select")) {

                if ($(this).prev().attr("data-val") == 0) {

                    $(this).prev().addClass("error-input");
                    isEmpty = true;
                }
            }

            if ($(this).attr("type") == "file") {
                $(this).next().addClass("error-input");
            }

            if (!$(this).val()) {
                isEmpty = true;
                $(this).addClass("error-input");
            }
        });

        setTimeout(function () {
            //$(".error-input").removeClass("error-input");
        }, 1000);

        if (isEmpty == true) {
            e.preventDefault();
        };
    });

    // check require


    // custom-select

    $(".style-select").each(function () {
        var firstElOption = $(this).prev().text();
        $(this).prev().hide();
        var styleSelectBoxElement = $("<div class='custom-select' data-val='0'><span>" + firstElOption + "</span><ul></ul><i></i></div>");

        $(this).before(styleSelectBoxElement).hide();

        $(this).find("option").each(function () {
            var optionText = $(this).text();

            $(this).parent().prev().find("ul").append("<li>" + optionText + "</li>");
        });
    });

    $(".custom-select").on("click", function (e) {
        e.preventDefault();
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {
            $(".custom-select").removeClass("active");
            $(this).addClass("active");
        }
    });

    $("body").on("click", function (evt) {
        if (!$(evt.target).is('.custom-select, .custom-select > *')) {
            $(".custom-select").removeClass("active");
        }
    });
    $(".custom-select").on("click", "li", function () {
        var liIndex = $(this).index();
        $(this).parents(".custom-select").attr("data-val", (liIndex + 1));
        $(this).parents(".custom-select").next().find("option").eq(liIndex).prop("selected", true);
        $(this).parents(".custom-select").find("span").text($(this).text());
    });
    // custom-select



    $(".close").on("click", function () {
        $(this).parents(".element-show").removeClass("show");
    });

    $(".element-btn").on("click", function (e) {
        e.preventDefault();
        var activeIndex = $(this).attr("data-showEl");
        console.log("obj", activeIndex);
        $("[data-showEl='" + activeIndex + "'].element-show").toggleClass("show");
    });


    var longPhone = 16;
    $(".phone-mask").on("keydown", function (e) {

        if (!parseInt(e.originalEvent.key)) {
            if (e.originalEvent.key != "Backspace") {
                e.preventDefault();
            }
        }
        if ($(this).val().length < longPhone) {
            longPhone = 16;
            $(".phone-mask").mask("+7(999)999-99-999", {
                placeholder: " + 7(   )   -  -  "
            });
        } else {
            longPhone = 11;
            $(this).unmask();
            $(".phone-mask").mask("999999999999999999");
        }
    });
});