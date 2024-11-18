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
