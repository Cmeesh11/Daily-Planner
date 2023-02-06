
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var container = $(".container-lg");

  // Set a starting time for typical work day
  var startTime = dayjs().hour(9).minute(0).second(0);
  // Create elements for each row
  for (var i = 0; i < 9; i++) {
    var row = $("<div>");
    var box = $("<div>");
    var button = $("<button>");
    var textarea = $("<textarea>");
    var iTag = $("<i>");

    // Add rest of elements
    box.addClass("col-2 col-md-1 hour text-center py-3");
    box.attr("id", i + 9);
    box.text(startTime.add(i, "hour").format("h A"));

    textarea.addClass("col-8 col-md-10 description");
    textarea.attr("data-hour", startTime.add(i, "hour").format("h"));
    textarea.attr("rows", "3");

    button.addClass("btn saveBtn col-2 col-md-1");
    button.attr("data-hour", startTime.add(i, "hour").format("h"));
    button.attr("aria-label", "save");

    $(button).each(function () {
      var $this = $(this);
      $this.on("click", function () {
        var buttonClicked = $this.data("hour");
        // Save in local storage for the button clicked
        localStorage.setItem(buttonClicked, $this.siblings("textarea").val());
      });
    });

    iTag.addClass("fas fa-save");
    iTag.attr("aria-hidden", "true");

    container.append(row);
    row.append(box, textarea, button);
    button.append(iTag);
    // if in past change row color to gray
    if (startTime.add(i, "hour").isBefore(dayjs(), "hour")) {
      row.addClass("row time-block past");
    }
    // if present change row color to red
    else if (startTime.add(i, "hour").isSame(dayjs(), "hour")) {
      row.addClass("row time-block present");
    }
    // if future change row color to green
    else if (startTime.add(i, "hour").isAfter(dayjs(), "hour")) {
      row.addClass("row time-block future");
    }
    // Get values from local storage and put them in the textareas
    textarea.val(localStorage.getItem(button.data("hour")));
  }
});

// TODO: Add code to display the current date in the header of the page.
$("#currentDay").text(dayjs().format("[Today is]  dddd, MMMM Do"));
