// Runs the function when the document is loaded
$(document).ready(function () {
    // Creates a variable equal to the current time
    var currentTime = moment();

    // Displays the current day and time to jumbotron
    function dayTime() {
        // If the current time is or past 6am but before 12pm...
        if (currentTime.hour() >= 6 && currentTime.hour() < 12) {
            // Then display a good morning message with the day and time
            $("#currentDay").text(currentTime.format("[Good Morning! Today is] dddd MMMM Do[. The time is] hh:mm:ss A[.]"));
            // If the time is or past 12pm but before 6pm...
        } else if (currentTime.hour() >= 12 && currentTime.hour() < 18) {
            // Then display a good afternoon message with the day and time
            $("#currentDay").text(currentTime.format("[Good Afternoon! Today is] dddd MMMM Do[. The time is] hh:mm:ss A[.]"));
            // If the time is or past 6pm but before 12am...
        } else if (currentTime.hour() >= 18 && currentTime.hour() < 24) {
            // Then display a good evening message with the day and time
            $("#currentDay").text(currentTime.format("[Good Evening! Today is] dddd MMMM Do[. The time is] hh:mm:ss A[.]"));
            // If none of these statements are true then...
        } else {
            // Display just the day and time
            $("#currentDay").text(currentTime.format("[Today is] dddd MMMM Do[. The time is] hh:mm:ss A[.]"));
        };
    };

    // Color codes the time blocks based on the current time
    function timeBlock() {
        // Creates a variable equal to the current hour
        var currentHour = currentTime.hour();

        // For each element with a class of time-block...
        $(".time-block").each(function () {
            // Creates a variable that converts the time block element id into a number
            var hourId = parseInt($(this).prop("id"), 10);

            // If the time block hour is greater than the current hour...
            if (hourId > currentHour) {
                // Then add the future class to the time block and remove all other time classes
                $(this).addClass("future");
                $(this).removeClass("present");
                $(this).removeClass("past");
                // If the time block hour is less than the current hour...
            } else if (hourId < currentHour) {
                // Then add the past class to the time block and remove all other time classes
                $(this).addClass("past");
                $(this).removeClass("future");
                $(this).removeClass("present");
                // If none of these statements are true...
            } else {
                // Then add the present class to the time block and remove all other time classes
                $(this).addClass("present");
                $(this).removeClass("future");
                $(this).removeClass("past");
            };
        });
    };

    // Sets an interval to run every second
    setInterval(() => {
        // Updates the currentTime variable to the current time when the interval runs
        currentTime = moment();

        // Calls the dayTime and timeBlock functions when the interval runs
        dayTime();
        timeBlock();
    }, 1000);

    // For each element with the class of description...
    $(".description").each(function () {
        // Create a variable to get the locale storage item with the id of the description's parent element id
        var plan = localStorage.getItem($(this).parent().prop("id"));

        // If the plan variable is truthy...
        if (plan) {
            // Set the value of the description class element to the item from local storage
            $(this).val(plan);
        };
    });

    // Calls the dayTime and timeBlock functions when the document.ready function runs
    dayTime();
    timeBlock();

    // Adds an event handler to the element with the saveBtn class for when it's clicked to call the savePlan function
    $(".saveBtn").click(savePlan);
    // Adds an event handler to the element with the planBtn class for when it's clicked to call the clearPlan function
    $(".planBtn").click(clearPlan);
});

// Saves the scheduler plan for that time block
function savePlan(event) {
    // Prevents the event default when the button is clicked
    event.preventDefault();

    // If the sibling of the save button with the class of description has a value that is truthy...
    if ($(this).siblings(".description").val()) {
        // Then set the value of the element with the description class to the local storage with the id of it's parent element
        localStorage.setItem($(this).parent().prop("id"), $(this).siblings(".description").val());
        // Otherwise if the statement isn't true...
    } else {
        // Remove the item from locale storage matching it's parent element id
        localStorage.removeItem($(this).parent().prop("id"));
    };
};

// Clears all plans from the scheduler
function clearPlan(event) {
    // Prevents the event default when the button is clicked
    event.preventDefault();

    // Clears the local storage
    localStorage.clear();
    // Sets the value of the elements with the description class to null
    $(".description").val(null);
};