// Function to toggle the profile dropdown menu
function toggleDropdown() {
    const dropdownMenu = document.getElementById("profileDropdownMenu");
    dropdownMenu.classList.toggle("show-dropdown");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.closest('.profile')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show-dropdown')) {
                openDropdown.classList.remove('show-dropdown');
            }
        }
    }
}