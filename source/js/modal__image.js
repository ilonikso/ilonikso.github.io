
document.addEventListener('DOMContentLoaded', function() {

var modalButtonsImg = document.querySelectorAll('.modal__button');

   modalButtonsImg.forEach(function(item){

      /* Назначаем каждой кнопке обработчик клика */
      item.addEventListener('click', function(e) {

         e.preventDefault();
          
       var  modalImgActive = document.querySelectorAll('.modal__item-img.slide-active')
         for (var b = 0; b < modalImgActive.length; ++b) {
                modalImgActive[b].classList.remove('slide-active');
            }
        var  modalButtonActiveDel = document.querySelectorAll('.modal__button.modal__button--active')
         for (var d = 0; d < modalButtonActiveDel.length; ++d) {
                modalButtonActiveDel[d].classList.remove('modal__button--active');
            } 
          
          
         
         var modalIdImg = this.getAttribute('data-img'),
             modalElemImg = document.querySelectorAll('.modal__item-img[data-img="' + modalIdImg + '"]');
          
         
          for (var i = 0; i < modalElemImg.length; ++i) {
                modalElemImg[i].classList.add('slide-active');
            }
          
          var modalButtonActive = document.querySelectorAll('.modal__button[data-img="' + modalIdImg + '"]');
          
          for (var c = 0; c < modalButtonActive.length; ++c) {
                modalButtonActive[c].classList.add('modal__button--active');
            }
          
        // modalElemImg.classList.add('slide-active');
         
      }); 

   }); 

}); // end ready