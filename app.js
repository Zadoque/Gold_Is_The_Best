// Epic GOLD Cat Campaign JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Dados da campanha
    const campaignData = {
        supporters: 1247,
        votes: "98.7%",
        countries: 47
    };

    // Configuração de partículas
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    // Inicializar canvas
    function initCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Classe Partícula
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = `hsl(${Math.random() * 60 + 30}, 70%, 60%)`;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }

        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Criar partículas
    function createParticles() {
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    }

    // Animar partículas
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animateParticles);
    }

    // Contador de apoiadores animado
    function animateCounter() {
        const counter = document.getElementById('supporters-count');
        const target = campaignData.supporters;
        let current = 0;
        const increment = target / 100;
        const duration = 2000;
        const interval = duration / 100;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = `${Math.floor(current)} pessoas já concordam que deve ser GOLD! 🏆`;
        }, interval);
    }

    // Scroll reveal animation
    function scrollReveal() {
        const reveals = document.querySelectorAll('.section-reveal');
        
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const elementTop = reveal.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('visible');
            }
        });
    }

    // Criar confetes
    function createConfetti(x, y) {
        const colors = ['#FFD700', '#FFA500', '#FFFF00', '#DAA520', '#F4A460'];
        const confettiCount = 30;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = x + 'px';
            confetti.style.top = y + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            // Formas aleatórias
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            }
            
            document.body.appendChild(confetti);

            // Remover confetes após animação
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 3000);
        }
    }

    // Mensagem do WhatsApp
    function generateWhatsAppMessage() {
        const shareMsg = document.getElementById('share-msg');
        const currentUrl = window.location.href;
        
        const message = `🌟 DESCOBRI O NOME PERFEITO PARA SEU GATO! 🌟

💛 GOLD é simplesmente PERFEITO! 💛

✨ Por que GOLD?
👑 Personalidade de ouro
🏆 Nome internacional 
💰 Pelagem dourada natural
🥇 Único e especial

${campaignData.supporters} pessoas já concordam!
${campaignData.votes} de aprovação mundial!

Veja essa campanha épica: ${currentUrl}

#GatoGold #NomePerfeito #GoldCat`;

        shareMsg.textContent = message;
    }

    // Efeitos de hover nos itens de razão
    function addReasonEffects() {
        const reasonItems = document.querySelectorAll('.reason-item');
        
        reasonItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
                this.style.boxShadow = '0 15px 30px rgba(255, 215, 0, 0.4)';
            });

            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'none';
            });

            item.addEventListener('click', function() {
                const rect = this.getBoundingClientRect();
                createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
            });
        });
    }

    // Efeito pulsante no botão principal
    function addButtonEffects() {
        const agreeBtn = document.getElementById('agree-btn');
        const confettiBtn = document.getElementById('confetti-btn');

        agreeBtn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
            
            // Aumentar contador - FIXED
            campaignData.supporters += Math.floor(Math.random() * 10) + 1;
            const counter = document.getElementById('supporters-count');
            counter.textContent = `${campaignData.supporters} pessoas já concordam que deve ser GOLD! 🏆`;

            // Feedback visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });

        confettiBtn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
            
            // Mensagem motivacional - FIXED
            const originalText = this.textContent;
            this.textContent = 'GOLD é INEVITÁVEL! 🎉';
            setTimeout(() => {
                this.textContent = originalText;
            }, 2000);
        });
    }

    // Atualizar estatísticas randomicamente
    function updateStats() {
        setInterval(() => {
            campaignData.supporters += Math.floor(Math.random() * 3) + 1;
            const statsElements = document.querySelectorAll('.stats-footer span');
            if (statsElements[0]) {
                statsElements[0].textContent = `🟡 ${campaignData.supporters} apoiadores`;
            }
        }, 5000);
    }

    // Efeito de brilho nos textos importantes
    function addGlowEffect() {
        const glowElements = document.querySelectorAll('.gold-title, .glowing');
        
        glowElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.textShadow = '0 0 30px #FFD700, 0 0 40px #FFFF00, 0 0 50px #FFA500';
            });

            element.addEventListener('mouseleave', function() {
                this.style.textShadow = '';
            });
        });
    }

    // Event Listeners
    window.addEventListener('scroll', scrollReveal);
    window.addEventListener('resize', () => {
        initCanvas();
    });

    // Inicialização
    function init() {
        initCanvas();
        createParticles();
        animateParticles();
        animateCounter();
        generateWhatsAppMessage();
        addReasonEffects();
        addButtonEffects();
        updateStats();
        addGlowEffect();
        
        // Trigger inicial do scroll reveal
        setTimeout(scrollReveal, 100);
    }

    init();

    // Easter egg: Chuva de ouro ao digitar "GOLD"
    let keySequence = '';
    document.addEventListener('keydown', function(e) {
        keySequence += e.key.toLowerCase();
        
        if (keySequence.includes('gold')) {
            // Criar múltiplos confetes na tela toda
            for (let i = 0; i < 100; i++) {
                setTimeout(() => {
                    createConfetti(
                        Math.random() * window.innerWidth,
                        Math.random() * window.innerHeight * 0.3
                    );
                }, i * 50);
            }
            keySequence = '';
        }
        
        // Limitar o tamanho da sequência
        if (keySequence.length > 10) {
            keySequence = keySequence.slice(-10);
        }
    });

    // Adicionar algumas partículas extras ao clicar
    document.addEventListener('click', function(e) {
        for (let i = 0; i < 5; i++) {
            const particle = new Particle();
            particle.x = e.clientX + (Math.random() - 0.5) * 100;
            particle.y = e.clientY + (Math.random() - 0.5) * 100;
            particle.size = Math.random() * 5 + 2;
            particles.push(particle);
        }
        
        // Remover partículas extras após um tempo
        setTimeout(() => {
            particles = particles.slice(0, 50);
        }, 2000);
    });
});
