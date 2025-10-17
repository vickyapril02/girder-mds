import $ from 'jquery';

import version from '@girder/core/version';
import View from '@girder/core/views/View';
import { cancelRestRequests, getApiRoot } from '@girder/core/rest';
import events from '@girder/core/events';
import { getCurrentUser } from '@girder/core/auth';
import { translate, setLanguage, getCurrentLanguage } from '@girder/core/utilities/translations';

import '@girder/core/stylesheets/body/frontPage.styl';

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
        'click .g-language-switcher': function (event) {
            event.preventDefault();
            const newLanguage = getCurrentLanguage() === 'french' ? 'english' : 'french';
            setLanguage(newLanguage);
        }
    },

    initialize: function (settings) {
        cancelRestRequests('fetch');
        this.brandName = settings.brandName || 'Meditwin';
        
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
        
        // For anonymous users, show the full impressive Meditwin landing page
        this.$el.html(`
            <div class="g-landing">
                <div class="g-landing-header">
                    <div class="g-brand">
                        <div class="g-logo">
                            <div class="g-heart-logo">🫀</div>
                        </div>
                        <div class="g-title">${translate('Meditwin brings together French science and technology excellence around virtual twins for the future of medical care')}</div>
                    </div>
                    <div class="g-auth">
                        <button class="g-link g-login-link">${translate('Login')}</button>
                        <button class="g-link g-register-link">${translate('Sign up')}</button>
                        <button class="g-language-switcher">
                            <span class="g-current-lang">${getCurrentLanguage() === 'french' ? 'English' : 'Français'}</span>
                            <i class="icon-down-dir"></i>
                        </button>
                    </div>
                </div>
                
                <div class="g-landing-hero">
                    <div class="g-hero-title">${translate('Meditwin Complex Data Platform')}</div>
                    <div class="g-hero-subtitle">${translate('Manage, explore, and share your data securely')}</div>
                </div>
                
                <div class="g-landing-content">
                    <div class="g-section">
                        <div class="g-section-header g-centered">
                            <div class="g-section-icon">🏥</div>
                            <div class="g-section-title">${translate('Our Project')}</div>
                        </div>
                        <div class="g-section-content">
                            <div class="g-project-description">
                                <p class="g-project-paragraph">${translate('MEDITWIN is revolutionizing healthcare with personalized virtual twins of organs, metabolism, and tumors to improve diagnosis and treatment. Seven medical innovations in neurology, cardiology, and oncology will be developed and deployed via a sovereign industrial cloud platform. Led by Dassault Systèmes and top medical institutions, MEDITWIN sets a new global standard for virtual healthcare.')}</p>
                                
                                <div class="g-features-grid">
                                    <div class="g-feature">
                                        <div class="g-feature-icon">🔬</div>
                                        <div class="g-feature-title">${translate('Advanced Research Tools')}</div>
                                        <div class="g-feature-desc">${translate('State-of-the-art data analysis and visualization capabilities for medical research')}</div>
                                    </div>
                                    <div class="g-feature">
                                        <div class="g-feature-icon">🛡️</div>
                                        <div class="g-feature-title">${translate('HIPAA Compliant')}</div>
                                        <div class="g-feature-desc">${translate('Full compliance with medical data protection regulations and standards')}</div>
                                    </div>
                                    <div class="g-feature">
                                        <div class="g-feature-icon">🤝</div>
                                        <div class="g-feature-title">${translate('Collaborative Platform')}</div>
                                        <div class="g-feature-desc">${translate('Enable seamless collaboration between medical teams and research institutions')}</div>
                                    </div>
                                    <div class="g-feature">
                                        <div class="g-feature-icon">📊</div>
                                        <div class="g-feature-title">${translate('Real-time Analytics')}</div>
                                        <div class="g-feature-desc">${translate('Live data processing and insights for immediate clinical decision support')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="g-section">
                        <div class="g-section-header">
                            <div class="g-section-icon">🖼️</div>
                            <div class="g-section-title">${translate('Gallery')}</div>
                        </div>
                        <div class="g-section-content">
                            <div class="g-gallery">
                                <div class="g-photo">
                                    <div class="g-photo-placeholder">${translate('Medical Data Visualization')}</div>
                                </div>
                                <div class="g-photo">
                                    <div class="g-photo-placeholder">${translate('Research Dashboard')}</div>
                                </div>
                                <div class="g-photo">
                                    <div class="g-photo-placeholder">${translate('Clinical Interface')}</div>
                                </div>
                                <div class="g-photo">
                                    <div class="g-photo-placeholder">${translate('Analytics Platform')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="g-section">
                        <div class="g-section-header">
                            <div class="g-section-icon">🏢</div>
                            <div class="g-section-title">${translate('About Our Company')}</div>
                        </div>
                        <div class="g-section-content">
                            <div class="g-company-info">
                                <p>${translate('MEDITWIN is developed by a team of medical professionals, data scientists, and software engineers dedicated to advancing healthcare through technology. We are committed to providing innovative solutions that improve patient outcomes and accelerate medical research.')}</p>
                                
                                <div class="g-contact-info">
                                    <div class="g-contact-item">
                                        <strong>${translate('Contact:')}</strong> meditwin.contact@ihu-liryc.fr
                                    </div>
                                    <div class="g-contact-item">
                                        <strong>${translate('Institution:')}</strong> IHU LIRYC - Bordeaux University Hospital
                                    </div>
                                    <div class="g-contact-item">
                                        <strong>${translate('Location:')}</strong> Bordeaux, France
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
                        <div class="g-welcome-icon">🫀</div>
                        <div class="g-welcome-content">
                            <h1 class="g-welcome-title">${translate('Welcome to Meditwin')}</h1>
                            <p class="g-welcome-subtitle">${translate('Your medical data management platform')}</p>
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
                                <p class="g-card-description">${translate('Access and manage your personal medical data and research files')}</p>
                                <a href="#user/${currentUser.id}" class="g-card-link">${translate('Go to My Data')} →</a>
                            </div>
                        </div>
                        
                        <div class="g-dashboard-card">
                            <div class="g-card-icon">🗂️</div>
                            <div class="g-card-content">
                                <h3 class="g-card-title">${translate('Collections')}</h3>
                                <p class="g-card-description">${translate('Browse and explore shared medical data collections')}</p>
                                <a href="#collections" class="g-card-link">${translate('View Collections')} →</a>
                            </div>
                        </div>
                        
                        <div class="g-dashboard-card">
                            <div class="g-card-icon">👥</div>
                            <div class="g-card-content">
                                <h3 class="g-card-title">${translate('Collaboration')}</h3>
                                <p class="g-card-description">${translate('Work with teams and share data securely')}</p>
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
                    
                    <div class="g-dashboard-stats">
                        <div class="g-stats-section">
                            <h3 class="g-stats-title">${translate('Quick Stats')}</h3>
                            <div class="g-stats-grid">
                                <div class="g-stat-item">
                                    <div class="g-stat-number">--</div>
                                    <div class="g-stat-label">${translate('Files Uploaded')}</div>
                                </div>
                                <div class="g-stat-item">
                                    <div class="g-stat-number">--</div>
                                    <div class="g-stat-label">${translate('Collections')}</div>
                                </div>
                                <div class="g-stat-item">
                                    <div class="g-stat-number">--</div>
                                    <div class="g-stat-label">${translate('Groups Joined')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="g-dashboard-actions">
                        <h3 class="g-actions-title">${translate('Quick Actions')}</h3>
                        <div class="g-actions-buttons">
                            <button class="g-action-btn g-primary" onclick="events.trigger('g:navigateTo', 'collections')">
                                <i class="icon-folder"></i>
                                ${translate('Browse Collections')}
                            </button>
                            <button class="g-action-btn" onclick="events.trigger('g:navigateTo', 'user/' + '${currentUser.id}')">
                                <i class="icon-user"></i>
                                ${translate('My Data Space')}
                            </button>
                            <button class="g-action-btn" onclick="events.trigger('g:navigateTo', 'groups')">
                                <i class="icon-users"></i>
                                ${translate('Manage Groups')}
                            </button>
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
