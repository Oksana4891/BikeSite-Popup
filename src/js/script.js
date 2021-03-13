


window.onload = function () {

  
    // POPUP
    function bindModal(triggerSelector, modalSelector) {
        const triggers = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            modals = document.querySelectorAll('.popup'),
            overlay = document.querySelector(".js-popup"),
            close = document.querySelector(".js-popup_close");
           
            // Open popup
            triggers.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    hideAllModals ();
                    handelOpenModal();
                });
            });
        
        //  Function close modal
        close.addEventListener('click', (e) => {
            e.preventDefault();
            hideAllModals();
            handelCloseModal(overlay);
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                hideAllModals();
                handelCloseModal(overlay);
            }
        });


        function handelCloseModal(modal) {
            modal.classList.remove('is-open');
        }


        // Function hide all modal

        function hideAllModals() {
            modals.forEach(item => {
                handelCloseModal(item);
            });
        }

        // Function open modal

        function handelOpenModal() {

            if (!overlay.classList.contains('is-open')) {
                  overlay.classList.add('is-open');
            }
            modal.classList.add('is-open');
        }
    }

    // Time Input
   
    function inputTime () {
        const btnOpen = document.querySelector(".popup-form_input--time"),
              timeBlock = document.querySelector ('.scrollbar-time'),
              timeInput = document.querySelector ('.js-input-time');


              btnOpen.addEventListener('click', (e) => {
                e.preventDefault();
                timeBlock.classList.toggle("is-active");
            });    
            
            timeBlock.addEventListener('click', (e) => {
                e.preventDefault();
                timeInput.value=e.target.textContent;
                timeBlock.classList.toggle("is-active");
            });
    } 


    // SrollBarr

    $(".popup-program_list").mCustomScrollbar({
        theme:"rounded-dark",
        scrollInertia: 1
    });
    $(".popup-transport_list").mCustomScrollbar({
        theme:"rounded-dark",
        scrollInertia: 1
    });


    //  Total cost calculation

    function calcTotalPrice (selectorAllUnitPrice, selectorAllTotal, selectorTotalPrice) {
        const totalPrice = document.querySelector(selectorTotalPrice);
        const unitPrices = document.querySelectorAll (selectorAllUnitPrice);
        const total = document.querySelectorAll (selectorAllTotal);
       
        const decrementBtnAll = document.querySelectorAll(
            'button[data-action="decrement"]'
        );
        const incrementBtnAll = document.querySelectorAll(
            '[data-action="increment"]'
        );

        decrementBtnAll.forEach(decrementBtn =>
            decrementBtn.addEventListener("click", (e) => {
                e.preventDefault();
                const parentBtn =e.target.parentNode;
                const inputCounter = parentBtn.querySelector('input'); 
                let inputCounterValue = +inputCounter.value;
                if (inputCounterValue <=1) {                   
                    return;
               }
               else {
                inputCounterValue -= 1;
                inputCounter.value = inputCounterValue;
                getTotalPrice();
               }                     
            }
            ));

        incrementBtnAll.forEach(incrementBtn => {
                incrementBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    const parentBtn =e.target.parentNode;
                    const inputCounter = parentBtn.querySelector('input'); 
                    let inputCounterValue = +inputCounter.value;
                    inputCounterValue += 1;
                    inputCounter.value = inputCounterValue;
                    getTotalPrice();                
                });
            });


        function getTotalPrice () {
            let totalPriceValue=0;
            let i;
            for (i=0; i<total.length; i+=1) {
             let valueUnitPrice = +unitPrices[i].textContent;
             let valueTotal = +total[i].value;
             totalPriceValue +=valueUnitPrice*valueTotal;
            }
            totalPrice.textContent=totalPriceValue;
            }

            getTotalPrice ();   
    }

    // OPen gift certificate 

    function openGiftCert () {
        const trigger =  document.querySelector('.js-gift-cert');
        const giftCert = document.querySelector('.gift-img');
        const closeGiftCert = document.querySelector('.js-close-gift-img');

        trigger.addEventListener ('click', (e) => {
        e.preventDefault();
        giftCert.classList.add("is-open");

    });

    closeGiftCert.addEventListener ('click', (e) => {
        e.preventDefault();
        console.log(giftCert);
        giftCert.classList.remove("is-open");
    });


}



    bindModal(".js-open_BuyForm", "#buy .popup-program");   
    bindModal("#buy .popup-program--btn", "#buy .popup-transport");
    bindModal("#buy .popup-transport--btn", "#buy .popup-form");
    bindModal("#buy .popup-transport_bnt-back", "#buy .popup-program");
    bindModal("#buy .popup-form_bnt-back", "#buy .popup-transport");

    bindModal(".js-open_GiftForm", "#gift .popup-program");   
    bindModal("#gift .popup-program--btn", "#gift .popup-transport");
    bindModal("#gift .popup-transport--btn", "#gift .popup-form");
    bindModal("#gift .popup-transport_bnt-back", "#gift .popup-program");
    bindModal("#gift .popup-form_bnt-back", "#gift .popup-transport");

    openGiftCert();

    inputTime();

    calcTotalPrice ("#buy .unit-price", "#buy .popup-transport_value", "#buy .total-price");
    calcTotalPrice ("#gift .unit-price", "#gift .popup-transport_value", "#gift .total-price");


};