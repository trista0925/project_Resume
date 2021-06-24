// 視差效果
const translate = document.querySelectorAll(".translate");
const big_title = document.querySelector(".big-title");
const header = document.querySelector("header");
const shadow = document.querySelector(".shadow");
const section = document.querySelector("section");
// const border = document.querySelector(".border");
// const content = document.querySelector(".content");
// const image_container = document.querySelector(".img-container");
// const opacity = document.querySelectorAll(".opacity");

let header_height = header.offsetHeight;
// let section_height = section.offsetHeight;

window.addEventListener('scroll', () => {
    let scroll = window.pageYOffset;
    let sectionY = section.getBoundingClientRect();

    translate.forEach(element => {
        let speed = element.dataset.speed;
        element.style.transform = `translateY(${scroll * speed}px)`;
    });

    // 陰影效果
    shadow.style.height = `${scroll * 0.5 + 300}px`;

    // // 標題分隔線
    // border.style.width = `${scroll / (sectionY.top + section_height) * 100}%`;

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

// 頁面滾動效果(指定頁面)
const links = document.querySelectorAll(".smooth a");

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

// modal
var Modal = (function() {

    var trigger = $qsa('.modal-trigger'); // what you click to activate the modal
    var modals = $qsa('.modal'); // the entire modal (takes up entire window)
    var modalsbg = $qsa('.modal-bg'); // the entire modal (takes up entire window)
    var content = $qsa('.modal-content'); // the inner content of the modal
    var closers = $qsa('.modal-close'); // an element used to close the modal
    var w = window;
    var isOpen = false;
    var contentDelay = 400; // duration after you click the button and wait for the content to show
    var len = trigger.length;

    // make it easier for yourself by not having to type as much to select an element
    function $qsa(el) {
        return document.querySelectorAll(el);
    }

    var getId = function(event) {

        event.preventDefault();
        var self = this;
        // get the value of the data-modal attribute from the button
        var modalId = self.dataset.modal;
        var len = modalId.length;
        // remove the '#' from the string
        var modalIdTrimmed = modalId.substring(1, len);
        // select the modal we want to activate
        var modal = document.getElementById(modalIdTrimmed);
        // execute function that creates the temporary expanding div
        makeDiv(self, modal);
    };

    var makeDiv = function(self, modal) {

        var fakediv = document.getElementById('modal_temp');

        /**
         * if there isn't a 'fakediv', create one and append it to the button that was
         * clicked. after that execute the function 'moveTrig' which handles the animations.
         */

        if (fakediv === null) {
            var div = document.createElement('div');
            div.id = 'modal_temp';
            self.appendChild(div);
            moveTrig(self, modal, div);
        }
    };

    var moveTrig = function(trig, modal, div) {
        var trigProps = trig.getBoundingClientRect();
        var m = modal;
        var mProps = m.querySelector('.modal-content').getBoundingClientRect();
        var transX, transY, scaleX, scaleY;
        var xc = w.innerWidth / 2;
        var yc = w.innerHeight / 2;

        // this class increases z-index value so the button goes overtop the other buttons
        trig.classList.add('modal-trigger--active');

        // these values are used for scale the temporary div to the same size as the modal
        scaleX = mProps.width / trigProps.width;
        scaleY = mProps.height / trigProps.height;

        scaleX = scaleX.toFixed(3); // round to 3 decimal places
        scaleY = scaleY.toFixed(3);


        // these values are used to move the button to the center of the window
        transX = Math.round(xc - trigProps.left - trigProps.width / 2);
        transY = Math.round(yc - trigProps.top - trigProps.height / 2);

        // if the modal is aligned to the top then move the button to the center-y of the modal instead of the window
        if (m.classList.contains('')) {
            transY = Math.round(mProps.height / 2 + mProps.top - trigProps.top - trigProps.height / 2);
        }


        // translate button to center of screen
        // trig.style.transform = 'translate(' + transX + 'px, ' + transY + 'px)';
        // trig.style.webkitTransform = 'translate(' + transX + 'px, ' + transY + 'px)';
        // expand temporary div to the same size as the modal
        div.style.transform = 'scale(' + scaleX + ',' + scaleY + ')';
        div.style.webkitTransform = 'scale(' + scaleX + ',' + scaleY + ')';


        window.setTimeout(function() {
            window.requestAnimationFrame(function() {
                open(m, div);
            });
        }, contentDelay);

    };

    var open = function(m, div) {

        if (!isOpen) {
            // body增加overflow - 第1種方法
            // document.body.style.overflowY = "hidden";

            // body增加overflow - 第2種方法
            document.querySelector('body').classList.add('overflow-hidden');

            // select the content inside the modal
            var content = m.querySelector('.modal-content');
            // reveal the modal
            m.classList.add('modal--active');
            // reveal the modal content
            content.classList.add('modal-content--active');

            /**
             * when the modal content is finished transitioning, fadeout the temporary
             * expanding div so when the window resizes it isn't visible ( it doesn't
             * move with the window).
             */

            content.addEventListener('transitionend', hideDiv, false);

            isOpen = true;
        }

        function hideDiv() {
            // fadeout div so that it can't be seen when the window is resized
            div.style.opacity = '0';
            content.removeEventListener('transitionend', hideDiv, false);
        }
    };

    var close = function(event) {


        event.preventDefault();
        event.stopImmediatePropagation();

        var target = event.target;
        var div = document.getElementById('modal_temp');

        /**
         * make sure the modal-bg or modal-close was clicked, we don't want to be able to click
         * inside the modal and have it close.
         */

        if (isOpen && target.classList.contains('modal-bg') || target.classList.contains('modal-close')) {

            // body移除overflow - 第1種方法
            // document.body.style.overflowY = "auto";

            // body移除overflow - 第2種方法
            document.querySelector('body').classList.remove('overflow-hidden');

            // make the hidden div visible again and remove the transforms so it scales back to its original size
            div.style.opacity = '1';
            div.removeAttribute('style');

            /**
             * iterate through the modals and modal contents and triggers to remove their active classes.
             * remove the inline css from the trigger to move it back into its original position.
             */

            for (var i = 0; i < len; i++) {
                modals[i].classList.remove('modal--active');
                content[i].classList.remove('modal-content--active');
                trigger[i].style.transform = 'none';
                trigger[i].style.webkitTransform = 'none';
                trigger[i].classList.remove('modal-trigger--active');
            }

            // when the temporary div is opacity:1 again, we want to remove it from the dom
            div.addEventListener('transitionend', removeDiv, false);

            isOpen = false;

        }

        function removeDiv() {
            setTimeout(function() {
                window.requestAnimationFrame(function() {
                    // remove the temp div from the dom with a slight delay so the animation looks good
                    div.remove();
                });
            }, contentDelay - 50);
        }

    };

    var bindActions = function() {
        for (var i = 0; i < len; i++) {
            trigger[i].addEventListener('click', getId, false);
            closers[i].addEventListener('click', close, false);
            modalsbg[i].addEventListener('click', close, false);
        }
    };

    var init = function() {
        bindActions();
    };

    return {
        init: init
    };

}());

Modal.init();