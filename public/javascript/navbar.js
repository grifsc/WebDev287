//Navbar toggle function
const toggleBtn= document.querySelector('.toggle-btn');
const navbar= document.querySelector('.header .navbar');

toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');
    navbar.classList.toggle('active');
})

//Navbar changing color
const header = document.querySelector('.header'); 
const initialDescription = document.querySelector('.initial-description'); 

function updateNavColor(entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
        header.classList.add('nav-colored');   
        header.classList.remove('nav-transparent'); 
    } else {
        header.classList.add('nav-transparent');
        header.classList.remove('nav-colored');  
    }
}

const headerObserver = new IntersectionObserver(updateNavColor, {
    root: null,
    threshold: 0,
    rootMargin: `-${header.getBoundingClientRect().height}px` 

});

headerObserver.observe(initialDescription);
