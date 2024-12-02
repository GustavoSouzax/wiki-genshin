/* Evento para o input aceitar apenas letras */
function apenasLetras(e) {
    const regex = /^[a-zA-Z\u00C0-\u00FF\s]*$/;
    const input = e.target;
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^a-zA-Z\u00C0-\u00FF\s]/g, '');
    }
}
/* Barra de pesquisa */
const searchBar = document.querySelector('.search-bar input');
const characterCards = document.querySelectorAll('.character-card');

searchBar.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    characterCards.forEach(card => {
        const name = card.querySelector('.character-name').textContent.toLowerCase();
        if (name.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});
/* Filtro de personagens por elemento */
const filterButtons = document.querySelectorAll('.filter-btn');

function setInitialActiveState() {
    const todosButton = Array.from(filterButtons).find(btn => btn.textContent.toLowerCase() === 'todos');
    if (todosButton) {
        todosButton.classList.add('active');
    }
}

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        this.classList.add('active');

        const filter = this.textContent.toLowerCase();
        characterCards.forEach(card => {
            if (filter === 'todos' || card.querySelector('.character-vision').textContent.toLowerCase().includes(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

window.addEventListener('load', setInitialActiveState);
/* Menu do nav responsivo */
window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

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
/* Menu dos icones redes sociais responsivo */
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