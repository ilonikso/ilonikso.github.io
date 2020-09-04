// Fetch JSON data from server
window.addEventListener("DOMContentLoaded", () => {
    fetch("js/portfolioItems.json")
        .then((res) => res.json())
        .then((data) => {
            // Create new modals
            document.body.addEventListener('click', (e) => manageModal(data, e));
        })
        .catch((err) => console.log(err));
});

// Create new modal or open old one
const manageModal = function(data, e){
    e.preventDefault();
    
    // Get data from JSON
    let arr = data;
    
    if(e.target !== document.body){
        if(e.target.parentElement.parentElement.classList.contains('photo__item')){
    
            // Catch the modal item
            let card = e.target.parentElement.parentElement;
            let dataModal = card.getAttribute('data-modal');
    
            // Check for old modals
            let modals = Array.from(document.querySelectorAll('.modal__container .modal'));
    
            // Check for the presence of the module in the container - if not - create a new one, if there is - open an existing module
            if(!modals.some((item) => item.getAttribute('data-modal') === dataModal)){
                
                // Find the data for modal
                let modalData = arr.items.find((item) => item.id == dataModal);
                // Create modal window
                let modal = createPortolioItem(modalData);
                // Add modal window to container
                document.querySelector(".modal__container").appendChild(modal);
                modalShow(modal);
    
                // Add event listeners to modal window
                modalListeners();
                modalImagesSwitch();
    
            } else{
                // Modal was created before - find and open existing modal window
                const modalElem = document.querySelector('.modal[data-modal="' + dataModal + '"]');
                modalShow(modalElem);
            }
        }
    }
    
};

// Create portfolio modal template fucntion
const createPortolioItem = function(item) {
    let block = document.createElement("div");
    block.classList.add("modal");
    block.setAttribute("data-modal", item.id);

    // Add close button
    block.innerHTML =
        '<svg class="modal__cross js-modal-close" xmlns="http://www.w3.org/2000/svg"               viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>';

    // Create wrapper
    let wrapper = document.createElement("div");
    wrapper.classList.add("modal__wrapper");

    let images = document.createElement("div");
    images.classList.add("modal__image");

    images.innerHTML = `
    <div class="modal__image-box">
        <picture class="modal__item-img slide-active" data-img="1">
            <source type="image/webp" srcset="img/raster/${item.imageName}review.webp 1x , img/raster/${item.imageName}review.webp 2x">
            <img src="img/raster/${item.imageName}review.png" srcset="img/raster/${item.imageName}review.png 2x" alt="Seabright web site review">
        </picture>
        <picture class="modal__item-img" data-img="2">
            <source type="image/webp" srcset="img/raster/${item.imageName}mobile.webp 1x , img/raster/${item.imageName}mobile.webp 2x">
            <img src="img/raster/${item.imageName}mobile.png" srcset="img/raster/${item.imageName}mobile.png 2x" alt="Seabright web site review">
        </picture>
        <picture class="modal__item-img" data-img="3">
            <source type="image/webp" srcset="img/raster/${item.imageName}tablet.webp 1x , img/raster/${item.imageName}tablet.webp 2x">
            <img src="img/raster/${item.imageName}tablet.png" srcset="img/raster/${item.imageName}tablet.png 2x" alt="Seabright web site review">
        </picture>
        <picture class="modal__item-img" data-img="4">
            <source type="image/webp" srcset="img/raster/${item.imageName}desktop.webp 1x , img/raster/${item.imageName}desktop.webp 2x">
            <img src="img/raster/${item.imageName}desktop.png" srcset="img/raster/${item.imageName}desktop.png 2x" alt="Seabright web site review">
        </picture>

    </div>

    <div class="modal__buttons">
        <label class="modal__button modal__button--active" data-img="1">
            <input type="button" value="review">
            <svg width="65" height="40" class="modal__button-svg">
                <use xlink:href="img/symbols.svg#devices-icon"></use>
            </svg>
        </label>
        <label class="modal__button button-mobile" data-img="2">
            <input type="button" value="mobile">
            <svg width="40" height="31" class="modal__button-svg">
                <use xlink:href="img/symbols.svg#mobile-icon"></use>
            </svg>
        </label>
        <label class="modal__button button-tablet" data-img="3">
            <input type="button" value="tablet">
            <svg width="30" height="36" class="modal__button-svg">
                <use xlink:href="img/symbols.svg#tablet-icon"></use>
            </svg>
        </label>
        <label class="modal__button button-desktop" data-img="4">
            <input type="button" value="desktop">
            <svg width="65" height="40" class="modal__button-svg">
                <use xlink:href="img/symbols.svg#desktop-icon"></use>
            </svg>
        </label>

    </div>
    `;

    let text = document.createElement("div");
    text.classList.add("modal__text");

    text.innerHTML = `
    <h4 class="modal__title">${item.title}</h4>
    <p class="modal__text-description">${item.desc}</p>
    `;

    let list = document.createElement("ul");
    item.list.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });

    let spans = document.createElement("div");
    spans.classList.add("modal__blocks");

    item.technologies.forEach(item => {
        let span = document.createElement("span");
        span.classList.add("feaures__item", "features--header");
        span.textContent = item;
        spans.appendChild(span);
    });

    // Add list to text block
    text.appendChild(list);

    // Add Technologies block to text block
    text.appendChild(spans);

    // Add Images to wrapper
    wrapper.appendChild(images);
    // Add Text to wrapper
    wrapper.appendChild(text);

    // Add wrapper to block
    block.appendChild(wrapper);

    let link = document.createElement("a");
    link.setAttribute("href", item.link);
    link.setAttribute("target", "_blank");
    link.classList.add("modal__link", "button");
    link.textContent = "Live preview";

    // Add link to block
    block.appendChild(link);

    return block;
};

