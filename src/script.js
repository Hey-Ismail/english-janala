//? genareate by GPT
const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");

    mobileMenu.classList.toggle("hidden");
    mobileMenuButton.setAttribute("aria-expanded", String(!isOpen));
    mobileMenuButton.setAttribute(
      "aria-label",
      isOpen ? "Open menu" : "Close menu",
    );
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1000) {
      mobileMenu.classList.add("hidden");
      mobileMenuButton.setAttribute("aria-expanded", "false");
      mobileMenuButton.setAttribute("aria-label", "Open menu");
    }
  });
}

const lodeAllLevels = () => {
  const url = fetch("https://openapi.programming-hero.com/api/levels/all");
  url.then((res) => res.json()).then((values) => styleBtns(values.data));
};

const styleBtns = (btns) => {
  //part one : element ta ke dhorbo and reset korbo
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  //part two : loop Er maddhome values / data extract korbo
  btns.forEach((element) => {
    //part three : new element create korbo
    const btn = document.createElement("div");

    //part four : element ar vitore  style korbo and values boshay dibo
    btn.innerHTML = `
    <button onclick="loadLevelWord(${element.level_no})" class="border-2 border-[#422ad5FF] flex items-center justify-center px-3 py-1 gap-2 rounded-[4px]  lg:w-full"> 
    <img src="./assets/fa-book-open.png" alt="" />
    <p>Level : ${element.level_no}</p>
    </button>`;

    //part five : notun element ke oi dhora elemment e dukai dibo :3
    levelContainer.append(btn);
  });
};

const loadLevelWord = (id) => {
  const url = fetch(`https://openapi.programming-hero.com/api/level/${id}`);
  url.then((res) => res.json()).then((value) => showWords(value.data));
  // console.log(url);
};

const showWords = (jsonDatas) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (!jsonDatas || jsonDatas.length === 0) {
    wordContainer.innerHTML = `
      <div class="lg:col-span-3 rounded-3xl bg-white p-10 text-center shadow-sm">
        <p class="text-[#79716B] text-[13.38px] my-3">আপনি এখনো কোন Lesson Select করেন নাই</p>
        <p class="text-[#292524FF] font-medium lg:text-4xl text-2xl">একটি Lesson Select করুন।</p>
      </div>
    `;
    return;
  }

  jsonDatas.forEach((words) => {
    const wordsDiv = document.createElement("div");
    wordsDiv.innerHTML = `
          <div class="bg-[#ffffff] rounded-lg p-10 text-center">
          <div class="">
            <h1 class="text-3xl font-bold mb-2">${words.word ?? "N/A"}</h1>
            <p class="text-gray-700 mb-4">Meaning / Pronounciation</p>
            <p class="text-md text-gray-600 font-medium mb-12">
              ${words.meaning ?? "N/A"} / ${words.pronunciation ?? "N/A"}
            </p>
          </div>

          <div class="flex justify-between items-center">
            <button class=" p-1 rounded-lg shadow">
              <img class="w-8 h-8" src="./assets/Group 10.png" alt="Info icon" />
            </button>

            <button class="p-1 rounded-lg shadow">
              <img class="w-8 h-8" src="./assets/Group 9.png" alt="Sound icon" />
            </button>
          </div>
        </div>
    `;
    wordContainer.append(wordsDiv);
  });
};

lodeAllLevels(); //call funciton
