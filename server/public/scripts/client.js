$(document).ready(onReady);

function onReady() {
    console.log('js and jquery ready');
    loadEventHandlers();
    getTasks();
}

// Declare loadEventHandlers
function loadEventHandlers() {
    console.log('loading event handlers');
    $(document).on('submit', '#taskForm', addTask);
    $(document).on('click', '.deleteBtn', deleteTask);
    // $(document).on('change', '.completeCheckbox', markComplete);
}

// Declare getTasks
function getTasks() {
    console.log('in getTasks');

    // AJAX call to server
    $.ajax({
        method: 'GET',
        url: '/tasks'
    })
        .then( res => {
            console.log(res);
            renderTasks(res);
        })
        .catch( err => {
            console.log('error in GET /tasks', err);
        })
} // end getTasks

// Declare renderTasks
function renderTasks(tasks) {
    console.log('in renderTasks');

    // Empty the table
    $('#taskTbody').empty();

    // Render each task
    for (let task of tasks) {
        $('#taskTbody').append(`
        <tr data-id="${task.id}" data-completed="${task.completed}">
            <td>${checkCompleted(task)}</td>
            <td>${task.description}</td>
            <td>
                <button class="deleteBtn">
                    Delete
                </button>
            </td>
        </tr>
        `)
    }
}

// Declare checkCompleted
function checkCompleted(task) {
    if (task.completed) {
        return '<input type="checkbox" class="completeCheckbox" checked>';
    } else {
        return '<input type="checkbox" class="completeCheckbox">'
    }
} // end checkCompleted

// Declare addTask
function addTask(event) {
    event.preventDefault();
    console.log('in addTask');

    // Pull inputs to create new object
    let newTask = {
        description: $('#taskInput').val(),
        complete: false,
        time_completed: null
    };

    // POST request
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
    })
    .then( res => {
        console.log('in POST /tasks', res);

        // Empty input
        $('#taskInput').val('');

        // getTasks
        getTasks();
    })
    .catch( err => {
        console.log('POST /tasks failed', err);
        alert('Unable to connect to server. Please try again.');
    });
} // end addTask

// Declare deleteTask
function deleteTask() {
    // pull task ID using jQuery .data()
    let taskId = $(this).parents('tr').data('id');
    console.log('in deleteTask, task to delete: ', taskId );

    // Sweet alert failsafe
    // Window popup when delete button is clicked
    Swal.fire({
        title: 'Are you sure you want to delete this task?',
        text: "This action cannot be undone.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FF1111',
        cancelButtonColor: '#BBBBBB',
        confirmButtonText: 'Yes, delete it forever.'
    })
        .then( result => {
            // If result is confirmed ....
            if (result.isConfirmed) {
                // AJAX DELETE request
                $.ajax({
                    method: 'DELETE',
                    url: `/tasks/${taskId}`,
                })
                .then( res => {
                    console.log(`successfully deleted task ${taskId}`, res);
                    getTasks();
                })
                .catch( err => {
                    console.log('Delete failed', err );
                })
            }
        })
    }