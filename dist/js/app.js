(() => {
    "use strict";
    function btnUp() {
        const buttons = document.querySelectorAll("[data-btn-up]");
        if (buttons.length) buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            });
        });
    }
    function burger() {
        const burgerBtn = document.querySelector("#burger-toggle");
        const burger = document.querySelector("#burger");
        if (burger) {
            burger.addEventListener("click", e => e.stopPropagation());
            document.body.addEventListener("click", burgerClose);
            burgerBtn.addEventListener("click", e => {
                e.stopPropagation();
                if (burger.classList.contains("_open")) burgerClose(); else burgerOpen();
            });
            function burgerClose() {
                burger.classList.remove("_open");
                burgerBtn.classList.remove("_active");
                document.body.classList.remove("body-hidden");
            }
            function burgerOpen() {
                burger.classList.add("_open");
                burgerBtn.classList.add("_active");
                document.body.classList.add("body-hidden");
            }
            function updateHeightBurger() {
                burger.style.maxHeight = `${window.visualViewport.height}px`;
            }
            window.visualViewport.addEventListener("resize", updateHeightBurger);
            window.visualViewport.addEventListener("scroll", updateHeightBurger);
            updateHeightBurger();
        }
    }
    function burgerMenu() {
        const list = document.querySelector(".burger__list");
        if (list) {
            const itemsHasChildren = list.querySelectorAll(".menu-item-has-children");
            if (itemsHasChildren.length) {
                const burgerMenuStart = document.querySelector("#burger-menu-start");
                const burgerMenuInside = document.querySelector("#burger-menu-inside");
                const burgerInsidePrev = burgerMenuInside.querySelector(".burger__prev-btn");
                itemsHasChildren.forEach(item => {
                    const btn = document.createElement("div");
                    btn.classList.add("btn");
                    item.appendChild(btn);
                    btn.addEventListener("click", () => {
                        const subMenu = item.querySelector(".sub-menu");
                        const burgerList = document.createElement("ul");
                        burgerList.classList.add("list", "burger__list");
                        burgerList.innerHTML = subMenu.innerHTML;
                        burgerMenuInside.appendChild(burgerList);
                        openInside();
                    });
                    burgerInsidePrev.addEventListener("click", openStart);
                    function openInside() {
                        burgerMenuStart.classList.remove("_show");
                        setTimeout(() => {
                            burgerMenuInside.classList.add("_active");
                            burgerMenuStart.classList.remove("_active");
                            setTimeout(() => {
                                burgerMenuInside.classList.add("_show");
                            }, 150);
                        }, 150);
                    }
                    function openStart() {
                        burgerMenuInside.classList.remove("_show");
                        setTimeout(() => {
                            burgerMenuStart.classList.add("_active");
                            burgerMenuInside.classList.remove("_active");
                            setTimeout(() => {
                                burgerMenuStart.classList.add("_show");
                                const burgerInsideList = burgerMenuInside.querySelector(".burger__list");
                                if (burgerInsideList) burgerInsideList.remove();
                            }, 150);
                        }, 150);
                    }
                });
            }
        }
    }
    function buttonsNote() {
        const butons = document.querySelectorAll("[data-note]");
        if (butons.length) butons.forEach(btn => {
            btn.addEventListener("click", () => {
                const selectorTarget = btn.dataset.targetNote;
                const target = document.querySelector(selectorTarget);
                const value = btn.dataset.note;
                if (target) target.value = value;
            });
        });
    }
    function handlerCookie() {
        const item = document.querySelector(".cookie");
        if (item) {
            const btnClose = item.querySelector(".cookie__close");
            const btnSubmit = item.querySelector(".cookie__btn");
            btnClose.addEventListener("click", () => {
                item.style.opacity = 0;
                setTimeout(() => {
                    item.remove();
                }, 300);
            });
            btnSubmit.addEventListener("click", () => {
                item.style.opacity = 0;
                setTimeout(() => {
                    item.remove();
                }, 300);
            });
        }
    }
    function headerScroll() {
        const header = document.querySelector(".header-s");
        if (header) {
            let lastScrollTop = 0;
            window.addEventListener("scroll", () => {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > header.clientHeight * 2) header.classList.add("_scroll"); else header.classList.remove("_scroll");
                lastScrollTop = scrollTop;
            });
        }
    }
    function inputmask() {
        const inputs = document.querySelectorAll('input[type="tel"]');
        const im = new Inputmask("+7 (999) 999-99-99");
        im.mask(inputs);
    }
    function createScript(url, type) {
        if (!url) return;
        return new Promise((resolve, reject) => {
            const script = document.querySelector(`script[src="${url}"]`);
            if (script) resolve(script); else {
                const htmlScript = document.createElement("script");
                htmlScript.src = url;
                if (type) htmlScript.type = type;
                htmlScript.onload = () => {
                    resolve(htmlScript);
                };
                htmlScript.onerror = () => {
                    reject(new Error(`Не удалось загрузить скрипт: ${url}`));
                };
                document.head.appendChild(htmlScript);
            }
        });
    }
    function map() {
        const maps = document.querySelectorAll(".map");
        if (maps.length) {
            maps.forEach(map => {
                const options = {
                    root: null,
                    rootMargin: "0px",
                    scrollMargin: "0px",
                    threshold: .01
                };
                function callback(entries, observer) {
                    entries.forEach(entry => {
                        const target = entry.target;
                        if (entry.isIntersecting) {
                            createScript("https://api-maps.yandex.ru/2.1/?apikey=b46e9249-4925-4460-b11c-3aaf76ad0115&lang=ru_RU", "text/javascript").then(() => handlerCreateMap(target));
                            observer.unobserve(target);
                        }
                    });
                }
                const observer = new IntersectionObserver(callback, options);
                observer.observe(map);
            });
            function handlerCreateMap(map) {
                const center = JSON.parse(map.dataset.center);
                const zoom = Number(map.dataset.zoom);
                const iconHref = map.dataset.icon;
                let objectMark = {};
                if (iconHref) objectMark = {
                    iconLayout: "default#image",
                    iconImageHref: iconHref,
                    iconImageSize: [ 60, 75 ],
                    iconImageOffset: [ -30, -70 ]
                };
                function init() {
                    const htmlMap = new ymaps.Map(map, {
                        center,
                        zoom
                    });
                    const placemark = new ymaps.Placemark(center, {}, objectMark);
                    htmlMap.geoObjects.add(placemark);
                    htmlMap.controls.remove("geolocationControl");
                    htmlMap.controls.remove("searchControl");
                    htmlMap.controls.remove("trafficControl");
                    htmlMap.controls.remove("typeSelector");
                    htmlMap.controls.remove("fullscreenControl");
                    htmlMap.controls.remove("rulerControl");
                }
                ymaps.ready(init);
            }
        }
    }
    function mediaAdaptive() {
        function DynamicAdapt(type) {
            this.type = type;
        }
        DynamicAdapt.prototype.init = function() {
            const _this = this;
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = document.querySelectorAll("[data-da]");
            for (let i = 0; i < this.nodes.length; i++) {
                const node = this.nodes[i];
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(dataArray[0].trim());
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }
            this.arraySort(this.оbjects);
            this.mediaQueries = Array.prototype.map.call(this.оbjects, function(item) {
                return "(" + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
            }, this);
            this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function(item, index, self) {
                return Array.prototype.indexOf.call(self, item) === index;
            });
            for (let i = 0; i < this.mediaQueries.length; i++) {
                const media = this.mediaQueries[i];
                const mediaSplit = String.prototype.split.call(media, ",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function(item) {
                    return item.breakpoint === mediaBreakpoint;
                });
                matchMedia.addListener(function() {
                    _this.mediaHandler(matchMedia, оbjectsFilter);
                });
                this.mediaHandler(matchMedia, оbjectsFilter);
            }
        };
        DynamicAdapt.prototype.mediaHandler = function(matchMedia, оbjects) {
            if (matchMedia.matches) for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            } else for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                if (оbject.element.classList.contains(this.daClassname)) this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        };
        DynamicAdapt.prototype.moveTo = function(place, element, destination) {
            element.classList.add(this.daClassname);
            if (place === "last" || place >= destination.children.length) {
                destination.insertAdjacentElement("beforeend", element);
                return;
            }
            if (place === "first") {
                destination.insertAdjacentElement("afterbegin", element);
                return;
            }
            destination.children[place].insertAdjacentElement("beforebegin", element);
        };
        DynamicAdapt.prototype.moveBack = function(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== void 0) parent.children[index].insertAdjacentElement("beforebegin", element); else parent.insertAdjacentElement("beforeend", element);
        };
        DynamicAdapt.prototype.indexInParent = function(parent, element) {
            const array = Array.prototype.slice.call(parent.children);
            return Array.prototype.indexOf.call(array, element);
        };
        DynamicAdapt.prototype.arraySort = function(arr) {
            if (this.type === "min") Array.prototype.sort.call(arr, function(a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if (a.place === "first" || b.place === "last") return -1;
                    if (a.place === "last" || b.place === "first") return 1;
                    return a.place - b.place;
                }
                return a.breakpoint - b.breakpoint;
            }); else {
                Array.prototype.sort.call(arr, function(a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if (a.place === "first" || b.place === "last") return 1;
                        if (a.place === "last" || b.place === "first") return -1;
                        return b.place - a.place;
                    }
                    return b.breakpoint - a.breakpoint;
                });
                return;
            }
        };
        const da = new DynamicAdapt("max");
        da.init();
    }
    function more() {
        const buttons = document.querySelectorAll("[data-more-btn]");
        if (buttons.length) buttons.forEach(btn => {
            const containerId = btn.dataset.moreBtn;
            const container = document.querySelector(containerId);
            const childrens = Array.from(container.children).filter(item => window.getComputedStyle(item).display === "none");
            const spanBtn = btn.querySelector("span");
            const startTextBTn = spanBtn.textContent;
            console.log(childrens.length, Array.from(container.children).length);
            if (childrens.length === 0) btn.remove(); else btn.addEventListener("click", () => {
                if (!btn.classList.contains("_active")) {
                    btn.classList.add("_active");
                    spanBtn.textContent = "Свернуть текст";
                    childrens.forEach(c => {
                        c.style.display = "block";
                        setTimeout(() => {
                            c.style.opacity = 1;
                        }, 100);
                    });
                } else {
                    btn.classList.remove("_active");
                    spanBtn.textContent = startTextBTn;
                    childrens.forEach(c => {
                        c.style.opacity = 0;
                        setTimeout(() => {
                            c.style.display = "none";
                        }, 100);
                    });
                }
            });
        });
    }
    function sliders() {
        const advSlider = document.querySelector(".s-adv__slider");
        if (advSlider) {
            new Swiper(advSlider, {
                speed: 900,
                spaceBetween: 20,
                slidesPerView: "auto",
                navigation: {
                    prevEl: ".s-adv .slider-arrow._prev",
                    nextEl: ".s-adv .slider-arrow._next"
                },
                breakpoints: {
                    992: {
                        spaceBetween: 25,
                        slidesPerView: 1
                    },
                    768: {
                        spaceBetween: 20,
                        slidesPerView: 1
                    }
                }
            });
        }
        const stepsSlider = document.querySelector(".s-steps__slider");
        if (stepsSlider && window.matchMedia("(max-width:1199px)").matches) {
            new Swiper(stepsSlider, {
                speed: 900,
                spaceBetween: 15,
                slidesPerView: "auto",
                breakpoints: {
                    576: {
                        spaceBetween: 20,
                        slidesPerView: "auto"
                    }
                }
            });
        }
        const casesSlider = document.querySelector(".s-cases__slider");
        if (casesSlider) {
            new Swiper(casesSlider, {
                speed: 900,
                spaceBetween: 20,
                slidesPerView: 1,
                pagination: {
                    el: ".s-cases .slider-fraction",
                    type: "fraction"
                },
                navigation: {
                    prevEl: ".s-cases .slider-arrow._prev",
                    nextEl: ".s-cases .slider-arrow._next"
                }
            });
        }
        const reviewsSliders = document.querySelectorAll(".s-reviews__slider");
        if (reviewsSliders.length) reviewsSliders.forEach(slider => {
            new Swiper(slider, {
                speed: 900,
                spaceBetween: 15,
                slidesPerView: "auto",
                navigation: {
                    prevEl: slider.nextElementSibling.querySelector(".slider-arrow._prev"),
                    nextEl: slider.nextElementSibling.querySelector(".slider-arrow._next")
                },
                breakpoints: {
                    992: {
                        spaceBetween: 20,
                        slidesPerView: 3
                    }
                }
            });
        });
        const locationSlider = document.querySelector(".s-location__slider");
        if (locationSlider) {
            new Swiper(locationSlider, {
                speed: 900,
                spaceBetween: 15,
                slidesPerView: "auto"
            });
        }
        const gallerySlider = document.querySelector(".s-gallery__slider");
        if (gallerySlider) {
            new Swiper(gallerySlider, {
                speed: 900,
                slidesPerView: "auto",
                spaceBetween: 25,
                autoplay: {
                    delay: 3500
                },
                navigation: {
                    prevEl: ".s-gallery .slider-arrow._prev",
                    nextEl: ".s-gallery .slider-arrow._next"
                }
            });
        }
        const partnersSlider = document.querySelector(".s-partners__slider");
        if (partnersSlider && window.matchMedia("(max-width:991px)").matches) {
            new Swiper(partnersSlider, {
                slidesPerView: "auto",
                spaceBetween: 16,
                speed: 11e3,
                watchOverflow: true,
                loop: true,
                allowTouchMove: false,
                watchSlidesProgress: true,
                a11y: false,
                autoplay: {
                    delay: 0
                }
            });
        }
        const overviewSlider = document.querySelector(".s-overview__slider");
        if (overviewSlider) {
            new Swiper(overviewSlider, {
                speed: 900,
                spaceBetween: 15,
                slidesPerView: "auto",
                autoplay: {
                    delay: 4e3
                },
                navigation: {
                    prevEl: ".s-overview .slider-arrow._prev",
                    nextEl: ".s-overview .slider-arrow._next"
                },
                breakpoints: {
                    768: {
                        spaceBetween: 25,
                        slidesPerView: "auto"
                    }
                }
            });
        }
        const selectionSlider = document.querySelector(".s-selection__slider");
        if (selectionSlider) {
            new Swiper(selectionSlider, {
                speed: 900,
                spaceBetween: 15,
                slidesPerView: "auto",
                autoplay: {
                    delay: 4e3
                },
                breakpoints: {
                    992: {
                        spaceBetween: 20,
                        slidesPerView: 3
                    },
                    768: {
                        spaceBetween: 20,
                        slidesPerView: "auto"
                    }
                }
            });
        }
    }
    function spoller() {
        const spollersArray = document.querySelectorAll("[data-spollers]");
        if (spollersArray.length > 0) {
            const spollersRegular = Array.from(spollersArray).filter(function(item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            });
            if (spollersRegular.length) initSpollers(spollersRegular);
            let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach(mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", function() {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                });
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.forEach(spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add("_spoller-init");
                        initSpollerBody(spollersBlock);
                        spollersBlock.addEventListener("click", setSpollerAction);
                    } else {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                        spollersBlock.removeEventListener("click", setSpollerAction);
                    }
                });
            }
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                if (spollerTitles.length) {
                    spollerTitles = Array.from(spollerTitles).filter(item => item.closest("[data-spollers]") === spollersBlock);
                    spollerTitles.forEach(spollerTitle => {
                        if (hideSpollerBody) {
                            spollerTitle.removeAttribute("tabindex");
                            if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                        } else {
                            spollerTitle.setAttribute("tabindex", "-1");
                            spollerTitle.nextElementSibling.hidden = false;
                        }
                    });
                }
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("[data-spoller]")) {
                    const spollerTitle = el.closest("[data-spoller]");
                    const spollersBlock = spollerTitle.closest("[data-spollers]");
                    const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (!spollersBlock.querySelectorAll("._slide").length) {
                        if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                        spollerTitle.classList.toggle("_spoller-active");
                        _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                    }
                    e.preventDefault();
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                    spollerActiveTitle.classList.remove("_spoller-active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                }
            }
            const spollersClose = document.querySelectorAll("[data-spoller-close]");
            if (spollersClose.length) document.addEventListener("click", function(e) {
                const el = e.target;
                if (!el.closest("[data-spollers]")) spollersClose.forEach(spollerClose => {
                    const spollersBlock = spollerClose.closest("[data-spollers]");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    spollerClose.classList.remove("_spoller-active");
                    _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                });
            });
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter(function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            });
            if (media.length) {
                const breakpointsArray = [];
                media.forEach(item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                });
                let mdQueries = breakpointsArray.map(function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                });
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach(breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter(function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        });
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    });
                    return mdQueriesArray;
                }
            }
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout(() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }, duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout(() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }, duration);
            }
        };
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
        };
        function uniqArray(array) {
            return array.filter(function(item, index, self) {
                return self.indexOf(item) === index;
            });
        }
    }
    function videoPlayer() {
        const players = document.querySelectorAll(".video-player");
        if (players.length) players.forEach(player => {
            player.querySelector(".video-player__btn");
            const video = player.querySelector(".video-player__video");
            player.addEventListener("click", () => {
                if (player.classList.contains("_playing")) {
                    player.classList.remove("_playing");
                    video.pause();
                } else {
                    if (!video.src) {
                        const srcVideo = video.dataset.src;
                        video.src = srcVideo;
                    }
                    player.classList.add("_playing");
                    video.play();
                }
            });
            video.addEventListener("ended", () => {
                console.log("end");
                player.classList.remove("_playing");
            });
        });
    }
    document.addEventListener("DOMContentLoaded", () => {
        spoller();
        inputmask();
        burgerMenu();
        buttonsNote();
        burger();
        sliders();
        map();
        btnUp();
        headerScroll();
        more();
        handlerCookie();
        videoPlayer();
        mediaAdaptive();
        Fancybox.bind("[data-fancybox]", {
            closeButton: false
        });
    });
})();