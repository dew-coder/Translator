// Content script to handle text selection and send it to background.js

document.addEventListener("selectionchange", function () {
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    // Send the selected text to background.js
    chrome.runtime.sendMessage({ action: "updateTextarea", selectedText });
  }
});
