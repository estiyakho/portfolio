'use strict';

const elementToggleFunc = elem => elem.classList.toggle("active");

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

select.addEventListener("click", function() { elementToggleFunc(this); });

selectItems.forEach(item => {
  item.addEventListener("click", function() {
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    applyFilter(this.innerText.toLowerCase());
  });
});

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

const applyFilter = selectedValue => {
  filterItems.forEach(item => {
    item.classList.remove("active");
    if (selectedValue === "all" || item.dataset.category === selectedValue.replace(/\s+/g, "-")) {
      item.classList.add("active");
    }
  });
};

let lastClickedBtn = filterBtn[0];

filterBtn.forEach((btn, index) => {
  btn.addEventListener("click", function() {
    selectValue.innerText = this.innerText;
    applyFilter(this.innerText.toLowerCase());
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

navigationLinks.forEach((link, linkIndex) => {
  link.addEventListener("click", function() {
    pages.forEach((page, pageIndex) => {
      if (this.innerText.toLowerCase() === page.dataset.page) {
        page.classList.add("active");
        navigationLinks[linkIndex].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
        navigationLinks[pageIndex].classList.remove("active");
      }
    });
  });
});