document.addEventListener('DOMContentLoaded', (event) => {
    const menuItems = document.querySelectorAll('.experience-menu li');
    const details = document.querySelectorAll('.experience-details > div');

    menuItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Remove 'active' class from all details and hide them
            details.forEach((detail) => {
                detail.classList.remove('active');
            });

            // Add 'active' class to the clicked item's detail and show it
            details[index].classList.add('active');

            // Reset all menu items to default state
            menuItems.forEach((menu) => {
                menu.classList.remove('font-bold', 'text-green-300');
            });

            // Highlight the clicked menu item
            item.classList.add('font-bold', 'text-green-300');
        });
    });
}); 
