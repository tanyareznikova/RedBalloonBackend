  "use strict";


;(function (){

    let updateButton = document.querySelector('#updateCategoryButton');
    let messageBlock = document.querySelector('#message');

    //Обновление категории
    if( updateButton ){

        updateButton.addEventListener('click' , async function (){

            let categoryTitle = document.querySelector('#categoryTitle').value;
            let _id = updateButton.dataset.id;

            if(!categoryTitle.match(RegularExpressions.CategoryTitleExpression)){

                if( messageBlock.classList.contains('alert-success') ){
                    messageBlock.classList.remove('alert-success');
                }//if

                messageBlock.classList.add('alert-danger');

                messageBlock.textContent = "Название категории некорректно!";
                messageBlock.style.display = 'block';
                return;

            }//if

            let request = await fetch( `${window.ServerAddress}panel/category/${_id}` , {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    '_id': _id,
                    'categoryTitle': categoryTitle,
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

            console.log(responseJSON);


        });


    }//if

    //Добавление категории
    let addCategoryButton = document.querySelector("#addCategoryButton");

    if(addCategoryButton){

        addCategoryButton.addEventListener('click' , async function (){

            let categoryTitle = document.querySelector('#categoryTitle').value;

            if(!categoryTitle.match(RegularExpressions.CategoryTitleExpression)){

                if( messageBlock.classList.contains('alert-success') ){
                    messageBlock.classList.remove('alert-success');
                }//if

                messageBlock.classList.add('alert-danger');

                messageBlock.textContent = "Название категории некорректно!";
                messageBlock.style.display = 'block';
                return;

            }//if

            let request = await fetch( `${window.ServerAddress}panel/categories/new` , {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    'categoryTitle': categoryTitle,
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

            console.log(responseJSON);

        } );

    }//if

    //Удаление категории

    let _id = -1;
    let title = -1;
    let removeButtons = document.querySelectorAll('.alert-danger');
    let modalBody = document.querySelector('#categoryName');
      //let modalBody = document.querySelector('#categoryName');

    [].forEach.call( removeButtons , ( button )=>{

        button.addEventListener('click' , async function (){

            title = button.dataset.categoryTitle;
            _id = button.dataset.categoryId;

            console.log('ID:' , _id);

            modalBody.textContent = " " + title;
            $('#confirmRemoveCategoryModal').modal();

        });

    } );

    let confirmRemoveButton = document.querySelector('#confirmRemoveButton');

    if(confirmRemoveButton){

        confirmRemoveButton.addEventListener('click' , async function (){
            let data = new FormData();
            data.append('_id', String(_id));

            try{

                let request=await fetch( `${window.ServerAddress}panel/categories/delete` , {
                    method: 'DELETE',
                    body: data
                });


                let response = await request.json();
                console.log(response);

                if(response.code === 200){

                    let table = document.querySelector(`#categoriesTable`);
                    let row = document.querySelector(`#categoriesTable tr[data-category-id='${_id}']`);

                    table.removeChild( row );

                }//if

            }//try
            catch (ex) {
                console.log(ex);
            }//catch
            console.log(_id + " " + title);
          
        });

    }//if

})();
