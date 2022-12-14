const ul = document.querySelector(".todolist");
const addButton = document.querySelector(".add-section");
const input = document.querySelector(".input-context");

// adding

function addItem() {
    const li = document.createElement('li');
    li.setAttribute('class', 'input-section');

    const inputText = document.createElement('input');
    inputText.setAttribute('class', 'input-context');
    li.append(inputText);

    li.append(document.querySelector('.dl-btn').cloneNode(true));
    ul.append(li);
    inputText.autofocus = true;

    addEventsDragAndDrop(li);
}

addButton.addEventListener("click", addItem);

ul.addEventListener('keypress', (event) => {
    let keyCode = event.keyCode ? event.keyCode : event.which;
    // 13 points the enter key
    if (keyCode === 13) {
        addButton.click();
    }
});

//   deleting
ul.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button") &&
        ul.children.length > 1) {
        e.target.parentElement.parentElement.remove();
    }
});


// sorting
const sortBtn = document.querySelector(".sort-btn");
const todoItems = [];
let order = false;

sortBtn.addEventListener('click', () => {

    // change picture on mouse click
    if (!order) {
        document.getElementById('change').src = './assets/Images/desc-hover.png';

    } else {
        document.getElementById('change').src = './assets/Images/asc-hover.png';
    }

    const list = ul.children;
    order = !order;

    for (let i = 0; i < list.length; i++) {
        todoItems[i] = list[i].firstElementChild.value;
    }

    todoItems.sort((a, b) => {
        if (order) {
            if (isNaN(parseInt(a))) {
                if (a > b) {
                    return 1;
                } if (a === b) {
                    return 0;
                }
                return -1;
            } else {
                if (Number(a) > Number(b)) {
                    return 1;
                } if (Number(a) === Number(b)) {
                    return 0;
                }
                return -1;
            }
        } else {
            if (isNaN(parseInt(a))) {
                if (a < b) {
                    return 1;
                } if (a === b) {
                    return 0;
                }
                return -1;
            } else {
                if (Number(a) < Number(b)) {
                    return 1;
                } if (Number(a) === Number(b)) {
                    return 0;
                }
                return -1;
            }
        }
    })

    console.log(todoItems)

    for (let i = 0; i < list.length; i++) {
        list[i].firstElementChild.value = todoItems[i];
    }
});



// drag and drop functionality
