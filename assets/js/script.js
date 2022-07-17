$(document).ready(function () {
    var currentTime = moment();

    function dayTime() {
        if (currentTime.hour() >= 6 && currentTime.hour() < 12) {
            $("#currentDay").text(currentTime.format("[Good Morning! Today is] dddd MMMM Do[. The time is] hh:mm:ss A[.]"));
        } else if (currentTime.hour() >= 12 && currentTime.hour() < 18) {
            $("#currentDay").text(currentTime.format("[Good Afternoon! Today is] dddd MMMM Do[. The time is] hh:mm:ss A[.]"));
        } else if (currentTime.hour() >= 18 && currentTime.hour() < 24) {
            $("#currentDay").text(currentTime.format("[Good Evening! Today is] dddd MMMM Do[. The time is] hh:mm:ss A[.]"));
        } else {
            $("#currentDay").text(currentTime.format("[Today is] dddd MMMM Do[. The time is] hh:mm:ss A[.]"));
        };
    };

    function timeBlock() {
        var currentHour = currentTime.hour();

        $(".time-block").each(function () {
            var hourId = parseInt($(this).prop("id"), 10);

            if (hourId > currentHour) {
                $(this).addClass("future");
                $(this).removeClass("present");
                $(this).removeClass("past");
            } else if (hourId < currentHour) {
                $(this).addClass("past");
                $(this).removeClass("future");
                $(this).removeClass("present");
            } else {
                $(this).addClass("present")
                $(this).removeClass("future");
                $(this).removeClass("past");
            };
        });
    };

    setInterval(() => {
        currentTime = moment();
        dayTime();
        timeBlock();
    }, 1000);

    dayTime();
    timeBlock();
});