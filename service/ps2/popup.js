document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("targetLanguage").addEventListener("change", function () {
    translateContent();
  });
});

function translateContent() {
  const targetLanguage = document.getElementById("targetLanguage").value;

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "translate", targetLanguage }, function(response) {
      console.log(response);
      console.log("in popup.js")
    });
  });
}
