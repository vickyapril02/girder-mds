import $ from 'jquery';

import version from '@girder/core/version';
import View from '@girder/core/views/View';
import { cancelRestRequests, getApiRoot } from '@girder/core/rest';
import events from '@girder/core/events';
import { getCurrentUser } from '@girder/core/auth';

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
        }
    },

    initialize: function (settings) {
        cancelRestRequests('fetch');
        this.brandName = settings.brandName || 'MEDITWIN';
        
        // Add class to hide default Girder elements
        $('body').addClass('g-landing-page-active');
        
        this.render();
    },

    render: function () {
        const currentUser = getCurrentUser();
        
        if (currentUser) {
            // Remove the landing page class when logged in
            $('body').removeClass('g-landing-page-active');
            // For logged-in users, redirect to collections
            events.trigger('g:navigateTo', 'collections');
            return this;
        }
        
        // For anonymous users, show the full impressive MEDITWIN landing page
        this.$el.html(`
            <div class="g-landing">
                <div class="g-landing-header">
                    <div class="g-brand">
                        <div class="g-logo">
                            <div class="g-heart-logo">🫀</div>
                        </div>
                        <div class="g-title">MEDITWIN brings together French science and technology excellence around virtual twins for the future of medical care</div>
                    </div>
                    <div class="g-auth">
                        <button class="g-link g-login-link">Login</button>
                        <button class="g-link g-register-link">Sign up</button>
                    </div>
                </div>
                
                <div class="g-landing-hero">
                    <div class="g-hero-title">Meditwin Complex Data Platform</div>
                    <div class="g-hero-subtitle">Manage, explore, and share your data securely</div>
                </div>
                
                <div class="g-landing-content">
                    <div class="g-section">
                        <div class="g-section-header">
                            <div class="g-section-icon">🏥</div>
                            <div class="g-section-title">Our Project</div>
                        </div>
                        <div class="g-section-content">
                            <div class="g-project-description">
                                <p>MEDITWIN is a cutting-edge platform designed to revolutionize medical data management and analysis. Our mission is to provide researchers, clinicians, and medical professionals with powerful tools to manage complex medical datasets while maintaining the highest standards of security and privacy.</p>
                                
                                <div class="g-features-grid">
                                    <div class="g-feature">
                                        <div class="g-feature-icon">🔬</div>
                                        <div class="g-feature-title">Advanced Research Tools</div>
                                        <div class="g-feature-desc">State-of-the-art data analysis and visualization capabilities for medical research</div>
                                    </div>
                                    <div class="g-feature">
                                        <div class="g-feature-icon">🛡️</div>
                                        <div class="g-feature-title">HIPAA Compliant</div>
                                        <div class="g-feature-desc">Full compliance with medical data protection regulations and standards</div>
                                    </div>
                                    <div class="g-feature">
                                        <div class="g-feature-icon">🤝</div>
                                        <div class="g-feature-title">Collaborative Platform</div>
                                        <div class="g-feature-desc">Enable seamless collaboration between medical teams and research institutions</div>
                                    </div>
                                    <div class="g-feature">
                                        <div class="g-feature-icon">📊</div>
                                        <div class="g-feature-title">Real-time Analytics</div>
                                        <div class="g-feature-desc">Live data processing and insights for immediate clinical decision support</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="g-section">
                        <div class="g-section-header">
                            <div class="g-section-icon">🖼️</div>
                            <div class="g-section-title">Gallery</div>
                        </div>
                        <div class="g-section-content">
                            <div class="g-gallery">
                                <div class="g-photo">
                                    <div class="g-photo-placeholder">Medical Data Visualization</div>
                                </div>
                                <div class="g-photo">
                                    <div class="g-photo-placeholder">Research Dashboard</div>
                                </div>
                                <div class="g-photo">
                                    <div class="g-photo-placeholder">Clinical Interface</div>
                                </div>
                                <div class="g-photo">
                                    <div class="g-photo-placeholder">Analytics Platform</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="g-section">
                        <div class="g-section-header">
                            <div class="g-section-icon">🏢</div>
                            <div class="g-section-title">About Our Company</div>
                        </div>
                        <div class="g-section-content">
                            <div class="g-company-info">
                                <p>MEDITWIN is developed by a team of medical professionals, data scientists, and software engineers dedicated to advancing healthcare through technology. We are committed to providing innovative solutions that improve patient outcomes and accelerate medical research.</p>
                                
                                <div class="g-contact-info">
                                    <div class="g-contact-item">
                                        <strong>Contact:</strong> meditwin.contact@ihu-liryc.fr
                                    </div>
                                    <div class="g-contact-item">
                                        <strong>Institution:</strong> IHU LIRYC - Bordeaux University Hospital
                                    </div>
                                    <div class="g-contact-item">
                                        <strong>Location:</strong> Bordeaux, France
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
        
        return this;
    }
});

export default FrontPageView;
