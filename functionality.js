class UI {
    constructor() {
    this.ul = document.getElementById('ul');
    this.inputValue = document.getElementById('text-input');
    this.form = document.getElementById('form');
    this.resetBtn = document.getElementById('reset-btn');
    this.list = document.getElementById('list');
    this.itemList = [];
    this.itemID = 0;
    }

    submitForm() {
        let inputValue = document.getElementById('text-input').value;
        let textInput = {
            id: this.itemID,
            title: inputValue
        }
        this.itemID++;
        this.itemList.push(textInput);
        this.addToList(textInput)
    }


    addToList(textInput){
        const div = document.createElement('div');
        div.innerHTML = `
        <div>
            <li>${textInput.title}</li>
            <button class='edit-icon' data-id="${textInput.id}">Edit</button>
            <button class='delete-icon' data-id="${textInput.id}">Delete</button>
         </div>
        `;
        this.ul.appendChild(div);
        this.inputValue.value = '';
    }

    resetInput() {
        this.inputValue.value = '';
    }

    editText(element) {
        let id = parseInt(element.dataset.id);
        this.list.remove(element);
        let text = this.itemList.filter(function(item) {
            return item.id === id;
        });
        this.inputValue.value = text[0].title;
        let tempText = this.itemList.filter(function(item) {
            return item.id !== id;
        });
        this.itemList = tempText;
    }
    
    deleteText(element) {

    }
}


function eventListeners() {
    const form = document.getElementById('form');
    const resetBtn = document.getElementById('reset-btn');
    const list = document.getElementById('list');
    const ui = new UI();
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        ui.submitForm();
    });

    resetBtn.addEventListener('click', function(event) {
        event.preventDefault();
        ui.resetInput();
    });

    list.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-icon')) {
            ui.editText(event.target);
        } else if (event.target.parentElement.classList.contains('delete-icon')) {
            ui.deleteText(event.target)
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    eventListeners();
});