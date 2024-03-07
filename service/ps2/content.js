chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "translate") {
    const targetLanguage = request.targetLanguage;
    const mainElement = document.querySelector("body")

    if (mainElement) {
      const htmlContent = mainElement.innerHTML.trim();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");

      const url = "https://google-translate113.p.rapidapi.com/api/v1/translator/html";

      const options = {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": "1877116e40msh88bb5596f4361b1p1720adjsned9fd0f3e117",
          "X-RapidAPI-Host": "google-translate113.p.rapidapi.com",
        },
        body: new URLSearchParams({
          from: "auto",
          to: targetLanguage,
          html: htmlContent,
        }),
      };

      fetch(url, options)
        .then(response => response.json())
        .then(result => {
          const translatedHTML = result.trans;
          const translatedDoc = parser.parseFromString(translatedHTML, "text/html");
          mainElement.innerHTML = translatedDoc.body.innerHTML;

          // Send a response to the popup
          sendResponse({ success: true });
        })
        .catch(error => {
          console.error(error);
          // Send an error response to the popup
          sendResponse({ success: false, error: error.message });
        });

      // Return true to indicate that the response will be sent asynchronously
      return true;
    } else {
      console.error("main element not found!");
      // Send an error response to the popup
      sendResponse({ success: false, error: "Main element not found" });
    }
  }
});