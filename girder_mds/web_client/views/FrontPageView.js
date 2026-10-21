import '../stylesheets/frontPage.styl';
import '../stylesheets/frontPage-grid.css';
import { translate } from '../utilities/translations.js';

const FrontPageView = girder.views.body.FrontPageView;
const events = girder.events;
const { getCurrentUser } = girder.auth;
const { cancelRestRequests } = girder.rest;
const { wrap } = girder.utilities.PluginUtils;

const mscIconUrl = '/plugin_static/mds/MSC_icon.svg';

const RESEARCH_OBJECTIVES = [
    'Computational cardiology',
    'Multimodal data science',
    'Digital twins',
    'Biophysical modelling',
    'Artificial intelligence methods',
];

const TEAM_LEADS = [
    'Maxime Sermesant, research director, Inria',
    'Hubert Cochet, co-lead, PU PH Radiologie, CHU / UBx, Pôle Technologies pour la Santé director',
];

const TEAM_ASSISTANTS = [
    'Fabienne Cuyollaa (Centre Inria de l’Université de Bordeaux)',
    'Nathalie Nordmann (local support Centre Inria d’Université Côte d’Azur)',
];

const TEAM_CENTERS = [
    {
        name: 'IHU Liryc (Centre Inria de l’Université de Bordeaux)',
        members: [
            'Buntheng Ly, PostDoc (Fondation Bordeaux Université)',
            'Elena Van-Breukelen-Garcia, Engineer (Fondation Bordeaux Université)',
            'Florent Collot, Engineer (Université de Bordeaux)',
            'Gabriel Husak, Engineer (Université de Bordeaux)',
            'Jairo Rodriguez-Padilla, PostDoc (Fondation Bordeaux Université)',
            'Kevin Bony, Radiology Technician (CHU de Bordeaux)',
            'Ludovic Germain, Radiology Technician (CHU de Bordeaux)',
            'Mathilde Merle, Engineer (Université de Bordeaux)',
            'Olivier Baris, Radiology Technician (CHU de Bordeaux)',
            'Sara Zein, Engineer (Université de Bordeaux)',
            'Vigneshwar Gurunathan, Engineer (Fondation Bordeaux Université)',
        ],
    },
    {
        name: 'Sophia Antipolis (Centre Inria d’Université Côte d’Azur)',
        members: [
            'Adrien Tchuem Tchuente, PhD student (Inria)',
            'Antoine Chan-Lock, Engineer (Inria)',
            'Camilla Ferrario, PhD student (Inria)',
            'Evariste Njomgue-Fotso, PhD student (Inria)',
            'Gaëtan Desrues, Engineer (Inria)',
            'Maelis Morier, PhD student (Inria)',
            'Nicolas Cedilnik, Engineer (Inria)',
            'Nicolas Drettakis, PhD student (Inria)',
            'Rafael Silva, PhD student (Inria)',
            'Margot Malis, MSc student (Inria)',
        ],
    },
];

const galleryUrl = '/plugin_static/mds/gallery';

const GALLERY_ITEMS = [
    { file: 'left-atrium-flux.mp4', caption: 'Left atrium flux in a heart' },
    { file: 'electromechanical-simulation.mp4', caption: 'Electromechanical simulation' },
    { file: 'segmentation-of-atrium.mp4', caption: 'Segmentation of atrium' },
    { file: 'electrophysiology-simulation.mp4', caption: 'Electrophysiology simulation' },
    { file: 'musicardio.png', caption: 'MUSICardio' },
    { file: 'team-bordeaux.jpg', caption: 'Team Bordeaux' },
];

// The track is rendered twice so the CSS scroll animation can loop without a visible jump.
function renderGalleryItems(isDuplicate) {
    return GALLERY_ITEMS.map(({ file, caption }) => {
        const src = `${galleryUrl}/${file}`;
        const media = file.endsWith('.mp4')
            ? `<video src="${src}" autoplay muted loop playsinline preload="auto"></video>`
            : `<img src="${src}" alt="${translate(caption)}" />`;
        return `
            <figure class="g-gallery-item"${isDuplicate ? ' aria-hidden="true"' : ''}>
                <div class="g-gallery-media">${media}</div>
                <figcaption>${translate(caption)}</figcaption>
            </figure>
        `;
    }).join('');
}

function renderMemberList(members) {
    return `<ul class="g-teams-list">${members.map((member) => `<li>${member}</li>`).join('')}</ul>`;
}

Object.assign(FrontPageView.prototype.events, {
    'click .g-explore-platform-btn': function () {
        events.trigger('g:loginUi');
    },
    'click .g-language-switcher': function (event) {
        event.preventDefault();
        console.log('MDS-Data platform only supports English language');
    },
});

