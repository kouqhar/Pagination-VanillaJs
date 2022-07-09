const titleSection = document.querySelector("#title");
const bodySection = document.querySelector("#body");
const goBackBtn = document.querySelector("#backBtn");
const parseClickedTitleResponse = sessionStorage.getItem(
  "clickedTitleResponse"
);
const { title, body } = JSON.parse(parseClickedTitleResponse);

titleSection.innerHTML = `<h1>${title}</h1>`;
bodySection.innerHTML = `<p>${body}</p>`;
if (goBackBtn !== null)
  goBackBtn.addEventListener("click", () => window.history.back());
