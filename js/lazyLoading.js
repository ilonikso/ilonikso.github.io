const images = document.querySelectorAll('.modal__item-img img');
const sources = document.querySelectorAll('.modal__item-img source');

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
}

function handleImg(myImg, observer){
    myImg.forEach( myImgSingle => {
        console.log(myImgSingle.intersectionRatio);
        if(myImgSingle.intersectionRatio > 0){
            loadImage(myImgSingle.target);
        }
    })
}

function handleSrc(mySrc, observer2){
    mySrc.forEach( mySrcSingle => {
        if(mySrcSingle.intersectionRatio > 0){
            loadSource(mySrcSingle.target);
        }
    })
}

function loadImage(image){
    image.src = image.getAttribute('data-src');
    image.srcset = image.getAttribute('data-srcset');
}

function loadSource(source){
    source.srcset = source.getAttribute('data-srcset');
}

const observer = new IntersectionObserver(handleImg, options);
const observer2 = new IntersectionObserver(handleSrc, options);


images.forEach( img => {
    observer.observe(img);
})

sources.forEach( source => {
    observer2.observe(source);
})
