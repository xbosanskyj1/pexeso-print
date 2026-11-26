const filesInput = document.getElementById("files");
const pagesContainer = document.getElementById("pages");
const info = document.getElementById("info");
const backInfo = document.getElementById("backInfo");
let backImage = null;

let images = [];

document.getElementById("backImage").addEventListener("change", function () {
  const file = this.files[0];
  if (file && file.type.startsWith("image/")) {
    backImage = this.files[0];

    backInfo.textContent = "Zadná strana: " + backImage.name;

    renderPages();
  }

  this.value = "";
});

filesInput.addEventListener("change", function () {
  const files = Array.from(this.files);

  const newImages = files.filter((file) => file.type.startsWith("image/"));

  const remaining = 24 - images.length;

  if (remaining <= 0) {
    alert("Maximum is 24 images!");
    this.value = "";
    return;
  }

  const allowedImages = newImages.slice(0, remaining);

  images = [...images, ...allowedImages];

  if (newImages.length > remaining) {
    alert("You can add only 24 images in total!");
  }

  renderPages();

  // Umožní opätovne vybrať aj ten istý obrázok
  this.value = "";
});

function renderPages() {
  pagesContainer.innerHTML = "";

  const perPage = 24;

  for (let i = 0; i < images.length; i += perPage) {
    const page = document.createElement("div");
    page.className = "page";

    const pageImages = images.slice(i, i + perPage);

    pageImages.forEach((file) => {
      const wrapper = document.createElement("div");
      wrapper.className = "image-wrapper";

      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);

      wrapper.appendChild(img);
      page.appendChild(wrapper);
    });

    pagesContainer.appendChild(page);
  }

  const pageCount = Math.ceil(images.length / perPage);

  info.textContent =
    "Number of images: " +
    images.length +
    " | Number of pages A4: " +
    pageCount;

  if (backImage) {
    const page = document.createElement("div");
    page.className = "page";

    for (let i = 0; i < 24; i++) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(backImage);

      page.appendChild(img);
    }

    pagesContainer.appendChild(page);
  }
}

function clearImages() {
  images = [];
  filesInput.value = "";
  pagesContainer.innerHTML = "";
  info.textContent = "The images have not been selected yet.";
  backInfo.textContent = "The back image has not been selected yet.";
}
