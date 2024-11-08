const assetContainer = document.querySelector(".asset-container");

const createAsset = (parentEle, titleText) => {
  const container = document.createElement("div");
  container.classList.add("asset");

  const heading = document.createElement("div");
  heading.classList.add("asset-heading");

  container.appendChild(heading);

  const title = document.createElement("h2");
  title.innerText = titleText;

  heading.appendChild(title);

  const iButton = document.createElement("span");
  iButton.innerText = "i";
  iButton.classList.add("i-button");

  heading.appendChild(iButton);

  parentEle.appendChild(container);

  return container;
};

const loadPage = async () => {
  const data = await fetchData();
  console.log(data.tasks[0].assets);

  //project heading
  const projectHeading = document.querySelector(".project-heading");
  projectHeading.innerText = data.title;

  const tasks = data.tasks;

  const taskTitle = document.querySelector(".task-title");
  taskTitle.innerText = tasks[0].task_title;

  const taskDescription = document.querySelector(".task-description");
  taskDescription.innerText = tasks[0].task_description;

  const assets = tasks[0].assets;

  assets.forEach((asset, index) => {
    let assetEle = createAsset(assetContainer, asset.asset_title);
    const assetDescContainer = document.createElement("div");

    assetDescContainer.classList.add("asset-desc-container");

    const description = document.createElement("p");
    description.innerHTML = `<strong>Description</strong> : ${asset.asset_description}`;

    assetDescContainer.appendChild(description);

    let hideDes = false;
    const toggleDes = document.createElement("div");
    toggleDes.innerHTML = `<i class="fa-solid fa-caret-up"></i>`;

    toggleDes.addEventListener("click", () => {
      console.log("clicked");
      if (hideDes) {
        description.style.display = "block";
        hideDes = false;
        toggleDes.innerHTML = `<i class="fa-solid fa-caret-up"></i>`;
      } else {
        description.style.display = "none";
        hideDes = true;
        toggleDes.innerHTML = `<i class="fa-solid fa-caret-down"></i>`;
      }
    });

    assetDescContainer.appendChild(toggleDes);
    assetEle.appendChild(assetDescContainer);

    if (index === 0) {
      const ele = document.createElement("iframe");
      ele.width = "460";
      ele.height = "340";
      ele.src = `${asset.asset_content}`;

      assetEle.appendChild(ele);
    }

    if (index === 1) {
      const threadHeadings = document.createElement("div");
      threadHeadings.classList.add("thread-headings");

      let hideThread = false;
      const toggleThread = document.createElement("div");
      toggleThread.innerHTML = `<i class="fa-solid fa-caret-up"></i>`;

      const threadsContainer = document.createElement("div");
      threadsContainer.classList.add("threads-container");

      toggleThread.addEventListener("click", () => {
        console.log("clicked");
        if (hideThread) {
          threadsContainer.style.display = "block";
          hideThread = false;
          toggleThread.innerHTML = `<i class="fa-solid fa-caret-up"></i>`;
        } else {
          threadsContainer.style.display = "none";
          hideThread = true;
          toggleThread.innerHTML = `<i class="fa-solid fa-caret-down"></i>`;
        }
      });

      threadHeadings.appendChild(toggleThread);
      const threadName = document.createElement("h2");
      threadName.innerHTML = "Thread A";

      threadHeadings.appendChild(threadName);
      assetEle.appendChild(threadHeadings);

      assetEle.appendChild(threadsContainer);
      let subThreadNum = 1;

      createSubThread(threadsContainer, subThreadNum);

      const addThreadBtn = document.createElement("button");
      addThreadBtn.innerText = "+ Sub-thread";
      threadsContainer.appendChild(addThreadBtn);

      addThreadBtn.addEventListener("click", () => {
        subThreadNum = subThreadNum + 1;
        createSubThread(threadsContainer, subThreadNum);
      });

      const summary = document.createElement("div");
      threadsContainer.appendChild(summary);

      const summaryContainer = document.createElement("div");
      summaryContainer.classList.add("summary-container");

      const summaryHeading = document.createElement("h1");
      summaryHeading.innerText = `Summary for Thread A`;

      summaryContainer.appendChild(summaryHeading);

      const summaryContent = document.createElement("textarea");
      summaryContent.placeholder = "Enter Text here";

      summaryContainer.appendChild(summaryContent);

      summary.appendChild(summaryContainer);
    }

    if (index === 2) {
      createCard(assetEle);
    }

    if (index === 3) {
        create4SACard(assetEle)
    }
  });
};

