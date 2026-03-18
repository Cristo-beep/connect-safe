// script.js - Mejorado con animaciones y funcionalidad
document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const splashScreen = document.getElementById('splashScreen');
    const introVideo = document.getElementById('introVideo');
    const termsModal = document.getElementById('termsModal');
    const mainContent = document.getElementById('mainContent');
    const acceptCheckbox = document.getElementById('acceptTerms');
    const acceptBtn = document.getElementById('acceptBtn');
    const showTermsLink = document.getElementById('showTermsLink');
    const showPrivacyLink = document.getElementById('showPrivacyLink');
    const showTermsFooter = document.getElementById('showTermsFooter') || document.querySelector('a[href="#terminos"]');

    // Video splash -> modal o contenido
    introVideo.addEventListener('ended', function() {
        splashScreen.style.display = 'none';
        const termsAccepted = localStorage.getItem('termsAccepted');
        if (termsAccepted) {
            termsModal.style.display = 'none';
            mainContent.classList.remove('hidden');
        } else {
            termsModal.style.display = 'flex';
            mainContent.classList.add('hidden');
        }
    });

    introVideo.addEventListener('error', function() {
        splashScreen.style.display = 'none';
        const termsAccepted = localStorage.getItem('termsAccepted');
        if (termsAccepted) {
            mainContent.classList.remove('hidden');
        } else {
            termsModal.style.display = 'flex';
        }
    });

    // Modal: habilitar botón
    acceptCheckbox.addEventListener('change', function() {
        acceptBtn.disabled = !this.checked;
    });

    acceptBtn.addEventListener('click', function() {
        if (acceptCheckbox.checked) {
            localStorage.setItem('termsAccepted', 'true');
            termsModal.style.display = 'none';
            mainContent.classList.remove('hidden');
        }
    });

    // Reabrir modal desde enlaces
    if (showTermsLink) showTermsLink.addEventListener('click', (e) => { e.preventDefault(); termsModal.style.display = 'flex'; });
    if (showPrivacyLink) showPrivacyLink.addEventListener('click', (e) => { e.preventDefault(); termsModal.style.display = 'flex'; });
    if (showTermsFooter) showTermsFooter.addEventListener('click', (e) => { e.preventDefault(); termsModal.style.display = 'flex'; });

    // Smooth scroll para todos los anclas
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Animación de aparición de tarjetas (intersección observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.problem-card, .solution-card, .result-item, .timeline-item, .partner-card, .dashboard-card, .team-member').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });

    // Simulación de ubicación en tiempo real (para el boceto)
    const locationDisplay = document.getElementById('location-display');
    if (locationDisplay) {
        const locations = ['Parque Central', 'Escuela', 'Casa Abuela', 'Plaza', 'Natación', 'Biblioteca'];
        setInterval(() => {
            locationDisplay.textContent = locations[Math.floor(Math.random() * locations.length)];
        }, 5000);
    }

    // Acordeón FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(i => { if (i !== item) i.classList.remove('active'); });
            item.classList.toggle('active');
        });
    });
});