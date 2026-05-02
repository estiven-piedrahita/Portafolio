document.addEventListener("DOMContentLoaded", () => {

    // MENÚ MÓVIL
    const botonMenu = document.getElementById('boton-menu');
    const navegacion = document.querySelector('.navegacion-principal');
    
    if (botonMenu) {
        botonMenu.addEventListener('click', () => {
            botonMenu.classList.toggle('activo');
            navegacion.classList.toggle('activo');
        });
        
        // Cerrar menú al hacer clic en un enlace
        const enlacesNav = document.querySelectorAll('.navegacion-principal a');
        enlacesNav.forEach(enlace => {
            enlace.addEventListener('click', () => {
                botonMenu.classList.remove('activo');
                navegacion.classList.remove('activo');
            });
        });
    }

    // SCROLL SUAVE
    const enlaces = document.querySelectorAll('a[href^="#"]');
    
    enlaces.forEach(enlace => {
        enlace.addEventListener("click", e => {
            e.preventDefault();
            const objetivo = document.querySelector(enlace.getAttribute("href"));
            if (objetivo) {
                const offsetTop = objetivo.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });

    // NAVEGACIÓN ACTIVA SEGÚN SECCIÓN
    const secciones = document.querySelectorAll("section, footer");
    const enlacesNavegacion = document.querySelectorAll(".navegacion-principal a");

    window.addEventListener("scroll", () => {
        let actual = "";

        secciones.forEach(seccion => {
            const topSeccion = seccion.offsetTop - 150;
            const alturaSeccion = seccion.offsetHeight;
            
            if (scrollY >= topSeccion && scrollY < topSeccion + alturaSeccion) {
                actual = seccion.getAttribute("id");
            }
        });

        enlacesNavegacion.forEach(enlace => {
            enlace.classList.remove("activo");
            if (enlace.getAttribute("href") === `#${actual}`) {
                enlace.classList.add("activo");
            }
        });
        
        // Efecto de scroll en header
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 14, 39, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 212, 255, 0.2)';
        } else {
            header.style.background = 'rgba(10, 14, 39, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 212, 255, 0.1)';
        }
    });

    // ANIMACIÓN AL HACER SCROLL - INTERSECTION OBSERVER
    const elementosAnimados = document.querySelectorAll(
        ".tarjeta-proyecto, .tarjeta-habilidad, .estadistica-item"
    );

    const observador = new IntersectionObserver(entradas => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.style.opacity = "1";
                entrada.target.style.transform = "translateY(0)";
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    elementosAnimados.forEach(elemento => {
        elemento.style.opacity = "0";
        elemento.style.transform = "translateY(40px)";
        elemento.style.transition = "all 0.6s ease";
        observador.observe(elemento);
    });

    // EFECTO DE ESCRITURA EN EL TÍTULO
    const tituloProfesional = document.querySelector('.titulo-profesional');
    if (tituloProfesional) {
        const textoOriginal = tituloProfesional.textContent;
        tituloProfesional.textContent = '';
        let indice = 0;

        function escribir() {
            if (indice < textoOriginal.length) {
                tituloProfesional.textContent += textoOriginal.charAt(indice);
                indice++;
                setTimeout(escribir, 100);
            }
        }

        // Iniciar efecto después de un breve delay
        setTimeout(escribir, 500);
    }

    // CONTADOR ANIMADO PARA ESTADÍSTICAS
    const contadores = document.querySelectorAll('.estadistica-item h3');
    
    const animarContador = (elemento) => {
        const valorFinal = elemento.textContent;
        const esNumero = !isNaN(parseInt(valorFinal));
        
        if (esNumero) {
            const numero = parseInt(valorFinal);
            const duracion = 2000;
            const pasos = 50;
            const incremento = numero / pasos;
            let valorActual = 0;
            
            const timer = setInterval(() => {
                valorActual += incremento;
                if (valorActual >= numero) {
                    elemento.textContent = valorFinal;
                    clearInterval(timer);
                } else {
                    elemento.textContent = Math.floor(valorActual) + (valorFinal.includes('+') ? '+' : '');
                }
            }, duracion / pasos);
        }
    };

    const observadorContadores = new IntersectionObserver(entradas => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                const h3 = entrada.target.querySelector('h3');
                if (h3 && !h3.classList.contains('animado')) {
                    h3.classList.add('animado');
                    animarContador(h3);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.estadistica-item').forEach(item => {
        observadorContadores.observe(item);
    });

    // EFECTO DE PARTÍCULAS EN EL FONDO (OPCIONAL)
    function crearParticulas() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        canvas.style.pointerEvents = 'none';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particulas = [];
        const numeroParticulas = 50;

        class Particula {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radio = Math.random() * 2 + 1;
            }

            actualizar() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            dibujar() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 212, 255, 0.3)';
                ctx.fill();
            }
        }

        for (let i = 0; i < numeroParticulas; i++) {
            particulas.push(new Particula());
        }

        function animar() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particulas.forEach((particula, i) => {
                particula.actualizar();
                particula.dibujar();

                // Conectar partículas cercanas
                for (let j = i + 1; j < particulas.length; j++) {
                    const dx = particulas[j].x - particula.x;
                    const dy = particulas[j].y - particula.y;
                    const distancia = Math.sqrt(dx * dx + dy * dy);

                    if (distancia < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 - distancia / 750})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particula.x, particula.y);
                        ctx.lineTo(particulas[j].x, particulas[j].y);
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animar);
        }

        animar();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Descomentar la siguiente línea para activar el efecto de partículas
    // crearParticulas();

    // BOTÓN SCROLL TO TOP
    const botonScrollTop = document.createElement('button');
    botonScrollTop.innerHTML = '↑';
    botonScrollTop.className = 'boton-scroll-top';
    botonScrollTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(45deg, #00d4ff, #0099cc);
        border: none;
        color: #0a0e27;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
    `;
    document.body.appendChild(botonScrollTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            botonScrollTop.style.opacity = '1';
            botonScrollTop.style.transform = 'scale(1)';
        } else {
            botonScrollTop.style.opacity = '0';
            botonScrollTop.style.transform = 'scale(0.8)';
        }
    });

    botonScrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    botonScrollTop.addEventListener('mouseenter', () => {
        botonScrollTop.style.transform = 'scale(1.1)';
        botonScrollTop.style.boxShadow = '0 6px 25px rgba(0, 212, 255, 0.5)';
    });

    botonScrollTop.addEventListener('mouseleave', () => {
        botonScrollTop.style.transform = 'scale(1)';
        botonScrollTop.style.boxShadow = '0 4px 15px rgba(0, 212, 255, 0.3)';
    });

    console.log('🚀 Portafolio cargado correctamente');
});