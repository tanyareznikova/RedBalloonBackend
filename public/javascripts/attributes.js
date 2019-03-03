"use strict";

(function (){

    let addAttributeButton = document.querySelector('#addAttributeButton');
    let messageBlock = document.querySelector('#message');

    if( addAttributeButton ){

        addAttributeButton.addEventListener('click' , async function (){

            let titleAttribute = document.querySelector('#titleAttribute').value;
            let valueAttribute = document.querySelector('#valueAttribute').value;

            if(!titleAttribute.match(RegularExpressions.CategoryTitleExpression) && !valueAttribute.match(RegularExpressions.CategoryTitleExpression)){

                if( messageBlock.classList.contains('alert-success') ){
                    messageBlock.classList.remove('alert-success');
                }//if

                messageBlock.classList.add('alert-danger');

                messageBlock.textContent = "Название атрибута некорректно!";
                messageBlock.style.display = 'block';
                return;

            }//if

            let request = await fetch( `${window.ServerAddress}panel/products/attributes/new` , {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    'titleAttribute': titleAttribute,
                    'valueAttribute': valueAttribute,
                })
            });

            let responseJSON = await request.json();

            messageBlock.textContent = responseJSON.message;

            if( responseJSON.code === 200 ){

                if( messageBlock.classList.contains('alert-danger') ){
                    messageBlock.classList.remove('alert-danger');
                }//if

                messageBlock.classList.add('alert-success');

                messageBlock.style.display = 'block';

            }//if
            else{

                if( messageBlock.classList.contains('alert-success') ){
                    messageBlock.classList.remove('alert-success');
                }//if

                messageBlock.classList.add('alert-danger');

                messageBlock.style.display = 'block';

            }//else

        });

    }//if


})();