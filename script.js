const form = document.querySelector('.contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const sections = document.querySelectorAll("section.fade");
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
        } else {
            entry.target.classList.remove("is-visible");
        }
    });
});
const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
collapsibleHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const body = header.nextElementSibling;
        body.style.display = body.style.display === 'none' ? 'block' : 'none';
    });
});

// Get the search icon and search box elements
const searchIcon = document.querySelector('.search-icon');
const searchBox = document.querySelector('.search-box');

// Add click event listener to search icon
searchIcon.addEventListener('click', () => {
    // Toggle the display of the search box
    searchBox.style.display = searchBox.style.display === 'block' ? 'none' : 'block';

});


sections.forEach((section) => {
    sectionObserver.observe(section);
});
// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     // check if name, email, and message are not empty
//     if (nameInput.value && emailInput.value && messageInput.value) {
//         // TODO: send form data to server and handle response
//         console.log('Form submitted:', nameInput.value, emailInput.value, messageInput.value);
//         alert('Form submitted successfully!');
//         // clear form inputs
//         nameInput.value = '';
//         emailInput.value = '';
//         messageInput.value = '';
//     } else {
//         alert('Please fill out all fields.');
//     }
// });

const printingText = document.querySelector('.printing-text');
let text = printingText.innerText;
let index = 0;
let lineBreakIndex = null;

function printText() {
    printingText.innerText = text.slice(0, index);

    // Insert line break after the next character when container width reaches 100% of parent container
    if (printingText.offsetWidth >= printingText.parentNode.offsetWidth && lineBreakIndex === null) {
        lineBreakIndex = index + 1;
    }
    if (lineBreakIndex === index) {
        printingText.innerHTML += '<br>';
        lineBreakIndex = null;
    }

    index++;

    if (index > text.length) {
        clearInterval(printInterval);
    }
}

const printInterval = setInterval(printText, 50);

const icons = document.querySelectorAll('.icon');

function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function checkIcons() {
    icons.forEach(icon => {
        const iconTop = icon.getBoundingClientRect().top;
        const iconBottom = icon.getBoundingClientRect().bottom;
        const iconHeight = icon.getBoundingClientRect().height;
        const windowHeight = window.innerHeight;

        if (iconTop < windowHeight - iconHeight) {
            icon.classList.add('visible');
        } else {
            icon.classList.remove('visible');
        }
    });
}

window.addEventListener('scroll', debounce(checkIcons));
//***************
const items = document.querySelectorAll('.list-item');

function fadeInList() {
    items.forEach((item, index) => {
        const position = item.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (position < screenHeight * 0.9) {
            setTimeout(
                () => item.classList.add('active'), index * 200)
        } else {
            item.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', fadeInList);
// Get all the gallery items
const galleryItems = document.querySelectorAll('.gallery-item');

// Loop through each gallery item
galleryItems.forEach(item => {
    // Add a click event listener to each item
    item.addEventListener('click', () => {
        // Get the image source of the clicked item
        const imageSrc = item.querySelector('img').getAttribute('src');

        // Create a new image element with the source of the clicked item
        const modalImage = document.createElement('img');
        modalImage.setAttribute('src', imageSrc);

        // Create a new modal element and append the new image element to it
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.appendChild(modalImage);

        // Add the modal element to the body of the page
        document.body.appendChild(modal);

        // Add a click event listener to the modal element
        modal.addEventListener('click', () => {
            // Remove the modal element when clicked
            modal.remove();
        });
    });
});
