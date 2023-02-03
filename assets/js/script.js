// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var container = $(".container-lg");

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

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
    box.attr("data-hour", i);
    box.text(startTime.add(i, "hour").format("h A"));

    textarea.addClass("col-8 col-md-10 description");
    textarea.attr("rows", "3");

    button.addClass("btn saveBtn col-2 col-md-1");
    button.attr("aria-label", "save");

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
  }
  // Only triggers listener if one of the saveBtns are clicked
  // container.on("click", container.children().children(".saveBtn"), function () {
  //   var element = $(this);

  //   // save to localStorage for the box that is clicked

  // });

  // Save to localStorage

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
