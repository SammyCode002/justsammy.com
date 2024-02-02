document.addEventListener('DOMContentLoaded', (event) => {
    const menuItems = document.querySelectorAll('.experience-menu li');
    const details = document.querySelectorAll('.experience-details > div');

    menuItems.forEach((item, index) => {
        item.addEventListener('click', () => {
           
            details.forEach((detail) => {
                detail.classList.remove('active');
            });

            
            details[index].classList.add('active');

           
            menuItems.forEach((menu) => {
                menu.classList.remove('font-bold', 'text-green-300');
            });

            // Highlight the clicked menu item
            item.classList.add('font-bold', 'text-green-300');
        });
    });
}); 
