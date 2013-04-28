this.screenshotPreview = function () {
    $(".tooltip").live('mouseenter', function (e) {
        this.t = this.title;
        this.title = "";
        var c = (this.t != "") ? "<div class='clear'></div>" + this.t : "";
        if (c != "") {
            $("body").append("<div class='tip2'><div class='notifier'>" + c + "</div></div>");
        }
        $(".tip2").css({ 'top': (e.pageY + 20) + "px", 'left': (e.pageX + 30) + "px" }).fadeIn("fast");
    }).live('mouseleave', function () {
        this.title = this.t;
        $(".tip2").remove();
    }).live('mousemove', function (e) {
        $(".tip2")
   .css("top", (e.pageY + 20) + "px")
   .css("left", (e.pageX - 30) + "px");
    });
};
screenshotPreview();