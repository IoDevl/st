document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const navHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section > *').forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

window.addEventListener('scroll', () => {
    const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    document.documentElement.style.setProperty('--scroll-progress', scrollProgress);
});

document.querySelectorAll('.skill').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = -(x - centerX) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        card.style.boxShadow = '0 5px 20px rgba(138, 43, 226, 0.3)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        card.style.boxShadow = '0 0 0 rgba(138, 43, 226, 0)';
    });
});