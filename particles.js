class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = '#8A2BE2';
        this.alpha = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > this.canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > this.canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(138, 43, 226, ${this.alpha})`;
        this.ctx.fill();
    }
}

class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numberOfParticles = 50;
        
        this.init();
        this.animate();
    }

    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '0';
        document.body.prepend(this.canvas);

        this.resize();
        window.addEventListener('resize', () => this.resize());

        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particle(this.canvas));
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(() => this.animate());
    }
}

new ParticleSystem(); 