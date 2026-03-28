//* genareate by GPT
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

const showLodingBar = (status) => {
  if (status === true) {
    document.getElementById("loding-bar").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("loding-bar").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
  }
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
    <button id="selected-lesson-btn-${element.level_no}" onclick="loadLevelWord(${element.level_no})" class="border-2 border-[#422ad5FF] flex items-center justify-center px-3 py-1 gap-2 rounded-[4px]  lg:w-full"> 
    <img src="./assets/fa-book-open.png" alt="" />
    <p>Level : ${element.level_no}</p>
    </button>`;

    //part five : notun element ke oi dhora elemment e dukai dibo :3
    levelContainer.append(btn);
  });
};

const loadLevelWord = (id) => {
  showLodingBar(true);
  const url = fetch(`https://openapi.programming-hero.com/api/level/${id}`);
  url
    .then((res) => res.json())
    .then((value) => {
      styleSelectedBtn(id);
      showWords(value.data);
    });
};

let activeLevelBtn = null;
const styleSelectedBtn = (btn) => {
  if (activeLevelBtn) {
    activeLevelBtn.style.backgroundColor = "";
    activeLevelBtn.style.color = "";
  }

  const selectedBtn = document.getElementById(`selected-lesson-btn-${btn}`);
  // const emptyMessage = document.getElementById("word-container");

  if (!selectedBtn) {
    return;
  }

  selectedBtn.style.backgroundColor = "#422ad5FF";
  selectedBtn.style.color = "#FFFFFF";
  activeLevelBtn = selectedBtn;
};

const loadWordDetails = async (id) => {
  const url = await fetch(
    `https://openapi.programming-hero.com/api/word/${id}`,
  );
  // url.then((res) => res.json()).then((json) => modalStyle(json.data));
  const details = await url.json();
  modalStyle(details.data);
};

const modalStyle = (element) => {
  const wordDetailsModal = document.getElementById("word-details-modal");
  const synonyms = element?.synonyms ?? [];

  wordDetailsModal.innerHTML = `
    <div class="rounded-2xl border border-[#dbe8f4] bg-[#f8fafc] p-4 ">
      <div class="space-y-4 text-[#111827]">
        <h2 class="text-xl font-semibold  lg:text-3xl">
          ${element?.word ?? "N/A"}
          <span class="font-semibold">(<i class="fa-solid fa-microphone-lines"></i> : ${element?.pronunciation ?? "N/A"} )</span>
        </h2>

        <div>
          <p class="text-xl font-bold lg:text-2xl">Meaning</p>
          <p class="mt-1 text-lg sm:text-xl">${element?.meaning ?? "No meaning found"}</p>
        </div>

        <div>
          <p class="text-xl font-bold sm:text-2xl">Example</p>
          <p class="mt-1 text-base text-[#374151] sm:text-lg">${element?.sentence ?? "No example found"}</p>
        </div>

        <div>
          <p class="text-xl font-bold sm:text-2xl">সমার্থক শব্দ গুলো</p>
          <div class="mt-3 flex flex-wrap gap-2">
            <span class="rounded-lg border border-[#d7e4ef] bg-[#e9f2fb] px-3 py-1.5 text-sm text-[#334155]">
              ${synonyms[0] ?? ""}
            </span>
            <span class="rounded-lg border border-[#d7e4ef] bg-[#e9f2fb] px-3 py-1.5 text-sm text-[#334155]">
              ${synonyms[1] ?? ""}
            </span>
            <span class="rounded-lg border border-[#d7e4ef] bg-[#e9f2fb] px-3 py-1.5 text-sm text-[#334155]">
              ${synonyms[2] ?? ""}
            </span>
          </div>
        </div>

        <div class="pt-1">
          <button
            onclick="document.getElementById('my_modal_5').close()"
            class="rounded-lg bg-[#4338ca] px-5 py-2 text-base font-semibold text-white transition hover:bg-[#3a31b8]"
          >
            Complete Learning
          </button>
        </div>
      </div>
    </div>
  `;
  document.getElementById("my_modal_5").showModal();

  // console.log(values);

  // const modal = document.createElement("div");
  // wordDetailsModal.appendChild(modal);
};
const showWords = (jsonDatas) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (!jsonDatas || jsonDatas.length === 0) {
    wordContainer.innerHTML = `
      <div class="lg:col-span-3 rounded-3xl bg-white p-10 text-center shadow-sm
      flex justify-center items-center flex-col">
        <img src="./assets/image 1.png" alt="" />
        <p class="text-[#79716B] text-[13.38px] my-3">আপনি এখনো কোন Lesson Select করেন নাই</p>
        <p class="text-[#292524FF] font-medium lg:text-4xl text-2xl">নেক্সট Lesson এ যান</p>
      </div>
    `;
    showLodingBar(false);
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
            <button onclick="loadWordDetails(${words.id})" class=" p-1 rounded-lg shadow">
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
  showLodingBar(false);
};

lodeAllLevels(); //call funciton

const showDefaultMessage = () => {
  const wordContainer = document.getElementById("word-container");

  wordContainer.innerHTML = `
    <div class="lg:col-span-3 rounded-3xl bg-white p-10 text-center shadow-sm
    flex justify-center items-center flex-col">
      <p class="text-[#79716B] text-[13.38px] my-3">আপনি এখনো কোন Lesson Select করেন নাই</p>
      <p class="text-[#292524FF] font-medium lg:text-4xl text-2xl">একটি Lesson Select করুন</p>
    </div>
 `;
};

showDefaultMessage(); //showing default message on the website!
