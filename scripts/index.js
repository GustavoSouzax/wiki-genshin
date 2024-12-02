function handleSocialIcons() {
    const socialToggle = document.querySelector('.social-toggle');
    const socialIcons = document.querySelector('.social-icons');
    const socialIconLinks = document.querySelectorAll('.social-icon');

    if (window.innerWidth <= 768) {
        socialToggle.addEventListener('click', function() {
            socialIcons.classList.toggle('active');
            if (socialIcons.classList.contains('active')) {
                socialIconLinks.forEach((icon, index) => {
                    setTimeout(() => {
                        icon.style.animation = `fadeInUp 0.3s ease forwards ${index * 0.1}s`;
                    }, 50);
                });
            } else {
                socialIconLinks.forEach(icon => {
                    icon.style.animation = '';
                    icon.style.opacity = '0';
                    icon.style.transform = 'translateY(20px)';
                });
            }
        });
    } else {
        socialIcons.classList.remove('active');
        socialIconLinks.forEach(icon => {
            icon.style.animation = '';
            icon.style.opacity = '1';
            icon.style.transform = 'translateY(0)';
        });
    }
}

window.addEventListener('load', handleSocialIcons);
window.addEventListener('resize', handleSocialIcons);

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

const mMenu = document.querySelector(".mobile-menu");
const navMenu = document.querySelector(".nav-links");

mMenu.addEventListener("click", mobileMenu);

function mobileMenu() {
    mMenu.classList.toggle("active");
    navMenu.classList.toggle("active");
}

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    mMenu.classList.remove("active");
    navMenu.classList.remove("active");
}

window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});