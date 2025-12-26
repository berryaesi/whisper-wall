class CustomNavbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['current-page'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'current-page') {
            this.render();
        }
    }

    render() {
        const currentPage = this.getAttribute('current-page') || 'home';
        
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: sticky;
                    top: 0;
                    z-index: 50;
                }
                header {
                    background: white;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }
                .container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }
                .nav-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 5rem;
                }
                .logo {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    text-decoration: none;
                }
                .logo-icon {
                    color: #f9a8d4;
                    width: 1.5rem;
                    height: 1.5rem;
                }
                .logo-text {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #1f2937;
                    transition: color 0.2s;
                }
                .logo:hover .logo-text {
                    color: #f9a8d4;
}
                nav {
                    display: flex;
                    gap: 2rem;
                }
                .nav-link {
                    position: relative;
                    color: #4b5563;
                    font-weight: 500;
                    text-decoration: none;
                    transition: color 0.2s;
                }
                .nav-link:hover {
                    color: #f9a8d4;
                }
                .nav-link.active {
                    color: #f9a8d4;
                    font-weight: 600;
                }
                .nav-link.active::after {
                    content: '';
                    position: absolute;
                    bottom: -0.5rem;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background-color: #f9a8d4;
border-radius: 1px;
                }
                @media (max-width: 640px) {
                    .container {
                        padding: 0 1rem;
                    }
                    nav {
                        gap: 1rem;
                    }
                }
            </style>
            <header>
                <div class="container">
                    <div class="nav-container">
                        <a href="index.html" class="logo">
                            <i data-feather="message-square" class="logo-icon"></i>
                            <span class="logo-text">Whisper Wall</span>
                        </a>
                        <nav>
                            <a href="index.html" class="nav-link ${currentPage === 'home' ? 'active' : ''}">Home</a>
                            <a href="wall.html" class="nav-link ${currentPage === 'wall' ? 'active' : ''}">Confession Wall</a>
                        </nav>
                    </div>
                </div>
            </header>
`;
    }
}

customElements.define('custom-navbar', CustomNavbar);