// ========== DOM SELECTORS ==========
const taskInput = document.getElementById('new-task')
const addButton = document.querySelector('.task-row__button')
const incompleteTaskHolder = document.getElementById('incomplete-tasks')
const completedTasksHolder = document.getElementById('completed-tasks')

// ========== FACTORY: CREATE ONE TASK ITEM ==========
const createNewTaskElement = function (taskString) {
    const listItem = document.createElement('li')

    const checkBox = document.createElement('input')
    const label = document.createElement('label')
    const editInput = document.createElement('input')
    const editButton = document.createElement('button')
    const deleteButton = document.createElement('button')
    const deleteButtonImg = document.createElement('img')

    label.textContent = taskString
    label.className = 'task'

    checkBox.type = 'checkbox'
    editInput.type = 'text'
    editInput.className = 'task'

    editButton.textContent = 'Edit'
    editButton.className = 'edit'

    deleteButton.className = 'delete'
    deleteButton.setAttribute('aria-label', 'Delete task')
    deleteButtonImg.src = './remove.svg'
    deleteButtonImg.alt = ''
    deleteButton.appendChild(deleteButtonImg)

    listItem.appendChild(checkBox)
    listItem.appendChild(label)
    listItem.appendChild(editInput)
    listItem.appendChild(editButton)
    listItem.appendChild(deleteButton)
    return listItem
}

// ========== ACTIONS ==========
const addTask = function () {
    const text = taskInput.value.trim()
    if (!text) return

    const listItem = createNewTaskElement(text)
    incompleteTaskHolder.appendChild(listItem)
    bindTaskEvents(listItem, taskCompleted)
    taskInput.value = ''
}

const editTask = function () {
    console.log('Edit Task...')
    console.log("Change 'edit' to 'save'")

    const listItem = this.parentNode

    const editInput = listItem.querySelector('input[type=text]')
    const label = listItem.querySelector('label')
    const editBtn = listItem.querySelector('.edit')
    const containsClass = listItem.classList.contains('editMode')

    if (containsClass) {
        label.textContent = editInput.value
        editBtn.textContent = 'Edit'
    } else {
        editInput.value = label.textContent
        editBtn.textContent = 'Save'
    }

    listItem.classList.toggle('editMode')
}

const deleteTask = function () {
    console.log('Delete Task...')

    const listItem = this.parentNode
    const ul = listItem.parentNode
    ul.removeChild(listItem)
}

const taskCompleted = function () {
    console.log('Complete Task...')

    const listItem = this.parentNode
    completedTasksHolder.appendChild(listItem)
    bindTaskEvents(listItem, taskIncomplete)
}

const taskIncomplete = function () {
    console.log('Incomplete Task...')
    const listItem = this.parentNode
    incompleteTaskHolder.appendChild(listItem)
    bindTaskEvents(listItem, taskCompleted)
}

// ========== INIT ==========
addButton.addEventListener('click', addTask)

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log('bind list item events')
    const checkBox = taskListItem.querySelector('input[type=checkbox]')
    const editButton = taskListItem.querySelector('button.edit')
    const deleteButton = taskListItem.querySelector('button.delete')

    editButton.addEventListener('click', editTask)
    deleteButton.addEventListener('click', deleteTask)
    checkBox.addEventListener('change', checkBoxEventHandler)
}

for (const li of incompleteTaskHolder.children) {
    bindTaskEvents(li, taskCompleted)
}

for (const li of completedTasksHolder.children) {
    bindTaskEvents(li, taskIncomplete)
}
