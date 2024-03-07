async function translateContent(targetLanguage) {
  const mainElement = document.querySelector("#main");

  if (mainElement) {
    const htmlContent = mainElement.innerHTML.trim();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    const url =
      "https://google-translate113.p.rapidapi.com/api/v1/translator/html";

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

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const translatedHTML = result.trans;
      const translatedDoc = parser.parseFromString(translatedHTML, "text/html");
      mainElement.innerHTML = translatedDoc.body.innerHTML;
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error("main element not found!");
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  // Translate content to English initially when the DOM is loaded
  translateContent("en");
});

// Attach onchange event listener to the targetLanguage select element
document.getElementById("targetLanguage").onchange = function(event) {
  // Call translateContent() function with the selected language
  translateContent(this.value);
};
