// DOM लोड होने पर
document.addEventListener('DOMContentLoaded', function() {
    // मोबाइल मेनू टॉगल
    const menuIcon = document.getElementById('menuIcon');
    const navMenu = document.getElementById('navMenu');
    
    menuIcon.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // VNST मोडल
    const modal = document.getElementById('vnstModal');
    const buyBtn = document.getElementById('buyVnstBtn');
    const closeBtn = document.getElementById('closeModal');
    
    buyBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});