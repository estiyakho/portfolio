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
navigationLinks.forEach((link) => {
  link.addEventListener("click", function() {
    const targetPage = this.innerHTML.toLowerCase().trim();
    
    pages.forEach((page, index) => {
      if (targetPage === page.dataset.page) {
        page.classList.add("active");
        navigationLinks[index].classList.add("active");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        page.classList.remove("active");
        navigationLinks[index].classList.remove("active");
      }
    });
  });
});

// Initialize by showing all projects
applyFilter("all");