function createSubThread(parentEle, subThreadNum) {
  const subThreadsEle = document.createElement("div");
  parentEle.appendChild(subThreadsEle);

  const subThreadContainer = document.createElement("div");
  subThreadContainer.classList.add("sub-thread-container");

  const subThreadHeading = document.createElement("h1");
  subThreadHeading.innerText = `Sub Thread ${subThreadNum}`;

  subThreadContainer.appendChild(subThreadHeading);

  const subThreadContent = document.createElement("textarea");
  subThreadContent.placeholder = "Enter Text here";

  subThreadContainer.appendChild(subThreadContent);

  subThreadsEle.appendChild(subThreadContainer);

  const subInterpretationContainer = document.createElement("div");
  subInterpretationContainer.classList.add("sub-interpretation-container");
  const subInterpretationHeading = document.createElement("h1");
  subInterpretationHeading.innerText = `Sub Interpretation ${subThreadNum}`;

  subInterpretationContainer.appendChild(subInterpretationHeading);

  const subInterpretationContent = document.createElement("textarea");
  subInterpretationContent.placeholder = "Enter Text here";

  subInterpretationContainer.appendChild(subInterpretationContent);

  subThreadsEle.appendChild(subInterpretationContainer);
}

function createCard(parentEle) {
  // Create card container
  const card = document.createElement("div");
  card.className = "card";

  // Title Input
  const titleField = document.createElement("div");
  titleField.className = "input-field";
  titleField.innerHTML = `
      <label for="title">Title</label>
      <input type="text" id="title" placeholder="Enter title here">
    `;
  card.appendChild(titleField);

  // Content Editor with Toolbar
  const contentField = document.createElement("div");
  contentField.className = "input-field";
  contentField.innerHTML = `
      <label for="content">Content</label>
      <div class="toolbar">
        <button><b>File</b></button>
        <button><b>Edit</b></button>
        <button><b>View</b></button>
        <button><b>Insert</b></button>
        <button><b>Format</b></button>
        <button><b>Tools</b></button>
        <button><b>Table</b></button>
        <button><b>Help</b></button>
      </div>
      <textarea class="editor" id="content" placeholder="Write your content here..."></textarea>
    `;
  card.appendChild(contentField);

  // Append card to body
  parentEle.appendChild(card);
}


function create4SACard(parentEle) {
    // Create card container
    const card = document.createElement("div");
    card.className = "fourSACard";


    // Section: Introduction
    const sectionIntro = create4SASection("Introduction", "The 4SA Method, How to bring an idea into progress?");
    card.appendChild(sectionIntro);

    // Section: Thread A
    const sectionThreadA = create4SASection("Thread A", "How are you going to develop your strategy? Which method are you going to use to develop a strategy? What if the project is lengthy?");
    card.appendChild(sectionThreadA);

    // Section: Example 1
    const sectionExample = create4SASection("Example 1", "You have a concept, How will you put it into progress?");
    card.appendChild(sectionExample);

    // Append card to body
    parentEle.appendChild(card);
  }

  // Function to create a section with expandable content
  function create4SASection(title, content) {
    const section = document.createElement("div");
    section.className = "fourSACard-section";

    // Section Header
    const sectionHeader = document.createElement("div");
    sectionHeader.className = "fourSACard-section-header";
    sectionHeader.innerHTML = `
      <span>${title}</span>
      <span>▾</span>
    `;
    section.appendChild(sectionHeader);

    // Section Content
    const sectionContent = document.createElement("div");
    sectionContent.className = "fourSACard-section-content";
    sectionContent.innerText = content;
    section.appendChild(sectionContent);

    // See More link
    const seeMore = document.createElement("div");
    seeMore.className = "fourSACard-see-more";
    seeMore.innerText = "See More";
    section.appendChild(seeMore);

    // Toggle content visibility on header click
    sectionHeader.addEventListener("click", () => {
      const isVisible = sectionContent.style.display === "block";
      sectionContent.style.display = isVisible ? "none" : "block";
    });

    return section;
  }


const fetchData = async () => {
  const res = await fetch("./data.json");
  data = await res.json();
  return data;
};


const journeyBoardToggleArrow = document.querySelector(".toggle-arrow");
const journeyBoard = document.querySelector(".journey-board")

journeyBoardToggleArrow.addEventListener("click", ()=>{
    console.log("clicked")
    let res = journeyBoard.classList.contains("journey-coard-collapsed");
    if(res){
        journeyBoard.classList.remove("journey-board-collapsed");
        journeyBoard.classList.add("journey-board-expanded");
    }
})

loadPage();
