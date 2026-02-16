/**
 * TECH FIXER - Core Logic [v1.0]
 * Authorized Dev: FAHAD UMAR MALIK
 * Location: techfixerpk.github.io
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SYSTEM INITIALIZATION LOGS ---
    console.log("%c [ SYSTEM_NODE_ACTIVE ] ", "background: #00f2ff; color: #000; font-weight: bold;");
    console.log("%c Location: techfixerpk.github.io ", "color: #00f2ff;");

    // --- 2. SCROLL REVEAL PROTOCOL ---
    // Elements with 'reveal' class will fade in on scroll
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
// --- MOBILE MENU TOGGLE ---
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        // 'hidden' class ko remove/add karega aur 'flex' ko toggle karega
        navMenu.classList.toggle('hidden');
        navMenu.classList.toggle('flex');
    });

    // Menu ke kisi link par click ho toh menu band ho jaye
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.add('hidden');
            navMenu.classList.remove('flex');
        });
    });
}
    // --- 3. DYNAMIC FORM HANDLING (FORMSPREE) ---
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const statusMsg = document.getElementById('statusMsg');

    if (contactForm) {
        contactForm.onsubmit = async (e) => {
            e.preventDefault();
            
            // Visual feedback
            submitBtn.innerText = "TRANSMITTING_PAYLOAD...";
            submitBtn.style.opacity = "0.5";
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    // Success Logic
                    contactForm.reset();
                    if (statusMsg) {
                        statusMsg.classList.remove('hidden');
                        statusMsg.innerText = "[ DATA_TRANSMITTED_SUCCESSFULLY ]";
                    }
                    console.log("[ FORM_SUCCESS ]: Payload sent to server.");
                } else {
                    throw new Error("Uplink failed.");
                }
            } catch (error) {
                // Error Logic
                if (statusMsg) {
                    statusMsg.classList.remove('hidden');
                    statusMsg.innerText = "[ ERROR: UPLINK_INTERRUPTED ]";
                    statusMsg.style.color = "#ff0055";
                }
                console.error("[ FORM_ERROR ]:", error);
            } finally {
                submitBtn.innerText = "TRANSMIT_PAYLOAD";
                submitBtn.style.opacity = "1";
                submitBtn.disabled = false;
                
                // Hide status message after 6 seconds
                setTimeout(() => {
                    if (statusMsg) statusMsg.classList.add('hidden');
                }, 6000);
            }
        };
    }

    // --- 4. NAVIGATION AUTO-BLUR ---
    window.onscroll = () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.background = "rgba(0, 0, 0, 0.95)";
            nav.style.boxShadow = "0 4px 30px rgba(0, 242, 255, 0.05)";
        } else {
            nav.style.background = "rgba(0, 0, 0, 0.85)";
            nav.style.boxShadow = "none";
        }
    };

    // --- 5. LOGOUT MESSAGE (EASTER EGG) ---
    window.addEventListener('beforeunload', () => {
        console.log("[ SYSTEM_DISCONNECTING... ]");
    });
});


