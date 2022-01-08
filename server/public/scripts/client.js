$(document).ready(onReady);

function onReady() {
    console.log('js and jquery ready');
    loadEventHandlers();
    getTasks();
}

// Declare loadEventHandlers
function loadEventHandlers() {
    console.log('loading event handlers');
    // $(document).on('submit', '#taskForm', submitTask);
    // $(document).on('click', '.deleteBtn', deleteTask);
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