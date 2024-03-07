// Background script to relay messages between content.js and popup.js

let selectedText = "";

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "updateTextarea") {
    selectedText = message.selectedText;
  }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "getSelectedText") {
    // Send the selected text to popup.js
    sendResponse({ selectedText });
  }
  return true; // Required for sendResponse to work asynchronously
});
