import $ from 'jquery';

import version from '@girder/core/version';
import View from '@girder/core/views/View';
import { cancelRestRequests, getApiRoot } from '@girder/core/rest';
import events from '@girder/core/events';
import { getCurrentUser } from '@girder/core/auth';
import { translate, setLanguage, getCurrentLanguage } from '@girder/core/utilities/translations';

import '../stylesheets/body/frontPage.styl';

/**
 * This is the view for the front page of the app.
 */
var FrontPageView = View.extend({
    events: {
        'click .g-register-link': function () {
            events.trigger('g:registerUi');
        },
        'click .g-login-link': function () {
            events.trigger('g:loginUi');
        },
        'click .g-explore-platform-btn': function () {
            events.trigger('g:loginUi');
        },
        'click .g-language-switcher': function (event) {
            event.preventDefault();
            // MDS-Data only supports English, so this is disabled
            console.log('MDS-Data platform only supports English language');
        }
    },

    initialize: function (settings) {
        cancelRestRequests('fetch');
        this.brandName = settings.brandName || 'MDS-Data';
        
        // Add class to hide default Girder elements
        $('body').addClass('g-landing-page-active');
        
        // Listen for language changes
        this.languageChangeHandler = () => {
            this.render();
        };
        window.addEventListener('languageChanged', this.languageChangeHandler);
        
        // Listen for login/logout events to re-render
        this.loginHandler = () => {
            this.render();
        };
        events.on('g:login', this.loginHandler);
        events.on('g:logout', this.loginHandler);
        
        this.render();
    },

    render: function () {
        const currentUser = getCurrentUser();
        
        if (currentUser) {
            // Remove the landing page class when logged in
            $('body').removeClass('g-landing-page-active');
            // For logged-in users, show a custom dashboard instead of redirecting
            this.renderLoggedInDashboard();
            return this;
        }
        
        // For anonymous users, show the full impressive MDS-Data landing page
        this.$el.html(`
            <div class="g-landing">
                <div class="g-landing-header">
                    <div class="g-brand">
                        <div class="g-logo">
                            <div class="g-data-logo">📊</div>
                        </div>
                        <div class="g-title">${translate('MDS-Data brings together advanced data science and multimodal analytics for comprehensive data management and visualization')}</div>
                    </div>
                    <div class="g-auth">
                        <button class="g-link g-login-link">${translate('Login')}</button>
                        <button class="g-link g-register-link">${translate('Sign up')}</button>
                    </div>
                </div>
                
                <div class="g-landing-hero">
                    <div class="g-hero-title">${translate('MDS-Data Platform')}</div>
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
                                <p>${translate('MDS-Data is developed by a team of data scientists, software engineers, and researchers dedicated to advancing data science through innovative technology. We are committed to providing cutting-edge solutions that accelerate research and enable breakthrough discoveries.')}</p>
                                
                                <p>${translate('We manage the data science platform that enables seamless collaboration between research teams and institutions, providing powerful and efficient data handling for scientific research and analysis.')}</p>
                                
                                <div class="g-team-section">
                                    <h3 class="g-team-title">${translate('Our Team')}</h3>
                                    <div class="g-team-grid">
                                        <div class="g-team-member" onclick="window.open('https://www.example.com/team-lead', '_blank')">
                                            <div class="g-team-member-info">
                                                <div class="g-team-member-name">${translate('Data Science Lead')}</div>
                                                <div class="g-team-member-role">${translate('Research Director')}</div>
                                                <div class="g-team-member-link">${translate('View Profile')} →</div>
                                            </div>
                                        </div>
                                        <div class="g-team-member">
                                            <div class="g-team-member-info">
                                                <div class="g-team-member-name">${translate('Research Director')}</div>
                                                <div class="g-team-member-role">${translate('Team Member')}</div>
                                            </div>
                                        </div>
                                        <div class="g-team-member">
                                            <div class="g-team-member-info">
                                                <div class="g-team-member-name">${translate('Team Member')}</div>
                                                <div class="g-team-member-role">${translate('Team Member')}</div>
                                            </div>
                                        </div>
                                        <div class="g-team-member">
                                            <div class="g-team-member-info">
                                                <div class="g-team-member-name">${translate('Team Member')}</div>
                                                <div class="g-team-member-role">${translate('Team Member')}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="g-contact-info">
                                    <div class="g-contact-item">
                                        <strong>${translate('Contact:')}</strong> contact@mds-data.org
                                    </div>
                                    <div class="g-contact-item">
                                        <strong>${translate('Institution:')}</strong> Data Science Research Center
                                    </div>
                                    <div class="g-contact-item">
                                        <strong>${translate('Location:')}</strong> Research Center
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
        
        return this;
    },

    /**
     * Render a custom dashboard for logged-in users
     */
    renderLoggedInDashboard: function () {
        const currentUser = getCurrentUser();
        
        this.$el.html(`
            <div class="g-dashboard">
                <div class="g-dashboard-header">
                    <div class="g-welcome-section">
                        <div class="g-welcome-icon">📊</div>
                        <div class="g-welcome-content">
                            <h1 class="g-welcome-title">${translate('Welcome to MDS-Data')}</h1>
                            <p class="g-welcome-subtitle">${translate('Your data science platform')}</p>
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
                        </div>
                    </div>
                </div>
            </div>
        `);
        
        return this;
    },

    destroy: function () {
        // Clean up event listeners
        if (this.languageChangeHandler) {
            window.removeEventListener('languageChanged', this.languageChangeHandler);
        }
        if (this.loginHandler) {
            events.off('g:login', this.loginHandler);
            events.off('g:logout', this.loginHandler);
        }
        View.prototype.destroy.call(this);
    }
});

export default FrontPageView;