// Add Event Listeners to all windows
const modalListeners = function() {
    const modalButtons = document.querySelectorAll(".js-open-modal"),
        overlay = document.querySelector(".js-overlay-modal"),
        closeButtons = document.querySelectorAll(".js-modal-close");
        

    closeButtons.forEach(function(item) {
        item.addEventListener("click", function(e) {
            const parentModal = this.closest(".modal");

            parentModal.classList.remove("active");
            overlay.classList.remove("active");
            document.body.style.overflow = "inherit";
        });
    }); 

    document.body.addEventListener("keyup", function(e) {
            const key = e.keyCode;

            if (key == 27) {
                document.querySelector(".modal.active").classList.remove("active");
                document.querySelector(".overlay").classList.remove("active");
                document.body.style.overflow = "inherit";
            }
        },
        false
    );

    overlay.addEventListener("click", function() {
        document.querySelector(".modal.active").classList.remove("active");
        this.classList.remove("active");

        document.body.style.overflow = "inherit";
    });
};

// Images listener function
const modalImagesSwitch = function() {
    const modalButtonsImg = document.querySelectorAll(".modal__button");

    modalButtonsImg.forEach(function(item) {
        /* Назначаем каждой кнопке обработчик клика */
        item.addEventListener("click", function(e) {
            e.preventDefault();

            let modalImgActive = document.querySelectorAll(".modal__item-img.slide-active");
            for (let b = 0; b < modalImgActive.length; ++b) {
                modalImgActive[b].classList.remove("slide-active");
            }

            let modalButtonActiveDel = document.querySelectorAll(".modal__button.modal__button--active");
            for (let d = 0; d < modalButtonActiveDel.length; ++d) {
                modalButtonActiveDel[d].classList.remove("modal__button--active");
            }

            let modalIdImg = this.getAttribute("data-img"),
                modalElemImg = document.querySelectorAll('.modal__item-img[data-img="' + modalIdImg + '"]');

            for (let i = 0; i < modalElemImg.length; ++i) {
                modalElemImg[i].classList.add("slide-active");
            }

            let modalButtonActive = document.querySelectorAll('.modal__button[data-img="' + modalIdImg + '"]');

            for (let c = 0; c < modalButtonActive.length; ++c) {
                modalButtonActive[c].classList.add("modal__button--active");
            }
        });
    });
};

// Show modal
const modalShow = function(item){

    item.classList.add("active");
    document.querySelector(".js-overlay-modal").classList.add("active");
    document.body.style.overflow = "hidden";
}

