$(function(){
    const appendTask = function(data){
        var taskCode = '<a href="#" class="task-link" data-id="' +
        data.id + '">' + data.name + '</a>  ---->  <a href="#" class="task-link-delete" data-id="' + data.id + '">  Удалить</a><br><br>';

        $('#task-list').append( '<div id="id' + data.id + '">' + taskCode + '</div>');
    };

//    Loading tasks on load page
    $.get('/tasks/', function( response)
    {
        for(i in response) {
            appendTask(response[i]);
        }
    });

    //Show adding task form
    $('#show-add-task-form').click(function(){
        $('#task-form').css('display', 'flex');
    });

    //Closing adding task form
    $('#task-form').click(function(event){
        if(event.target === this) {
            $(this).css('display', 'none');
        }
    });

    //Getting task
    $(document).on('click', '.task-link', function(){
        var link = $(this);
        var taskId = link.data('id');
        $.ajax({
                    method: "GET",
                    url: '/tasks/'+taskId,
                    success: function(response)
                    {
                        var code = '<br><span> Описание:' + response.more + '</span><br><br>';
                        link.parent().append(code);
                    },
                    error:  function(response)
                    {
                        if(response.status == 404)
                        {
                            alert('Задача не найдена');
                        }
                    }
                });
                return false;
    });

    //Adding task
    $('#save-task').click(function()
    {
        var data = $('#task-form form').serialize();
        $.ajax({
            method: "POST",
            url: '/tasks/',
            data: data,
            success: function(response)
            {
                $('#task-form').css('display', 'none');
                var task = {};
                task.id = response;
                var dataArray = $('#task-form form').serializeArray();
                for(i in dataArray) {
                    task[dataArray[i]['name']] = dataArray[i]['value'];
                }
                appendTask(task);
                $("#task-form form").trigger('reset');
            }
        });
        return false;
    });

    //Delete task
        $(document).on('click', '.task-link-delete', function(){
            var link = $(this);
            var taskId = link.data('id');
            $.ajax({
                        method: "DELETE",
                        url: '/tasks/'+taskId,
                        success: function(response)
                        {
                        document.getElementById("id" + taskId).remove();
                        },
                        error:  function(response)
                        {
                            if(response.status == 404)
                            {
                                alert('Задача не найдена');
                            }
                        }
                    });
                    return false;
        });
});
