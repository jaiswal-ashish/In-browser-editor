function enableEditMode() {
  richText.document.designMode = "On";
}
function execCmd(command) {
  richText.document.execCommand(command, false, null);
}
function execCommandWithArg(command, arg) {
  if (command == "createLink") {
    richText.document.execCommand(command, false, "edit");
    var link = richText.document.querySelector("a[href='edit']");
    link.setAttribute("target", "_blank");
    link.setAttribute("href", arg);
    // console.log(link);
  } else if (command == "insertImage") {
    richText.document.execCommand(command, false, "edit");
    var image = richText.document.querySelector("img[src='edit']");
    image.setAttribute("height", "300");
    image.setAttribute("width", "300");
    image.setAttribute("src", arg);
  } else {
    richText.document.execCommand(command, false, arg);
  }
}

var showCode = false;
var isEditMode = true;

function toggleSource() {
  if (showCode) {
    richText.document.getElementsByTagName(
      "body"
    )[0].innerHTML = richText.document.getElementsByTagName(
      "body"
    )[0].textContent;
  } else {
    richText.document.getElementsByTagName(
      "body"
    )[0].textContent = richText.document.getElementsByTagName(
      "body"
    )[0].innerHTML;
  }
  showCode = !showCode;
}
function toggleEdit() {
  if (isEditMode) {
    richText.document.designMode = "Off";
  } else {
    richText.document.designMode = "On";
  }
  isEditMode = !isEditMode;
}

function displayCode() {
  document.getElementById(
    "display"
  ).innerHTML = richText.document.getElementsByTagName("body")[0].innerHTML;
}

function enableRichText(description) {
  // console.log(description);
  richText.document.getElementsByTagName("body")[0].innerHTML = description;
}
// console.log(richText.document.getElementById("bxx"));
document.getElementById("bxx").addEventListener("click", () => {
  var selection = richText.document.getSelection();
  var range = selection.getRangeAt(0).cloneContents();
  // console.log(range);
  var images = range.querySelectorAll("img");
  if (images.length > 0) {
    images.forEach(image => {
      // console.log(image);
      var src = image.getAttribute("src");
      var imageSelection = richText.document.querySelector(
        "img[src='" + src + "']"
      );

      var height = document.getElementById("heightInput").value;
      var width = document.getElementById("widthInput").value;
      imageSelection.setAttribute("height", height);
      imageSelection.setAttribute("width", width);
    });
  }
});
