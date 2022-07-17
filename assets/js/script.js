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

setInterval(() => {
    currentTime = moment();
    dayTime();
}, 1000);

dayTime();