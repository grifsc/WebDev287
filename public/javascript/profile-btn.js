const profileBtn = document.querySelector('.profile-btn');
const dropdownContent = document.querySelector('.dropdown-content');

profileBtn.addEventListener('click', () => {
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
});