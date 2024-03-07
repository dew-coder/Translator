// Popup.js to handle messages from background.js and update textarea

document.addEventListener("DOMContentLoaded", async function () {
  document.getElementById("targetLanguage").addEventListener("change", function () {
    translateTextarea();
  });

  // Trigger translation on page load
  await translateTextarea();

  // Request selected text from background.js
  chrome.runtime.sendMessage({ action: "getSelectedText" }, function(response) {
    if (response.selectedText) {
      updateTextarea(response.selectedText);
    }
  });
});

// Function to translate the text in the textarea to the selected language
async function translateTextarea() {
  const targetLanguage = document.getElementById("targetLanguage").value;
  const selectedText = document.getElementById("selectedTextTextarea").value;

  const url = 'https://google-translate113.p.rapidapi.com/api/v1/translator/text';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '6c30a17273msh34ec73596a7c03ap10baaejsn2d99d4dbe06b',
      'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
    },
    body: new URLSearchParams({
      from: 'auto',
      to: targetLanguage,
      text: selectedText
    })
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json(); // Parse JSON
    console.log(result);

    // Do something with the translated text, e.g., update the textarea
    updateTextarea(result);
  } catch (error) {
    console.error(error);
  }
}

// Function to update the textarea with translated text
function updateTextarea(translatedText) {
  const textarea = document.getElementById("selectedTextTextarea");
  
  if (textarea) {
    console.log(translatedText.trans);
    textarea.value = translatedText.trans || translatedText;
  }
}
