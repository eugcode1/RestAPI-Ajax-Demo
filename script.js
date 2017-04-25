$(function(){
    // GET/READ
    $('#get-button').on('click', function(){
        $.ajax({
            url: '/products',
            method: 'GET',//default
            contentType: 'application/json',
            success: function(response) {//when request successful
                //console.log(response);
                var tbodyEl = $('tbody');
                tbodyEl.html('');//empty the html
                response.products.forEach(function(product){
                   tbodyEl.append('\
                        <tr>\
                            <td class="id">' + product.id + '</td>\
                            <td><input type="text" class="name" value="'+ product.name +'"></td>\
                            <td>\
                                <button class="update-button">UPDATE/PUT</button>\
                                <button class="delete-button">DELETE</button>\
                            </td>\
                        </tr>\
                   ')
                });

            }
        })
    });

    // CTEATE/POST - only for existing items
    $('#create-from').on('submit', function(event){
        event.preventDefault();//prevent Default

        var createInput = $('#create-input');//grap value from ajax

        $.ajax({
            url: '/products',//url to server
            method: 'POST',//Default is GET
            contentType: 'application/json',
            data: JSON.stringify({ name: createInput.val() }),//data to send to
            success: function(response){
                console.log(response);
                createInput.val('');//empty input
                $('#get-button').click();//force update
            }
        });
    });

    // UPDATE/PUT - show up latter on the page
    $('table').on('click', '.update-button', function(){
        var rowEl = $(this).closest('tr');//get row element
        var id = rowEl.find('.id').text();//grab the text of id
        var newName = rowEl.find('.name').val();//grab the new name input

        $.ajax({
            url: '/products/' + id,//append the id in the end of router
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ newName: newName}),
            success: function(response){
                console.log(response);
                $('#get-button').click();
            }
        });
    });

    // DELETE
    $('table').on('click', '.delete-button', function(){
        var rowEl = $(this).closest('tr');//get row element
        var id = rowEl.find('.id').text();//grab the text of id

        $.ajax({
            url: '/products/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            // no data, only need id to delete
            success: function(response){
                console.log(response);
                $('#get-button').click();
            }
        });
    });
});