FrontPageView.prototype.renderLoggedInDashboard = function () {
    const currentUser = getCurrentUser();

    this.$el.html(`
        <div class="g-dashboard">
            <div class="g-dashboard-header">
                <div class="g-welcome-section">
                    <div class="g-welcome-icon">📊</div>
                    <div class="g-welcome-content">
                        <h1 class="g-welcome-title">${translate('Phyba Data')}</h1>
                        <p class="g-welcome-subtitle">${translate('Your Data platform')}</p>
                        <p class="g-user-greeting">${translate('Hello')}, <strong>${currentUser.get('firstName') || currentUser.get('login')}</strong>!</p>
                    </div>
                </div>
            </div>

            <div class="g-dashboard-content">
                <div class="g-dashboard-grid">
                    <div class="g-dashboard-card">
                        <div class="g-card-icon">📁</div>
                        <div class="g-card-content">
                            <h3 class="g-card-title">${translate('My Data')}</h3>
                            <p class="g-card-description">${translate('Access and manage your personal research data and analysis files')}</p>
                            <a href="#user/${currentUser.id}" class="g-card-link">${translate('Go to My Data')} →</a>
                        </div>
                    </div>

                    <div class="g-dashboard-card">
                        <div class="g-card-icon">🗂️</div>
                        <div class="g-card-content">
                            <h3 class="g-card-title">${translate('Collections')}</h3>
                            <p class="g-card-description">${translate('Browse and explore shared research data collections')}</p>
                            <a href="#collections" class="g-card-link">${translate('View Collections')} →</a>
                        </div>
                    </div>

                    <div class="g-dashboard-card">
                        <div class="g-card-icon">👥</div>
                        <div class="g-card-content">
                            <h3 class="g-card-title">${translate('Collaboration')}</h3>
                            <p class="g-card-description">${translate('Work with research teams and share data securely')}</p>
                            <a href="#groups" class="g-card-link">${translate('Manage Groups')} →</a>
                        </div>
                    </div>

                    <div class="g-dashboard-card">
                        <div class="g-card-icon">⚙️</div>
                        <div class="g-card-content">
                            <h3 class="g-card-title">${translate('Account Settings')}</h3>
                            <p class="g-card-description">${translate('Manage your account preferences and security settings')}</p>
                            <a href="#useraccount/${currentUser.id}/info" class="g-card-link">${translate('Account Settings')} →</a>
                        </div>
                    </div>
                </div>

                <div class="g-dashboard-tools">
                    <h3 class="g-tools-title">${translate('Tools')}</h3>
                    <div class="g-tools-grid">
                        <div class="g-tool-card" onclick="window.open('/trame', '_blank')">
                            <div class="g-tool-icon">🎨</div>
                            <div class="g-tool-content">
                                <h4 class="g-tool-title">${translate('Trame')}</h4>
                                <p class="g-tool-description">${translate('Interactive visualization and data exploration tool')}</p>
                            </div>
                        </div>

                        <div class="g-tool-card" onclick="window.open('/paraview', '_blank')">
                            <div class="g-tool-icon">📊</div>
                            <div class="g-tool-content">
                                <h4 class="g-tool-title">${translate('Paraview')}</h4>
                                <p class="g-tool-description">${translate('Scientific visualization and data analysis platform')}</p>
                            </div>
                        </div>

                        <div class="g-tool-card" onclick="window.open('/lge', '_blank')">
                            <div class="g-tool-icon">🔒</div>
                            <div class="g-tool-content">
                                <h4 class="g-tool-title">${translate('LGE')}</h4>
                                <p class="g-tool-description">${translate('LGE Segmentation & Analysis Tool')}</p>
                            </div>
                        </div>

                        <div class="g-tool-card" onclick="window.open('/la-qc', '_blank')">
                            <div class="g-tool-icon">🫀</div>
                            <div class="g-tool-content">
                                <h4 class="g-tool-title">${translate('LA QC Interface')}</h4>
                                <p class="g-tool-description">${translate('Quality Interface for Left Artrium segmentation')}</p>
                            </div>
                        </div>

                        <div class="g-tool-card" onclick="window.open('/musicardio/', '_blank')">
                            <div class="g-tool-icon">
                                <img src="${mscIconUrl}" alt="MUSICardio icon" style="width:48px;height:48px;object-fit:contain;" />
                            </div>
                            <div class="g-tool-content">
                                <h4 class="g-tool-title">${translate('MUSICardio')}</h4>
                                <p class="g-tool-description">${translate('Multimodality platform for specific imaging in Cardiology')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="g-dashboard-gallery">
                    <h3 class="g-tools-title">${translate('Gallery')}</h3>
                    <div class="g-gallery-viewport">
                        <div class="g-gallery-track">
                            ${renderGalleryItems(false)}
                            ${renderGalleryItems(true)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);

    return this;
};

wrap(FrontPageView, 'initialize', function (initialize, settings) {
    settings = settings || {};
    settings.brandName = settings.brandName || 'MDS-Data';

    initialize.call(this, settings);

    // Only hide global nav on the anonymous landing page.
    // Adding this after login was hiding Collections/Admin nav for logged-in users.
    if (!getCurrentUser()) {
        document.body.classList.add('g-landing-page-active');
    } else {
        document.body.classList.remove('g-landing-page-active');
    }

    this.languageChangeHandler = () => {
        this.render();
    };
    window.addEventListener('languageChanged', this.languageChangeHandler);

    this.loginHandler = () => {
        this.render();
    };
    events.on('g:login', this.loginHandler);
    events.on('g:logout', this.loginHandler);
});

wrap(FrontPageView, 'render', function () {
    cancelRestRequests('fetch');

    const currentUser = getCurrentUser();

    if (currentUser) {
        document.body.classList.remove('g-landing-page-active');
        this.renderLoggedInDashboard();
        return this;
    }

    this.$el.html(`
        <div class="g-landing">
            <div class="g-landing-header">
                <div class="g-brand">
                    <div class="g-title">
                        <div class="g-team-name">Phyba</div>
                        <div class="g-team-tagline">${translate('Physiology-based Approaches in Computational Cardiology')}</div>
                    </div>
                </div>
                <div class="g-auth">
                    <button class="g-link g-login-link">${translate('Login')}</button>
                    <button class="g-link g-register-link">${translate('Sign up')}</button>
                </div>
                <p class="g-team-goals">${translate('The goals of the Phyba team are to propose new methods in computational cardiology through the analysis of multimodal clinical data and the development of personalized digital twins. We aim at improving clinical prevention, diagnosis, therapy and prognosis in cardiovascular diseases.')}</p>
            </div>

            <div class="g-landing-hero">
                <div class="g-hero-title">${translate('Phyba Data Platform')}</div>
                <div class="g-hero-subtitle">${translate('Building the future of data science through multimodal analytics')}</div>
                <div class="g-hero-cta">
                    <button class="g-cta-btn g-primary g-explore-platform-btn">
                        🔹 ${translate('Explore Platform')}
                    </button>
                    <button class="g-cta-btn g-secondary" onclick="window.open('https://www.example.com/mds-data', '_blank')">
                        🔹 ${translate('Learn More')}
                    </button>
                </div>
            </div>

            <div class="g-landing-content">
                <div class="g-section">
                    <div class="g-section-header">
                        <div class="g-section-icon">🏢</div>
                        <div class="g-section-title">${translate('About Us')}</div>
                    </div>
                    <div class="g-section-content">
                        <div class="g-company-info">
                            <h3 class="g-background-title">${translate('Our background')}</h3>
                            <p>
                                The Phyba team is built on 25 years of research in cardiac modelling and data science at
                                <a href="https://www.inria.fr/en" target="_blank" rel="noopener">Inria</a> (Sophia Antipolis and Bordeaux) and
                                <a href="https://www.ihu-liryc.fr/en/" target="_blank" rel="noopener">Liryc institute</a> (Pessac), in strong collaboration with
                                <a href="https://www.chu-bordeaux.fr/" target="_blank" rel="noopener">Bordeaux University Hospital</a>.
                                Developing personalized cardiac models includes numerous challenges: complex multi-physics multi-scale phenomena,
                                important variabilities between patients and within patients (adaptation, remodelling), and the resulting equations
                                are computationally demanding. In addition, clinical data is usually sparse and noisy. The originality of our approach
                                is to start from the patient data in order to define model complexity and parameter estimation procedures.
                            </p>
                            <p>
                                In parallel, the pioneering research on cardiac arrhythmias performed in Bordeaux enabled to understand the origin
                                of atrial fibrillation and to propose catheter ablation as a therapy. The creation of the Liryc institute in 2011
                                allowed to develop translational research looking at all scales and aspects of cardiac arrhythmias, as well as to
                                strengthen the links with Inria, a founding member of IHU Liryc. This collaboration proposed image integration with
                                unprecedented details for the understanding of arrhythmia mechanisms and the guidance of cardiac interventions.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="g-section">
                    <div class="g-section-header">
                        <div class="g-section-icon">🎯</div>
                        <div class="g-section-title">${translate('Our main research objectives')}</div>
                    </div>
                    <div class="g-section-content">
                        <ul class="g-objectives-grid">
                            ${RESEARCH_OBJECTIVES.map((objective) => `<li class="g-objective">${translate(objective)}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <div class="g-section">
                    <div class="g-section-header">
                        <div class="g-section-icon">👥</div>
                        <div class="g-section-title">${translate('Teams')}</div>
                    </div>
                    <div class="g-section-content g-teams">
                        <p class="g-teams-intro">${translate('Our Phyba team is bi-localized between Sophia Antipolis and IHU LIRYC in Pessac.')}</p>

                        <h4 class="g-teams-heading">${translate('Lead')}</h4>
                        ${renderMemberList(TEAM_LEADS)}

                        <h4 class="g-teams-heading">${translate('Team Assistant')}</h4>
                        ${renderMemberList(TEAM_ASSISTANTS)}

                        <div class="g-teams-centers">
                            ${TEAM_CENTERS.map((center) => `
                                <div class="g-teams-center">
                                    <h4 class="g-teams-heading">${center.name}</h4>
                                    ${renderMemberList(center.members)}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);

    return this;
});

wrap(FrontPageView, 'destroy', function (destroy) {
    if (this.languageChangeHandler) {
        window.removeEventListener('languageChanged', this.languageChangeHandler);
    }
    if (this.loginHandler) {
        events.off('g:login', this.loginHandler);
        events.off('g:logout', this.loginHandler);
    }
    document.body.classList.remove('g-landing-page-active');
    destroy.call(this);
});
