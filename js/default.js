// DOM
const prevPageNavBtn = document.querySelector("#prevPage");
const nextPageNavBtn = document.querySelector("#nextPage");
const paginationCountDiv = document.querySelector("#paginationCount");
const contentsSection = document.querySelector("#contents");

// Render data on page load
const renderPlaceholderResults = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const responseJson = await response.json();
  // Storing results in session as form of caching, speed and
  // also security (by clearing data on session exit)
  sessionStorage.setItem("jsonPlaceholderData", JSON.stringify(responseJson));
  if (response.status === 200) {
    // Global variables
    const placeholderResultData = sessionStorage.getItem("jsonPlaceholderData");
    const parsePlaceholderResultData = JSON.parse(placeholderResultData);
    const placeholderResultDataLength = parsePlaceholderResultData.length;
    const numberOfDataToDisplay = 7;
    const totalPlaceholderPaginationNumber = Math.ceil(
      placeholderResultDataLength / numberOfDataToDisplay
    );
    let prevPageIndex = 0;
    let nextPageIndex = 7;
    let currentPageNumber = 1;
    let contentsCardElem = "";

    const renderEachContent = (content) => {
      content.forEach(({ id, title }) => {
        const contentDiv = document.createElement("div");
        const contentTitle = document.createElement("h3");
        contentTitle.textContent = title;
        contentDiv.classList.add("contentsCards");
        contentTitle.classList.add("contentsCard");
        contentTitle.setAttribute("data-clicked_topic", id);
        contentDiv.appendChild(contentTitle);
        contentsSection.append(contentDiv);
      });
    };

    const getData = () => {
      if (currentPageNumber >= totalPlaceholderPaginationNumber)
        nextPageNavBtn.disabled = true;
      else nextPageNavBtn.disabled = false;

      if (currentPageNumber <= 1) prevPageNavBtn.disabled = true;
      else prevPageNavBtn.disabled = false;

      const currentView = parsePlaceholderResultData.slice(
        prevPageIndex,
        nextPageIndex
      );
      contentsSection.innerHTML = null;
      renderEachContent(currentView);
      contentsCardElem = document.querySelectorAll(".contentsCard");
    };
    getData();

    for (let i = 1; i <= totalPlaceholderPaginationNumber; i++) {
      const pageNumber = document.createElement("button");
      pageNumber.classList.add("paginationNumbers");
      pageNumber.setAttribute("data-pagination_number", i);
      pageNumber.textContent = i;
      paginationCountDiv.append(pageNumber);
    }

    const paginationRender = () => {
      if (contentsCardElem !== null) {
        contentsCardElem.forEach((elem) => {
          elem.addEventListener("click", (e) => {
            const clickedTitleNumber = e.target.dataset.clicked_topic;
            clickOnATitleCard(clickedTitleNumber);
          });
        });
      }
      document
        .querySelectorAll(".paginationNumbers")
        .forEach((elem) => elem.classList.remove("currentPage"));
      paginationCountDiv.children[currentPageNumber - 1].classList.add(
        "currentPage"
      );
    };
    paginationRender();

    const clickOnATitleCard = (titleNumber) => {
      const clickedTitleResponse = parsePlaceholderResultData[titleNumber - 1];
      sessionStorage.setItem(
        "clickedTitleResponse",
        JSON.stringify(clickedTitleResponse)
      );
      window.location.href = "/pages/post.html";
    };

    const clickOnAPaginationBtn = (paginationNumber) => {
      paginationNumber = Number(paginationNumber);

      if (paginationNumber !== currentPageNumber) {
        prevPageIndex = (paginationNumber - 1) * 7;
        currentPageNumber = paginationNumber;
        nextPageIndex = prevPageIndex + numberOfDataToDisplay;
        getData();
        paginationRender();
      } else return null;
    };

    prevPageNavBtn.addEventListener("click", () => {
      prevPageIndex -= numberOfDataToDisplay;
      nextPageIndex -= numberOfDataToDisplay;
      currentPageNumber -= 1;
      getData();
      paginationRender();
    });

    nextPageNavBtn.addEventListener("click", () => {
      prevPageIndex += numberOfDataToDisplay;
      nextPageIndex += numberOfDataToDisplay;
      currentPageNumber += 1;
      getData();
      paginationRender();
    });

    const paginationCounts = document.querySelectorAll(".paginationNumbers");
    if (paginationCounts !== null) {
      paginationCounts.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const currentPageNumber = e.target.dataset.pagination_number;
          clickOnAPaginationBtn(currentPageNumber);
        });
      });
    }
  }
};

renderPlaceholderResults();
