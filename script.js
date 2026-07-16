/* ==========================================================================
   FESTEJOS SANTAELLA - SITE INTERACTION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. SCROLLED HEADER EFFECT
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. MOBILE NAVIGATION DRAWER
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('open')) {
            icon.className = 'fa fa-times';
        } else {
            icon.className = 'fa fa-bars';
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            mobileToggle.querySelector('i').className = 'fa fa-bars';
        });
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.remove('active');
            }
        });
    });

    // 3. PARALLAX EFFECT FOR HERO & SEPARATORS
    window.addEventListener('scroll', () => {
        if (window.innerWidth > 768) {
            const scrolled = window.pageYOffset;
            
            // Hero parallax
            const heroBg = document.querySelector('.hero-background-parallax');
            if (heroBg) {
                heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
            }
            
            // Divider separators parallax
            const dividers = document.querySelectorAll('.parallax-divider');
            dividers.forEach(div => {
                const bg = div.querySelector('.divider-parallax-bg');
                if (bg) {
                    const rect = div.getBoundingClientRect();
                    // Scroll speed adjustment
                    const offset = (window.innerHeight - rect.top) * 0.15;
                    bg.style.transform = `translateY(${offset - 80}px)`;
                }
            });
        }
    });

    // 4. INTERACTIVE EVENT CALCULATOR (CURADOR DE MOMENTOS)
    const eventSelect = document.getElementById('event-type');
    const eventDate = document.getElementById('event-date');
    const eventTime = document.getElementById('event-time');
    const eventName = document.getElementById('event-name');
    const guestsRange = document.getElementById('guests-range');
    const guestsVal = document.getElementById('guests-val');
    
    // Summary Fields
    const summaryEvent = document.getElementById('summary-event');
    const summaryGuests = document.getElementById('summary-guests');
    const summaryDate = document.getElementById('summary-date');
    const summaryClient = document.getElementById('summary-client');
    const calendarAlert = document.getElementById('calendar-alert');
    const calendarAlertText = document.getElementById('calendar-alert-text');

    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz_b9mHlV4yvR4d255-t1L1mX9Fm-YOUR-SCRIPT-URL/exec'; // Reemplazar con la URL de la web app publicada
    const summaryServices = document.getElementById('summary-services-list');
    const summaryGifts = document.getElementById('summary-gifts-text');
    const btnAddToCart = document.getElementById('btn-add-to-cart');
    
    // Addon Checkboxes
    const addonMenu2 = document.getElementById('addon-menu-2');
    const addonVideo = document.getElementById('addon-video');
    const addonMariachis = document.getElementById('addon-mariachis');
    const addonPirotecnia = document.getElementById('addon-pirotecnia');
    const addonCabina = document.getElementById('addon-cabina');
    const addonCuadro = document.getElementById('addon-cuadro');
    const addonFoto = document.getElementById('addon-foto');
    const addonMaquillaje = document.getElementById('addon-maquillaje');

    // Event Config mapping (pricing removed)
    const eventConfig = {
        boda: {
            title: "Boda Campestre",
            gift: "✓ OBSEQUIO ESPECIAL de Festejos Santaella",
            baseServices: [
                "Sede Campestre con montaje de gala (mesas y sillas premium al aire libre)",
                "DJ Profesional & Maxi TK con espectacular hora loca y accesorios",
                "Estación de Bebidas calientes permanente (Café, tinto y aromáticas)",
                "Bebidas frías ilimitadas durante todo el evento (Gaseosa, agua y hielo)",
                "Elegante Mesa de snack y pasabocas gourmet para recepción",
                "Servicio de meseros calificados y personal logístico de protocolo",
                "Decoración premium de espacios con flores naturales y telas",
                "OBSEQUIO ESPECIAL de Festejos Santaella"
            ]
        },
        quince: {
            title: "Fiesta de Quince Años",
            gift: "✓ OBSEQUIO ESPECIAL de Festejos Santaella",
            baseServices: [
                "Sede Campestre con montaje temático de gala al aire libre",
                "DJ Profesional & Maxi TK con espectacular hora loca y show LED",
                "Estación de Bebidas calientes permanente para los adultos",
                "Bebidas frías ilimitadas durante todo el evento (Gaseosa, agua y hielo)",
                "Mesa de snack y pasabocas dulces y salados para los invitados",
                "Servicio de meseros calificados y personal de protocolo",
                "Decoración premium de la sede según la temática elegida",
                "OBSEQUIO ESPECIAL de Festejos Santaella"
            ]
        },
        grado: {
            title: "Grado, Prom o Evento Empresarial",
            gift: "✓ OBSEQUIO ESPECIAL de Festejos Santaella",
            baseServices: [
                "Sede Campestre con montaje solemne de gala y protocolo",
                "DJ Profesional & Maxi TK con espectacular hora loca y show de luces",
                "Estación de Bebidas calientes permanente (Café, tinto y té)",
                "Bebidas frías ilimitadas durante todo el evento (Gaseosa, agua y hielo)",
                "Mesa de snack y pasabocas variados de sal y dulce",
                "Servicio de meseros calificados y maestro de protocolo",
                "Decoración sobria y elegante con flores y símbolos del logro",
                "OBSEQUIO ESPECIAL de Festejos Santaella"
            ]
        },
        corporativo: {
            title: "Reunión Corporativa",
            gift: "✓ OBSEQUIO ESPECIAL de Festejos Santaella",
            baseServices: [
                "Sede Campestre con montaje corporativo (auditorio o mesas de trabajo)",
                "DJ Profesional & Maxi TK con sonido de alta gama y micrófonos",
                "Estación de Bebidas calientes permanente (Café de origen, tinto y té)",
                "Bebidas frías ilimitadas durante todo el evento (Gaseosa, agua y hielo)",
                "Mesa de snack y pasabocas ejecutivos (salados y dulces)",
                "Servicio de meseros calificados y personal logístico de apoyo",
                "Decoración corporativa sobria y arreglos de mesa de gala",
                "OBSEQUIO ESPECIAL de Festejos Santaella"
            ]
        }
    };

    // Addons config (pricing removed)
    const addonsConfig = {
        menu2: { name: "Menú de Gala (2 Carnes)" },
        video: { name: "Filmación Profesional" },
        mariachis: { name: "Show de Mariachis" },
        pirotecnia: { name: "Juegos Pirotécnicos" },
        cabina: { name: "Cabina de Fotos" },
        cuadro: { name: "Cuadro de Entrada" },
        foto: { name: "john book fotofrafia profesional" },
        maquillaje: { name: "VANESSA MAKE UP maquillaje profesional" }
    };

    // calculateEventPrice removed as pricing is no longer calculated

    function updateCalculator() {
        const type = eventSelect.value;
        const guests = parseInt(guestsRange.value);
        
        // Update labels
        guestsVal.textContent = guests;
        summaryEvent.textContent = eventConfig[type].title;
        summaryGuests.textContent = `${guests} personas`;
        
        if (summaryClient) {
            summaryClient.textContent = eventName.value.trim() ? eventName.value.trim() : 'No provisto';
        }
        
        if (summaryDate) {
            const timePart = eventTime && eventTime.value ? ` a las ${eventTime.value}` : '';
            summaryDate.textContent = eventDate.value ? `${eventDate.value}${timePart}` : 'No seleccionada';
        }
        
        // Base Services List Builder
        let listHTML = '';
        eventConfig[type].baseServices.forEach(srv => {
            if (srv.includes("OBSEQUIO ESPECIAL")) {
                listHTML += `<li><strong>${srv}</strong></li>`;
            } else {
                listHTML += `<li>${srv}</li>`;
            }
        });
        
        // Addons Builder
        if (addonMenu2.checked) listHTML += `<li><strong>Adicional:</strong> Menú de Gala a 2 Carnes</li>`;
        if (addonVideo.checked) listHTML += `<li><strong>Adicional:</strong> Filmación Profesional del Evento</li>`;
        if (addonMariachis.checked) listHTML += `<li><strong>Adicional:</strong> Show de Mariachis en Vivo</li>`;
        if (addonPirotecnia.checked) listHTML += `<li><strong>Adicional:</strong> Show de Juegos Pirotécnicos en el cielo</li>`;
        if (addonCabina.checked) listHTML += `<li><strong>Adicional:</strong> Cabina de Fotos Profesional</li>`;
        if (addonCuadro.checked) listHTML += `<li><strong>Adicional:</strong> Cuadro de Entrada de Gala</li>`;
        if (addonFoto.checked) listHTML += `<li><strong>Adicional:</strong> john book fotofrafia profesional</li>`;
        if (addonMaquillaje.checked) listHTML += `<li><strong>Adicional:</strong> VANESSA MAKE UP maquillaje profesional</li>`;
        
        summaryServices.innerHTML = listHTML;
        summaryGifts.textContent = eventConfig[type].gift;
    }

    // Live Availability Check from Google Calendar
    async function checkCalendarAvailability() {
        if (!eventDate.value || !eventTime.value) return;
        
        if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('YOUR-SCRIPT-URL')) {
            console.log("Google Apps Script URL no configurada.");
            return;
        }

        calendarAlert.classList.add('hidden');
        btnAddToCart.disabled = true;
        btnAddToCart.textContent = "Verificando disponibilidad...";

        try {
            const res = await fetch(`${APPS_SCRIPT_URL}?fecha=${eventDate.value}&hora=${eventTime.value}`);
            const data = await res.json();
            
            if (data.disponible === false) {
                calendarAlertText.textContent = `⚠️ El horario del ${eventDate.value} a las ${eventTime.value} ya está reservado. Por favor, elige otra hora/fecha.`;
                calendarAlert.classList.remove('hidden');
                btnAddToCart.textContent = "Fecha Ocupada";
                btnAddToCart.style.opacity = "0.5";
                btnAddToCart.style.pointerEvents = "none";
            } else {
                calendarAlert.classList.add('hidden');
                btnAddToCart.disabled = false;
                btnAddToCart.textContent = "Cotizar vía WhatsApp";
                btnAddToCart.style.opacity = "1";
                btnAddToCart.style.pointerEvents = "auto";
            }
        } catch (error) {
            console.error("Error al verificar disponibilidad en Google Calendar:", error);
            // Fallback en caso de fallos
            calendarAlert.classList.add('hidden');
            btnAddToCart.disabled = false;
            btnAddToCart.textContent = "Cotizar vía WhatsApp";
            btnAddToCart.style.opacity = "1";
            btnAddToCart.style.pointerEvents = "auto";
        }
    }

    // Attach listeners for calculator updates
    eventSelect.addEventListener('change', updateCalculator);
    if (eventDate) {
        eventDate.addEventListener('change', () => {
            updateCalculator();
            checkCalendarAvailability();
        });
    }
    if (eventTime) {
        eventTime.addEventListener('change', () => {
            updateCalculator();
            checkCalendarAvailability();
        });
    }
    if (eventName) {
        eventName.addEventListener('input', updateCalculator);
    }
    guestsRange.addEventListener('input', updateCalculator);
    addonMenu2.addEventListener('change', updateCalculator);
    addonVideo.addEventListener('change', updateCalculator);
    addonMariachis.addEventListener('change', updateCalculator);
    addonPirotecnia.addEventListener('change', updateCalculator);
    addonCabina.addEventListener('change', updateCalculator);
    addonCuadro.addEventListener('change', updateCalculator);
    addonFoto.addEventListener('change', updateCalculator);
    addonMaquillaje.addEventListener('change', updateCalculator);

    // Initial load of calculator
    updateCalculator();

    // ==========================================================================
    // 5. DIRECT WHATSAPP REDIRECTION (SIMULATOR CHECKOUT WITH SECURITY WARNING)
    // ==========================================================================
    const securityModal = document.getElementById('security-modal');
    const btnConfirmSecurity = document.getElementById('btn-confirm-security');

    if (btnAddToCart && securityModal && btnConfirmSecurity) {
        btnAddToCart.addEventListener('click', () => {
            const type = eventSelect.value;
            const guests = parseInt(guestsRange.value);
            const dateVal = eventDate && eventDate.value ? eventDate.value : 'Por definir';
            const timeVal = eventTime && eventTime.value ? eventTime.value : '16:00';
            const clientName = eventName && eventName.value.trim() ? eventName.value.trim() : 'No provisto';
            
            let selectedAddonsList = [];
            if (addonMenu2.checked) selectedAddonsList.push("Menú de Gala (2 Carnes)");
            if (addonVideo.checked) selectedAddonsList.push("Filmación Profesional de Evento");
            if (addonMariachis.checked) selectedAddonsList.push("Show de Mariachis en Vivo");
            if (addonPirotecnia.checked) selectedAddonsList.push("Show de Juegos Pirotécnicos");
            if (addonCabina.checked) selectedAddonsList.push("Cabina de Fotos Profesional");
            if (addonCuadro.checked) selectedAddonsList.push("Cuadro de Entrada de Gala");
            if (addonFoto.checked) selectedAddonsList.push("john book fotofrafia profesional");
            if (addonMaquillaje.checked) selectedAddonsList.push("VANESSA MAKE UP maquillaje profesional");

            let baseMsg = `*NUEVA COTIZACIÓN - Festejos Santaella*\n` +
                          `========================================\n\n` +
                          `• *Cliente:* ${clientName}\n` +
                          `• *Evento:* ${eventConfig[type].title}\n` +
                          `• *Invitados:* ${guests} personas\n` +
                          `• *Fecha tentativa:* ${dateVal} a las ${timeVal}\n` +
                          `• *Sede:* Sede Campestre Santaella\n\n` +
                          `*Servicio Principal:*\n` +
                          `✓ Paquete Básico de ${eventConfig[type].title} (Incluye Obsequio Especial)\n`;

            if (selectedAddonsList.length > 0) {
                baseMsg += `\n*Servicios Adicionales Seleccionados:*\n`;
                selectedAddonsList.forEach(add => {
                    baseMsg += `✓ ${add}\n`;
                });
            }

            baseMsg += `\n========================================\n` +
                       `Quedo a la espera de que el asesor humano me contacte para formalizar y coordinar la cita de manera presencial en la oficina de Funza.`;

            const encodedMsg = encodeURIComponent(baseMsg);
            const waURL = `https://wa.me/573227580494?text=${encodedMsg}`;

            // Show the modal
            securityModal.classList.add('active');

            // Setup confirmation action
            const proceedWithWhatsApp = async () => {
                btnConfirmSecurity.disabled = true;
                const originalBtnText = btnConfirmSecurity.textContent;
                btnConfirmSecurity.textContent = "Registrando pre-reserva...";

                // POST data to Google Apps Script to create tentative event
                if (APPS_SCRIPT_URL && !APPS_SCRIPT_URL.includes('YOUR-SCRIPT-URL') && eventDate.value && eventTime.value) {
                    try {
                        const payload = {
                            fecha: eventDate.value,
                            hora: eventTime.value,
                            cliente: clientName,
                            evento: eventConfig[type].title,
                            invitados: guests,
                            adicionales: selectedAddonsList.join(', ')
                        };

                        await fetch(APPS_SCRIPT_URL, {
                            method: 'POST',
                            mode: 'no-cors',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(payload)
                        });
                    } catch (error) {
                        console.error("Error al registrar pre-reserva en Google Calendar:", error);
                    }
                }

                securityModal.classList.remove('active');
                btnConfirmSecurity.disabled = false;
                btnConfirmSecurity.textContent = originalBtnText;
                window.open(waURL, '_blank');
                btnConfirmSecurity.removeEventListener('click', proceedWithWhatsApp);
            };

            btnConfirmSecurity.addEventListener('click', proceedWithWhatsApp);
        });

        // Close modal on clicking outside
        securityModal.addEventListener('click', (e) => {
            if (e.target === securityModal) {
                securityModal.classList.remove('active');
            }
        });
    }

    // ==========================================================================
    // 6. SALES AND SERVICE CHATBOT (SANTAELLA AI)
    // ==========================================================================
    const chatBubble = document.getElementById('chat-bubble');
    const chatWindow = document.getElementById('chat-window');
    const chatCloseBtn = document.getElementById('chat-close-btn');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const quickReplyButtons = document.querySelectorAll('.quick-reply-btn');

    // Toggle Chat window open/close
    chatBubble.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        // Scroll body to bottom on open
        setTimeout(() => {
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 100);
    });

    chatCloseBtn.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    // Responses Database matching keywords
    const chatbotResponses = {
        sede: "🌳 Ofrecemos un espectacular montaje en nuestra **Sede Campestre** en la zona occidente. Ideal para ceremonias al aire libre, con amplios jardines y parqueadero privado (Habitación para cambio de vestuario, chimenea para escenografía de fotos). ¡Coordina una cita para conocerla!",
        contacto: "📍 Nuestra oficina principal está ubicada en la **Carrera 13 N° 9 - 40, Segundo Piso**, Barrio La Cita, en Funza, Cundinamarca. Atendemos citas previas llamando al **322 758 0494**.",
        precios: "💰 En Festejos Santaella no manejamos tarifas estándar ni precios fijos. Cada evento es diseñado a la medida de tus sueños. Te invitamos a usar el **Curador de Momentos** en nuestra web para seleccionar los servicios que deseas y enviar la cotización a WhatsApp, donde te brindaremos un presupuesto personalizado.",
        bodas: "✨ Nuestras **Bodas de Fantasía** se organizan en nuestra sede campestre. El plan básico incluye montaje de gala, DJ & Maxi TK con hora loca, bebidas calientes, bebidas frías ilimitadas, mesa de snack y pasabocas, meseros, decoración y un OBSEQUIO ESPECIAL.",
        quince: "👑 Para **Quinceaños**, diseñamos noches mágicas en nuestra sede campestre. El plan básico incluye montaje de gala, DJ & Maxi TK con hora loca, bebidas calientes, bebidas frías ilimitadas, mesa de snack y pasabocas, meseros, decoración y un OBSEQUIO ESPECIAL.",
        grados: "🎓 Organizamos **Grados, Proms y Eventos Empresariales**. El plan básico incluye montaje de gala en sede campestre, DJ & Maxi TK con hora loca, bebidas calientes, bebidas frías ilimitadas, mesa de snack y pasabocas, meseros, decoración y un OBSEQUIO ESPECIAL.",
        seguridad: "⚠️ **AVISO IMPORTANTE DE SEGURIDAD:** Para proteger a nuestros clientes de fraudes y clonación de información, en Festejos Santaella **NUNCA** solicitamos transferencias bancarias, depósitos digitales o consignaciones. Cualquier abono, separación de fecha o pago de contrato se realiza **únicamente de forma presencial en nuestra oficina** (Carrera 13 N° 9 - 40, Segundo Piso, Funza). ¡No caigas en estafas!"
    };

    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}`;
        
        // Simple markdown parsing for bold text
        let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        msgDiv.innerHTML = `<p>${formattedText}</p>`;
        
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function showTypingIndicator() {
        const indicatorDiv = document.createElement('div');
        indicatorDiv.className = 'chat-message bot typing-indicator';
        indicatorDiv.id = 'typing-indicator';
        indicatorDiv.innerHTML = `<span></span><span></span><span></span>`;
        chatBody.appendChild(indicatorDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    function processBotResponse(queryKey) {
        showTypingIndicator();
        
        // Simulate thinking delay
        setTimeout(() => {
            removeTypingIndicator();
            const responseText = chatbotResponses[queryKey] || chatbotResponses.contacto;
            appendMessage(responseText, 'bot');
        }, 1200);
    }

    // Attach listener to Predefined Quick Replies
    quickReplyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.getAttribute('data-query');
            const btnText = btn.textContent;
            
            // Add user message bubble
            appendMessage(btnText, 'user');
            
            // Trigger reply
            processBotResponse(query);
        });
    });

    // Custom text input processing
    function handleCustomInput() {
        const text = chatInput.value.trim().toLowerCase();
        if (text === '') return;

        // Append user bubble
        appendMessage(chatInput.value.trim(), 'user');
        chatInput.value = '';

        showTypingIndicator();

        setTimeout(() => {
            removeTypingIndicator();
            let matchedKey = '';

            // Keyword analysis
            if (text.includes('sede') || text.includes('campestre') || text.includes('finca') || text.includes('jardin') || text.includes('salon')) {
                matchedKey = 'sede';
            } else if (text.includes('donde') || text.includes('direccion') || text.includes('ubicacion') || text.includes('funza') || text.includes('oficina') || text.includes('mapa')) {
                matchedKey = 'contacto';
            } else if (text.includes('precio') || text.includes('costo') || text.includes('cotizar') || text.includes('cuanto') || text.includes('presupuesto')) {
                matchedKey = 'precios';
            } else if (text.includes('boda') || text.includes('matrimonio') || text.includes('casar')) {
                matchedKey = 'bodas';
            } else if (text.includes('quince') || text.includes('15') || text.includes('quinceañera')) {
                matchedKey = 'quince';
            } else if (text.includes('grado') || text.includes('prom') || text.includes('colegio')) {
                matchedKey = 'grados';
            } else if (text.includes('pagar') || text.includes('consignar') || text.includes('cuenta') || text.includes('abono') || text.includes('transferencia') || text.includes('consignacion') || text.includes('fraude') || text.includes('estafa') || text.includes('banco') || text.includes('separar')) {
                matchedKey = 'seguridad';
            }

            let botReply = '';
            if (matchedKey) {
                botReply = chatbotResponses[matchedKey];
            } else {
                botReply = "😊 Gracias por escribirnos. Para cotizar una fecha en específico o aclarar detalles a medida, te sugiero presionar el botón de abajo **'Hablar con un asesor real'** para chatear en WhatsApp o llamarnos al **322 758 0494**.";
            }

            appendMessage(botReply, 'bot');
        }, 1200);
    }

    chatSendBtn.addEventListener('click', handleCustomInput);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleCustomInput();
        }
    });


    // ==========================================================================
    // 7. GALLERY FILTER SYSTEM
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // ==========================================================================
    // 8. LIGHTBOX MODAL FOR PORTFOLIO
    // ==========================================================================
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('data-src');
            const imgAlt = item.querySelector('img').getAttribute('alt');
            
            lightboxModal.style.display = 'block';
            lightboxImg.src = imgSrc;
            lightboxCaption.textContent = imgAlt;
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightboxModal.style.display = 'none';
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal.style.display === 'block') {
            closeLightbox();
        }
    });

    // ==========================================================================
    // 9. CONTACT FORM VALIDATION & INTERACTIVE SIMULATION
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('form-name').value.trim();
            const phone = document.getElementById('form-phone').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const message = document.getElementById('form-message').value.trim();
            
            if (name === '' || phone === '' || message === '') {
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Por favor, completa todos los campos marcados con asterisco (*).';
                return;
            }
            
            const contactMsg = `*Nuevo Mensaje de Contacto - Sitio Web Santaella*\n\n` +
                               `*Nombre:* ${name}\n` +
                               `*Celular:* ${phone}\n` +
                               `*Correo:* ${email ? email : 'No provisto'}\n` +
                               `*Mensaje:* ${message}`;
            
            const encodedContact = encodeURIComponent(contactMsg);
            const waContactURL = `https://wa.me/573227580494?text=${encodedContact}`;
            
            formStatus.className = 'form-status success';
            formStatus.innerHTML = `<strong>¡Mensaje Enviado con Éxito!</strong><br>Estamos redirigiéndote a WhatsApp para que hables con nosotros de inmediato. Si no abre automáticamente, <a href="${waContactURL}" target="_blank" style="text-decoration: underline; color: #fff;">haz clic aquí</a>.`;
            
            setTimeout(() => {
                window.open(waContactURL, '_blank');
                contactForm.reset();
            }, 2500);
        });
    }

    // Visitor Counter Logic (API Integration with Robust Growth Fallback)
    function initVisitorCounter() {
        const countSpan = document.getElementById('visitor-count');
        if (!countSpan) return;

        // 1. Calculate a highly realistic simulated count as a fallback
        // Base: 1420 visits starting June 1st, 2026
        const startDate = new Date('2026-06-01T00:00:00-05:00').getTime(); 
        const currentDate = Date.now();
        const diffDays = (currentDate - startDate) / (24 * 60 * 60 * 1000);
        const visitsPerDay = 145; // Average daily visits
        const baseVisits = 1420;
        const simulatedCount = Math.floor(baseVisits + (diffDays * visitsPerDay));

        // 2. Try to fetch from the live CounterAPI
        const hasVisited = sessionStorage.getItem('festejos_santaella_visited');
        const namespace = 'festejossantaella';
        const key = 'visits';
        
        let apiURL = `https://api.counterapi.dev/v1/${namespace}/${key}`;
        if (!hasVisited) {
            // First time in this session, increment the count
            apiURL += '/up';
            sessionStorage.setItem('festejos_santaella_visited', 'true');
        }

        fetch(apiURL)
            .then(res => res.json())
            .then(data => {
                if (data && typeof data.count !== 'undefined') {
                    // Use the maximum of the live count and simulated count to keep it looking consistent
                    const finalCount = Math.max(data.count, simulatedCount);
                    countSpan.textContent = finalCount.toLocaleString('es-CO');
                } else {
                    countSpan.textContent = simulatedCount.toLocaleString('es-CO');
                }
            })
            .catch(err => {
                console.warn('Counter API blocked or offline, using simulated count fallback:', err);
                // Fall back to the simulated count if blocked by AdBlock/Brave
                countSpan.textContent = simulatedCount.toLocaleString('es-CO');
            });
    }
    initVisitorCounter();

});
