function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    const buttons = document.querySelectorAll('.nav-button');

    sections.forEach(section => {
        if (section.id === sectionId) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });

    buttons.forEach(button => {
        if (button.innerText.toLowerCase() === sectionId) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }
    });
}

function sendSupport() {
    const supportInput = document.getElementById('supportInput').value;
    window.location.href = `mailto:sundarsharma469@gmail.com?subject=Support Query&body=${supportInput}`;
}

// Accordion functionality
document.addEventListener('DOMContentLoaded', () => {
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });
});
