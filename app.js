//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById('new-task')
const addButton = document.querySelector('.task-row__button')
const incompleteTaskHolder = document.getElementById('incomplete-tasks')
const completedTasksHolder = document.getElementById('completed-tasks')

//New task list item
const createNewTaskElement = function (taskString) {
	const listItem = document.createElement('li')

	//input (checkbox)
	const checkBox = document.createElement('input') //checkbx
	//label
	const label = document.createElement('label') //label
	//input (text)
	const editInput = document.createElement('input') //text
	//button.edit
	const editButton = document.createElement('button') //edit button

	//button.delete
	const deleteButton = document.createElement('button') //delete button
	const deleteButtonImg = document.createElement('img') //delete button image

	label.textContent = taskString
	label.className = 'task'

	//Each elements, needs appending
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

	//and appending.
	listItem.appendChild(checkBox)
	listItem.appendChild(label)
	listItem.appendChild(editInput)
	listItem.appendChild(editButton)
	listItem.appendChild(deleteButton)
	return listItem
}

const addTask = function () {
	const text = taskInput.value.trim()
	if (!text) return

	const listItem = createNewTaskElement(text)
	incompleteTaskHolder.appendChild(listItem)
	bindTaskEvents(listItem, taskCompleted)
	taskInput.value = ''
}

//Edit an existing task.

const editTask = function () {
	console.log('Edit Task...')
	console.log("Change 'edit' to 'save'")

	const listItem = this.parentNode

	const editInput = listItem.querySelector('input[type=text]')
	const label = listItem.querySelector('label')
	const editBtn = listItem.querySelector('.edit')
	const containsClass = listItem.classList.contains('editMode')
	//If class of the parent is .editmode
	if (containsClass) {
		//switch to .editmode
		//label becomes the inputs value.
		label.textContent = editInput.value
		editBtn.textContent = 'Edit'
	} else {
		editInput.value = label.textContent
		editBtn.textContent = 'Save'
	}

	//toggle .editmode on the parent.
	listItem.classList.toggle('editMode')
}

//Delete task.
const deleteTask = function () {
	console.log('Delete Task...')

	const listItem = this.parentNode
	const ul = listItem.parentNode
	//Remove the parent list item from the ul.
	ul.removeChild(listItem)
}

//Mark task completed
const taskCompleted = function () {
	console.log('Complete Task...')

	//Append the task list item to the #completed-tasks
	const listItem = this.parentNode
	completedTasksHolder.appendChild(listItem)
	bindTaskEvents(listItem, taskIncomplete)
}

const taskIncomplete = function () {
	console.log('Incomplete Task...')
	//Mark task as incomplete.
	//When the checkbox is unchecked
	//Append the task list item to the #incompleteTasks.
	const listItem = this.parentNode
	incompleteTaskHolder.appendChild(listItem)
	bindTaskEvents(listItem, taskCompleted)
}

//The glue to hold it all together.

//Set the click handler to the addTask function.

addButton.addEventListener('click', addTask)

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
	console.log('bind list item events')
	//select ListItems children
	const checkBox = taskListItem.querySelector('input[type=checkbox]')
	const editButton = taskListItem.querySelector('button.edit')
	const deleteButton = taskListItem.querySelector('button.delete')

	editButton.addEventListener('click', editTask)
	deleteButton.addEventListener('click', deleteTask)
	checkBox.addEventListener('change', checkBoxEventHandler)
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (const li of incompleteTaskHolder.children) {
  bindTaskEvents(li, taskCompleted)
}

for (const li of completedTasksHolder.children) {
  bindTaskEvents(li, taskIncomplete)
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
