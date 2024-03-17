$(document).ready(function () {
    var angleStart = -360;

    function rotate(li, d) {
        $({ d: angleStart }).animate(
            {
                d: d
            },
            {
                step: function (now) {
                    $(li)
                        .css({ transform: "rotate(" + now + "deg)" })
                        .find("label")
                        .css({ transform: "rotate(" + -now + "deg)" });
                },
                duration: 0
            }
        );
    }

    // Show/hide the options
    function toggleOptions(s) {
        $(s).toggleClass("open");
        var li = $(s).find("li");
        var deg = $(s).hasClass("half") ? 180 / (li.length - 1) : 360 / li.length;
        for (var i = 0; i < li.length; i++) {
            var d = $(s).hasClass("half") ? i * deg - 90 : i * deg;
            $(s).hasClass("open") ? rotate(li[i], d) : rotate(li[i], angleStart);
        }
    }

    // Add a click event listener to the button
    $(".selector button").click(function (e) {
        toggleOptions($(this).parent());
    });

    // Trigger the options to open after a delay (adjust the delay as needed)
    setTimeout(function () {
        toggleOptions(".selector");
    }, 100);
});
