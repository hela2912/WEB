document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add-button");
    const bookForm = document.getElementById("book-form");
    const bookIdInput = document.getElementById("book-id");
    const bookTitleInput = document.getElementById("book-title");
    const bookPriceInput = document.getElementById("book-price");
    const saveButton = document.getElementById("save-button");
    const cancelButton = document.getElementById("cancel-button");
    const bookList = document.getElementById("book-list");

    let books = JSON.parse(localStorage.getItem("books")) || [];


    function generateNextId() {
        let maxId = 0;
        for (const book of books) {
            if (book.id > maxId) {
                maxId = book.id;
            }
        }
        return maxId + 1;
    }  

    
    function saveBooks() {
        localStorage.setItem("books", JSON.stringify(books));
    }

    function displayBooks() {
        bookList.innerHTML = "";
        books.forEach((book) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.price}</td>
                <td>
                    <button class="delete" data-id="${book.id}">Delete</button>
                    <button class="update" data-id="${book.id}">Update</button>
                </td>
            `;
            bookList.appendChild(row);
        });
    }
    


    
    bookForm.classList.add("hidden");

    addButton.addEventListener("click", function () {
        bookForm.reset();
        bookForm.classList.remove("hidden");
        
        bookIdInput.value = "";
    });

    saveButton.addEventListener("click", function (e) {
        e.preventDefault();
        const bookId = bookIdInput.value;
        const bookTitle = bookTitleInput.value;
        const bookPrice = parseFloat(bookPriceInput.value);

        if (saveButton.innerText === "Add") {
            
            const newBook = { id: generateNextId(), title: bookTitle, price: bookPrice };
            books.push(newBook);
        } else {
            
            const index = books.findIndex((book) => book.id === parseInt(bookId));
            if (index !== -1) {
                books[index] = { id: parseInt(bookId), title: bookTitle, price: bookPrice };
            }
        }

        saveBooks();
        displayBooks();
        bookForm.classList.add("hidden"); 
    });

    cancelButton.addEventListener("click", function () {
        bookForm.classList.add("hidden");
    });

    bookList.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-button")) {
            const bookId = e.target.getAttribute("data-id");
            books = books.filter((book) => book.id !== parseInt(bookId));
            saveBooks();
            displayBooks();
        } else if (e.target.classList.contains("update-button")) {
            const bookId = e.target.getAttribute("data-id");
            const book = books.find((b) => b.id === parseInt(bookId));
            bookForm.classList.remove("hidden");
            saveButton.innerText = "Save";
            bookIdInput.value = book.id;
            bookTitleInput.value = book.title;
            bookPriceInput.value = book.price;
        }
    });

    displayBooks();
});