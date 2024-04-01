// JS 
let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

// Function to create card for each book and display
let createAndAppendBook = (book) => {
    let {title, imageLink, author} = book;

    // Each book container
    let resultBookContainerEl = document.createElement("div");
    resultBookContainerEl.classList.add('col-6', 'col-md-4', 'col-lg-3','mb-4');
    searchResultsEl.appendChild(resultBookContainerEl);
    
    // Result Book card
    let resultBookCard = document.createElement('div');
    resultBookCard.classList.add("result-book-card",'text-center','shadow');
    resultBookContainerEl.appendChild(resultBookCard);

    // Adding image of the book to book card
    let resultBookImgEl = document.createElement("img");
    resultBookImgEl.classList.add("result-book-img", 'mb-2')
    resultBookImgEl.src = imageLink;
    resultBookCard.appendChild(resultBookImgEl);

    // Adding break ele to seperate image and author name
    let imgBrEl = document.createElement("br");
    resultBookCard.appendChild(imgBrEl);
     
    // Adding author name and source to book card
    let resultBookAuthorNameEl = document.createElement('a');
    resultBookAuthorNameEl.classList.add("result-book-author-name");
    resultBookAuthorNameEl.textContent = author;
    resultBookAuthorNameEl.href = 'https://www.google.com/search?tbm=bks&q=' + title;
    resultBookAuthorNameEl.target = "__blank";
    resultBookCard.appendChild(resultBookAuthorNameEl);
    
};

// Function to call every book result to display
let displayResults = (resultBooksArray) => {
    // Popular books heading
    let resultsHeadingEl = document.createElement("h1");
    resultsHeadingEl.classList.add('results-status','text-left','col-12');
    resultsHeadingEl.textContent = "Popular Books";
    searchResultsEl.appendChild(resultsHeadingEl);
    
    let booksBr = document.createElement('br');
    searchResultsEl.appendChild(booksBr);

    // Calling one by one book to create it's book card and append to results
    for (let book of resultBooksArray){
        createAndAppendBook(book);
    } 
};

function noResults(){
    let noResultStatus = document.createElement('h1');
    noResultStatus.classList.add('results-status','text-center');
    noResultStatus.textContent = "No results found";
    searchResultsEl.appendChild(noResultStatus);
}


// Function to search book using fetch()
let searchBook = (event) => {
    if (event.key==="Enter"){ 
        spinnerEl.classList.remove('d-none');
        searchResultsEl.textContent = '';
        
        let searchInput = event.target.value;

        // Checking if user given input is not empty
        if (searchInput!==''){  
            let url = 'https://apis.ccbp.in/book-store?title='+searchInput;
            let options = {
                method:"GET"
            };
            fetch(url,options)  // Request to get all books based on input
            .then(function(response){ // Response --> Object
                return response.json();
            })
            .then(function(jsonData){  
                spinnerEl.classList.add("d-none");
                if (jsonData['total']===0){ // If no books found
                    noResults(); // Fun to display no results
                }else{
                    let resultBooksArray = jsonData['search_results'];
                    displayResults(resultBooksArray); // Calling the function to display result
                }
            });
        }
        
    }
};


searchInputEl.addEventListener('keydown',searchBook);