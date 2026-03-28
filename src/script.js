/* =========================================================
                        UTILITIES
========================================================= */

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);

  utterance.lang = "en-EN";

  window.speechSynthesis.speak(utterance);
}

/* =========================================================
                      MOBILE MENU
========================================================= */

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

/* =========================================================
                        API
========================================================= */

const lodeAllLevels = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => {
      styleBtns(data.data);
    });
};

const loadLevelWord = (levelId) => {
  showLodingBar(true);

  fetch(`https://openapi.programming-hero.com/api/level/${levelId}`)
    .then((res) => res.json())
    .then((data) => {
      styleSelectedBtn(levelId);

      showWords(data.data);
    });
};

const loadWordDetails = async (wordId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/word/${wordId}`,
  );

  const data = await res.json();

  modalStyle(data.data);
};

/* =========================================================
                      LOADING STATE
========================================================= */

const loadingBar = document.getElementById("loding-bar");

loadingBar.classList.add("hidden");

const showLodingBar = (status) => {
  const wordContainer = document.getElementById("word-container");

  if (status) {
    loadingBar.classList.remove("hidden");

    wordContainer.classList.add("hidden");
  } else {
    loadingBar.classList.add("hidden");

    wordContainer.classList.remove("hidden");
  }
};

/* =========================================================
                    LEVEL BUTTONS
========================================================= */

const styleBtns = (levels) => {
  const levelContainer = document.getElementById("level-container");

  levelContainer.innerHTML = "";

  levels.forEach((level) => {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = `

      <button

        id="selected-lesson-btn-${level.level_no}"

        onclick="loadLevelWord(${level.level_no})"


        class="
          border-2
          border-[#422ad5FF]

          flex
          items-center
          justify-center

          gap-2
          px-3
          py-1

          rounded
          lg:w-full
        "

      >

        <img
          src="./assets/fa-book-open.png"
          alt=""
        />


        <p>

          Level : ${level.level_no}

        </p>


      </button>

    `;

    levelContainer.append(wrapper);
  });
};

let activeLevelBtn = null;

const styleSelectedBtn = (id) => {
  if (activeLevelBtn) {
    activeLevelBtn.style.backgroundColor = "";

    activeLevelBtn.style.color = "";
  }

  const btn = document.getElementById(`selected-lesson-btn-${id}`);

  if (!btn) return;

  btn.style.backgroundColor = "#422ad5FF";

  btn.style.color = "#FFFFFF";

  activeLevelBtn = btn;
};

/* =========================================================
                       WORD CARDS
========================================================= */

const showWords = (words) => {
  const container = document.getElementById("word-container");

  container.innerHTML = "";

  /* ---------- empty state ---------- */

  if (!words || words.length === 0) {
    container.innerHTML = `

      <div

        class="
          lg:col-span-3

          p-10
          rounded-3xl

          bg-white
          shadow-sm

          flex
          flex-col

          justify-center
          items-center

          text-center
        "

      >

        <img
          src="./assets/image 1.png"
          alt=""
        />


        <p

          class="
            text-[#79716B]
            text-[13.38px]

            my-3
          "

        >

          আপনি এখনো কোন Lesson Select করেন নাই

        </p>



        <p

          class="
            text-[#292524FF]

            text-2xl
            lg:text-4xl

            font-medium
          "

        >

          নেক্সট Lesson এ যান

        </p>


      </div>

    `;

    showLodingBar(false);

    return;
  }

  /* ---------- words ---------- */

  words.forEach((word) => {
    const card = document.createElement("div");

    card.innerHTML = `

      <div

        class="
          bg-white

          p-10
          rounded-lg

          text-center
        "

      >



        <h1

          class="
            text-3xl
            font-bold

            mb-2
          "

        >

          ${word.word ?? "N/A"}

        </h1>



        <p

          class="
            text-gray-700
            mb-4
          "

        >

          Meaning / Pronunciation

        </p>



        <p

          class="
            text-md
            text-gray-600

            font-medium
            mb-12
          "

        >

          ${word.meaning ?? "N/A"}

          /

          ${word.pronunciation ?? "N/A"}

        </p>





        <div

          class="
            flex
            justify-between
            items-center
          "

        >



          <button

            onclick="loadWordDetails(${word.id})"

            class="
              p-1
              rounded-lg
              shadow
            "

          >

            <img
              src="./assets/Group 10.png"

              alt="info"

              class="w-8 h-8"
            />

          </button>





          <button

            onclick="pronounceWord('${word.word}')"

            class="
              p-1
              rounded-lg
              shadow
            "

          >

            <img
              src="./assets/Group 9.png"

              alt="sound"

              class="w-8 h-8"
            />

          </button>



        </div>



      </div>

    `;

    container.append(card);
  });

  showLodingBar(false);
};

/* =========================================================
                         MODAL
========================================================= */

const modalStyle = (word) => {
  const modal = document.getElementById("word-details-modal");

  const synonyms = word?.synonyms ?? [];

  modal.innerHTML = `

    <div

      class="
        p-4

        rounded-2xl

        border
        border-[#dbe8f4]

        bg-[#f8fafc]
      "

    >



      <h2

        class="
          text-xl
          lg:text-3xl

          font-semibold
        "

      >

        ${word.word ?? "N/A"}



        <span class="font-semibold">

          (

          <i class="fa-solid fa-microphone-lines"></i>

          :

          ${word.pronunciation ?? "N/A"}

          )

        </span>



      </h2>





      <div class="mt-4">

        <p class="font-bold text-xl">

          Meaning

        </p>


        <p>

          ${word.meaning ?? "No meaning found"}

        </p>

      </div>





      <div class="mt-4">

        <p class="font-bold text-xl">

          Example

        </p>


        <p>

          ${word.sentence ?? "No example found"}

        </p>

      </div>





      <div class="mt-4">

        <p class="font-bold text-xl">

          Synonyms

        </p>



        <div class="flex gap-2 mt-2">

          <span class="badge">
            ${synonyms[0] ?? ""}
          </span>

          <span class="badge">
            ${synonyms[1] ?? ""}
          </span>

          <span class="badge">
            ${synonyms[2] ?? ""}
          </span>

        </div>

      </div>





      <button

        onclick="
          document
          .getElementById('my_modal_5')
          .close()
        "

        class="
          mt-5

          px-5
          py-2

          rounded-lg

          bg-[#4338ca]
          text-white

          font-semibold
        "

      >

        Complete Learning

      </button>



    </div>

  `;

  document.getElementById("my_modal_5").showModal();
};

/* =========================================================
                        SEARCH
========================================================= */

document.getElementById("btn-search").addEventListener("click", () => {
  const keyword = document
    .getElementById("input-search")
    .value.trim()
    .toLowerCase();

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const filtered = data.data.filter((word) =>
        word.word.toLowerCase().includes(keyword),
      );

      filtered.length ? showWords(filtered) : showNotFoundMessage();
    });
});

/* =========================================================
                    DEFAULT STATES
========================================================= */

const showDefaultMessage = () => {
  document.getElementById("word-container").innerHTML = `

      <div

        class="
          lg:col-span-3

          p-10

          rounded-3xl
          bg-white

          shadow-sm

          flex
          flex-col

          justify-center
          items-center

          text-center
        "

      >

        <p class="text-[#79716B] my-3">

          আপনি এখনো কোন Lesson Select করেন নাই

        </p>



        <p class="text-2xl lg:text-4xl font-medium">

          একটি Lesson Select করুন

        </p>

      </div>

    `;
};

const showNotFoundMessage = () => {
  document.getElementById("word-container").innerHTML = `

      <div

        class="
          lg:col-span-3

          p-10

          rounded-3xl
          bg-white

          shadow-sm

          flex
          flex-col

          justify-center
          items-center

          text-center
        "

      >

        <p class="text-[#79716B] my-3">

          দুঃখিত, এই শব্দটি খুঁজে পাওয়া যায়নি

        </p>



        <p class="text-2xl lg:text-4xl font-medium">

          অন্য একটি শব্দ দিয়ে চেষ্টা করুন

        </p>

      </div>

    `;
};

/* =========================================================
                          INIT
========================================================= */

lodeAllLevels();
showDefaultMessage();
