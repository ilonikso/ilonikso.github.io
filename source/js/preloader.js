window.addEventListener('load', function(){
    const preloader = document.querySelector('.preloader');
    const preloaderImage = document.querySelector('.preloader-img');

    setTimeout(function(){
        preloader.classList.add('preloader--hide');
        preloaderImage.classList.add('preloader--hide');
    },200);
    
    
    
    let transHandler = function(){
         preloader.style.display = 'none';
         preloaderImage.style.display = 'none';
         preloader.classList.remove('preloader--hide');
         preloaderImage.classList.remove('preloader--hide');

         preloader.removeEventListener('transitionend', transHandler);

    };
    
    preloader.addEventListener('transitionend', transHandler);  
    
});  