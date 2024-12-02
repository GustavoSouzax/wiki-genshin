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

// Função para carregar personagens da API
async function loadCharacters() {
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');
    const characterGrid = document.querySelector('.character-grid');

    try {
        const response = await fetch('https://api.genshin.dev/characters');
        if (!response.ok) {
            throw new Error('Erro ao carregar personagens');
        }
        const characters = await response.json();

        // Limpar a mensagem de carregamento
        loadingMessage.style.display = 'none';

        // Limpar a grade de personagens
        characterGrid.innerHTML = '';

        // Criar cartões para cada personagem
        characters.forEach(character => {
            const characterCard = document.createElement('div');
            characterCard.classList.add('character-card');

            // Obter detalhes do personagem
            fetch(`https://api.genshin.dev/characters/${character}`)
                .then(response => response.json())
                .then(data => {
                    characterCard.innerHTML = `
                        <img src="${data.images.icon}" alt="${data.name}" class="character-image">
                        <div class="character-info">
                            <h3 class="character-name">${data.name}</h3>
                            <p class="character-vision">${data.vision}</p>
                            <p class="character-description">${data.description}</p>
                        </div>
                    `;
                })
                .catch(error => {
                    console.error('Erro ao carregar detalhes do personagem:', error);
                });

            characterGrid.appendChild(characterCard);
        });

        // Atualizar os eventos de pesquisa e filtro após carregar os personagens
        updateSearchAndFilter();
    } catch (error) {
        console.error(error);
        errorMessage.style.display = 'block';
    }
}

// Função para atualizar os eventos de pesquisa e filtro após carregar os personagens
function updateSearchAndFilter() {
    const searchBar = document.querySelector('.search-bar input');
    const filterButtons = document.querySelectorAll('.filter-btn');
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
}

// Carregar personagens ao carregar a página
window.addEventListener('load', loadCharacters);