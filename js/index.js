const translate = document.querySelectorAll(".translate");
const big_title = document.querySelector(".big-title");
const header = document.querySelector("header");
const shadow = document.querySelector(".shadow");
const section = document.querySelector("section");
const border = document.querySelector(".border");
// const content = document.querySelector(".content");
// const image_container = document.querySelector(".img-container");
// const opacity = document.querySelectorAll(".opacity");

let header_height = header.offsetHeight;
let section_height = section.offsetHeight;

window.addEventListener('scroll', () => {
    let scroll = window.pageYOffset;
    let sectionY = section.getBoundingClientRect();

    translate.forEach(element => {
        let speed = element.dataset.speed;
        element.style.transform = `translateY(${scroll * speed}px)`;
    });

    // 陰影效果
    shadow.style.height = `${scroll * 0.5 + 300}px`;

    // 標題分隔線
    border.style.width = `${scroll / (sectionY.top + section_height) * 60}%`;

    // 標題文字淡出效果
    // big_title.style.opacity = - scroll / (header_height / 2) + 1;

    // // 內容區淡入效果
    // opacity.forEach(element => {
    //     element.style.opacity = scroll / (sectionY.top + section_height);
    // })

    // // 文字滑動效果
    // content.style.transform = `translateY(${scroll / (section_height + sectionY.top) * -50 + 50}px)`;

    // // 圖片滑動效果
    // image_container.style.transform = `translateY(${scroll / (section_height + sectionY.top) * 50 - 50}px)`;


})

// 旋轉文字
const text = document.querySelector('.circle-text');
text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>");

const element = document.querySelectorAll('span');
for (let i = 0; i < element.length; i++) {
    element[i].style.transform = "rotate(" + i * 16.5 + "deg)"
}

// 頁面滾動效果(指定頁面)
const links = document.querySelectorAll("a");

for (const link of links) {
    link.addEventListener("click", clickHandler);
}

function clickHandler(e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop;

    scroll({
        top: offsetTop,
        behavior: "smooth"
    });
}