/**
 * Translation utility for multi-language localization
 */

// English translations
const englishTranslations = {
    // Common UI elements
    'Login': 'Login',
    'Sign up': 'Sign up',
    'Info saved.': 'Info saved.',
    'Password changed.': 'Password changed.',
    'Passwords do not match, try again.': 'Passwords do not match, try again.',
    
    // Front page content
    'Meditwin brings together French science and technology excellence around virtual twins for the future of medical care': 'Meditwin brings together French science and technology excellence around virtual twins for the future of medical care',
    'Meditwin Complex Data Platform': 'Meditwin Complex Data Platform',
    'Manage, explore, and share your data securely': 'Manage, explore, and share your data securely',
    'Our Project': 'Our Project',
    'MEDITWIN is revolutionizing healthcare with personalized virtual twins of organs, metabolism, and tumors to improve diagnosis and treatment. Seven medical innovations in neurology, cardiology, and oncology will be developed and deployed via a sovereign industrial cloud platform. Led by Dassault Systèmes and top medical institutions, MEDITWIN sets a new global standard for virtual healthcare.': 'MEDITWIN is revolutionizing healthcare with personalized virtual twins of organs, metabolism, and tumors to improve diagnosis and treatment. Seven medical innovations in neurology, cardiology, and oncology will be developed and deployed via a sovereign industrial cloud platform. Led by Dassault Systèmes and top medical institutions, MEDITWIN sets a new global standard for virtual healthcare.',
    
    // Features
    'Advanced Research Tools': 'Advanced Research Tools',
    'State-of-the-art data analysis and visualization capabilities for medical research': 'State-of-the-art data analysis and visualization capabilities for medical research',
    'HIPAA Compliant': 'HIPAA Compliant',
    'Full compliance with medical data protection regulations and standards': 'Full compliance with medical data protection regulations and standards',
    'Collaborative Platform': 'Collaborative Platform',
    'Enable seamless collaboration between medical teams and research institutions': 'Enable seamless collaboration between medical teams and research institutions',
    'Real-time Analytics': 'Real-time Analytics',
    'Live data processing and insights for immediate clinical decision support': 'Live data processing and insights for immediate clinical decision support',
    
    // Gallery
    'Gallery': 'Gallery',
    'Medical Data Visualization': 'Medical Data Visualization',
    'Research Dashboard': 'Research Dashboard',
    'Clinical Interface': 'Clinical Interface',
    'Analytics Platform': 'Analytics Platform',
    
    // About section
    'About Our Company': 'About Our Company',
    'Meditwin is developed by a team of medical professionals, data scientists, and software engineers dedicated to advancing healthcare through technology. We are committed to providing innovative solutions that improve patient outcomes and accelerate medical research.': 'Meditwin is developed by a team of medical professionals, data scientists, and software engineers dedicated to advancing healthcare through technology. We are committed to providing innovative solutions that improve patient outcomes and accelerate medical research.',
    'Contact:': 'Contact:',
    'Institution:': 'Institution:',
    'Location:': 'Location:',
    'Bordeaux, France': 'Bordeaux, France',
    
    // User account
    'Email': 'Email',
    'First Name': 'First Name',
    'Last Name': 'Last Name',
    'Admin': 'Admin',
    'Old Password': 'Old Password',
    'New Password': 'New Password',
    'Retype Password': 'Retype Password',
    'Change Password': 'Change Password',
    'API Keys': 'API Keys',
    'Two-Factor Authentication': 'Two-Factor Authentication',
    
    // Collections and navigation
    'Collections': 'Collections',
    'Users': 'Users',
    'Groups': 'Groups',
    'Admin Panel': 'Admin Panel',
    'Search': 'Search',
    'Upload': 'Upload',
    'Download': 'Download',
    'Delete': 'Delete',
    'Edit': 'Edit',
    'Create': 'Create',
    'Save': 'Save',
    'Cancel': 'Cancel',
    'Close': 'Close',
    'Back': 'Back',
    'Next': 'Next',
    'Previous': 'Previous',
    'Loading...': 'Loading...',
    'Error': 'Error',
    'Success': 'Success',
    'Warning': 'Warning',
    'Info': 'Info',
    
    // Language switcher
    'Language': 'Language',
    'English': 'English',
    'Français': 'Français',
    
    // Folder dropdown navigation
    'Folder Navigation': 'Folder Navigation',
    'Select All': 'Select All',
    'Loading folders...': 'Loading folders...',
    'Error loading folders': 'Error loading folders',
    'No folders found': 'No folders found',
    'Expand': 'Expand',
    'Collapse': 'Collapse',
    // Landing page
    'Welcome to': 'Welcome to',
    'You are currently browsing anonymously.': 'You are currently browsing anonymously.',
    'To explore the data hosted on this server, start with the': 'To explore the data hosted on this server, start with the',
    'page.': 'page.',
    'To create an account, use the': 'To create an account, use the',
    'link in the upper right corner.': 'link in the upper right corner.',
    'If you already have an account you can': 'If you already have an account you can',
    'log in': 'log in',
    'with the link in the upper right corner.': 'with the link in the upper right corner.',
    'You are currently logged in as': 'You are currently logged in as',
    'personal data space': 'personal data space',
    'or your': 'or your',
    'user account page': 'user account page',
    'Girder is': 'Girder is',
    'is powered by Girder,': 'is powered by Girder,',
    'Kitware\'s open-source platform for data management, analytics, and visualization. To learn more about how Kitware and Girder can help to solve your data challenges, read our series of': 'Kitware\'s open-source platform for data management, analytics, and visualization. To learn more about how Kitware and Girder can help to solve your data challenges, read our series of',
    'blog posts': 'blog posts',
    'or': 'or',
    'contact us': 'contact us',
    'directly.': 'directly.',
    'To learn more about Girder\'s software, including how you can host your own instance either locally or in the cloud, see the': 'To learn more about Girder\'s software, including how you can host your own instance either locally or in the cloud, see the',
    'User Guide': 'User Guide',
    'the': 'the',
    'full documentation': 'full documentation',
    'or visit the': 'or visit the',
    'GitHub repository': 'GitHub repository',
    'To use the REST API to interact with this server, check out the': 'To use the REST API to interact with this server, check out the',
    'interactive web API docs': 'interactive web API docs',
            'This instance of': 'This instance of',
            'was built from version': 'was built from version',
            // Meditwin Landing Page
            'Meditwin brings together French science and technology excellence around virtual twins for the future of medical care': 'Meditwin brings together French science and technology excellence around virtual twins for the future of medical care',
            'Meditwin Complex Data Platform': 'Meditwin Complex Data Platform',
            'Manage, explore, and share your data securely': 'Manage, explore, and share your data securely',
            'Our Project': 'Our Project',
            'MEDITWIN is revolutionizing healthcare with personalized virtual twins of organs, metabolism, and tumors to improve diagnosis and treatment. Seven medical innovations in neurology, cardiology, and oncology will be developed and deployed via a sovereign industrial cloud platform. Led by Dassault Systèmes and top medical institutions, MEDITWIN sets a new global standard for virtual healthcare.': 'MEDITWIN is revolutionizing healthcare with personalized virtual twins of organs, metabolism, and tumors to improve diagnosis and treatment. Seven medical innovations in neurology, cardiology, and oncology will be developed and deployed via a sovereign industrial cloud platform. Led by Dassault Systèmes and top medical institutions, MEDITWIN sets a new global standard for virtual healthcare.',
            'Advanced Research Tools': 'Advanced Research Tools',
            'State-of-the-art data analysis and visualization capabilities for medical research': 'State-of-the-art data analysis and visualization capabilities for medical research',
            'HIPAA Compliant': 'HIPAA Compliant',
            'Full compliance with medical data protection regulations and standards': 'Full compliance with medical data protection regulations and standards',
            'Collaborative Platform': 'Collaborative Platform',
            'Enable seamless collaboration between medical teams and research institutions': 'Enable seamless collaboration between medical teams and research institutions',
            'Real-time Analytics': 'Real-time Analytics',
            'Live data processing and insights for immediate clinical decision support': 'Live data processing and insights for immediate clinical decision support',
            'Gallery': 'Gallery',
            'Medical Data Visualization': 'Medical Data Visualization',
            'Research Dashboard': 'Research Dashboard',
            'Clinical Interface': 'Clinical Interface',
            'Analytics Platform': 'Analytics Platform',
            'About Our Company': 'About Our Company',
            'Meditwin is developed by a team of medical professionals, data scientists, and software engineers dedicated to advancing healthcare through technology. We are committed to providing innovative solutions that improve patient outcomes and accelerate medical research.': 'Meditwin is developed by a team of medical professionals, data scientists, and software engineers dedicated to advancing healthcare through technology. We are committed to providing innovative solutions that improve patient outcomes and accelerate medical research.',
            'Contact:': 'Contact:',
            'Institution:': 'Institution:',
            'Location:': 'Location:'
};

// French translations
const frenchTranslations = {
    // Common UI elements
    'Login': 'Connexion',
    'Sign up': 'S\'inscrire',
    'Info saved.': 'Informations sauvegardées.',
    'Password changed.': 'Mot de passe modifié.',
    'Passwords do not match, try again.': 'Les mots de passe ne correspondent pas, réessayez.',
    
    // Front page content
    'Meditwin brings together French science and technology excellence around virtual twins for the future of medical care': 'Meditwin rassemble l\'excellence française en science et technologie autour des jumeaux virtuels pour l\'avenir des soins médicaux',
    'Meditwin Complex Data Platform': 'Plateforme de Données Complexes Meditwin',
    'Manage, explore, and share your data securely': 'Gérez, explorez et partagez vos données en toute sécurité',
    'Our Project': 'Notre Projet',
    'MEDITWIN is revolutionizing healthcare with personalized virtual twins of organs, metabolism, and tumors to improve diagnosis and treatment. Seven medical innovations in neurology, cardiology, and oncology will be developed and deployed via a sovereign industrial cloud platform. Led by Dassault Systèmes and top medical institutions, MEDITWIN sets a new global standard for virtual healthcare.': 'MEDITWIN révolutionne la santé grâce à des jumeaux virtuels personnalisés des organes, du métabolisme et des tumeurs pour mieux diagnostiquer et soigner. Sept innovations médicales en neurologie, cardiologie et oncologie seront développées et déployées via une plateforme cloud souveraine. Porté par Dassault Systèmes et des institutions médicales d\'excellence, MEDITWIN établit un nouveau standard mondial en santé virtuelle.',
    
    // Features
    'Advanced Research Tools': 'Outils de Recherche Avancés',
    'State-of-the-art data analysis and visualization capabilities for medical research': 'Capacités d\'analyse et de visualisation de données de pointe pour la recherche médicale',
    'HIPAA Compliant': 'Conforme HIPAA',
    'Full compliance with medical data protection regulations and standards': 'Conformité totale aux réglementations et standards de protection des données médicales',
    'Collaborative Platform': 'Plateforme Collaborative',
    'Enable seamless collaboration between medical teams and research institutions': 'Permettre une collaboration transparente entre les équipes médicales et les institutions de recherche',
    'Real-time Analytics': 'Analyses en Temps Réel',
    'Live data processing and insights for immediate clinical decision support': 'Traitement et insights de données en direct pour un support décisionnel clinique immédiat',
    
    // Gallery
    'Gallery': 'Galerie',
    'Medical Data Visualization': 'Visualisation de Données Médicales',
    'Research Dashboard': 'Tableau de Bord de Recherche',
    'Clinical Interface': 'Interface Clinique',
    'Analytics Platform': 'Plateforme d\'Analyses',
    
    // About section
    'About Our Company': 'À Propos de Notre Entreprise',
    'Meditwin is developed by a team of medical professionals, data scientists, and software engineers dedicated to advancing healthcare through technology. We are committed to providing innovative solutions that improve patient outcomes and accelerate medical research.': 'Meditwin est développé par une équipe de professionnels de la santé, de scientifiques des données et d\'ingénieurs logiciels dédiés à l\'amélioration des soins de santé par la technologie. Nous nous engageons à fournir des solutions innovantes qui améliorent les résultats des patients et accélèrent la recherche médicale.',
    'Contact:': 'Contact :',
    'Institution:': 'Institution :',
    'Location:': 'Localisation :',
    'Bordeaux, France': 'Bordeaux, France',
    
    // User account
    'Email': 'Email',
    'First Name': 'Prénom',
    'Last Name': 'Nom',
    'Admin': 'Administrateur',
    'Old Password': 'Ancien Mot de Passe',
    'New Password': 'Nouveau Mot de Passe',
    'Retype Password': 'Retapez le Mot de Passe',
    'Change Password': 'Changer le Mot de Passe',
    'API Keys': 'Clés API',
    'Two-Factor Authentication': 'Authentification à Deux Facteurs',
    
    // Collections and navigation
    'Collections': 'Collections',
    'Users': 'Utilisateurs',
    'Groups': 'Groupes',
    'Admin Panel': 'Panneau d\'Administration',
    'Search': 'Rechercher',
    'Upload': 'Télécharger',
    'Download': 'Télécharger',
    'Delete': 'Supprimer',
    'Edit': 'Modifier',
    'Create': 'Créer',
    'Save': 'Sauvegarder',
    'Cancel': 'Annuler',
    'Close': 'Fermer',
    'Back': 'Retour',
    'Next': 'Suivant',
    'Previous': 'Précédent',
    'Loading...': 'Chargement...',
    'Error': 'Erreur',
    'Success': 'Succès',
    'Warning': 'Avertissement',
    'Info': 'Information',
    
    // Language switcher
    'Language': 'Langue',
    'English': 'English',
    'Français': 'Français',
    
    // Folder dropdown navigation
    'Folder Navigation': 'Navigation des Dossiers',
    'Select All': 'Tout Sélectionner',
    'Loading folders...': 'Chargement des dossiers...',
    'Error loading folders': 'Erreur lors du chargement des dossiers',
    'No folders found': 'Aucun dossier trouvé',
    'Expand': 'Développer',
    'Collapse': 'Réduire',
    // Landing page
    'Welcome to': 'Bienvenue sur',
    'You are currently browsing anonymously.': 'Vous naviguez actuellement de manière anonyme.',
    'To explore the data hosted on this server, start with the': 'Pour explorer les données hébergées sur ce serveur, commencez par la page',
    'page.': '.',
    'To create an account, use the': 'Pour créer un compte, utilisez le lien',
    'link in the upper right corner.': 'dans le coin supérieur droit.',
    'If you already have an account you can': 'Si vous avez déjà un compte, vous pouvez vous',
    'log in': 'connecter',
    'with the link in the upper right corner.': 'avec le lien dans le coin supérieur droit.',
    'You are currently logged in as': 'Vous êtes actuellement connecté en tant que',
    'personal data space': 'espace de données personnel',
    'or your': 'ou votre',
    'user account page': 'page de compte utilisateur',
    'Girder is': 'Girder est',
    'is powered by Girder,': 'est alimenté par Girder,',
    'Kitware\'s open-source platform for data management, analytics, and visualization. To learn more about how Kitware and Girder can help to solve your data challenges, read our series of': 'plateforme open-source de Kitware pour la gestion de données, l\'analyse et la visualisation. Pour en savoir plus sur la façon dont Kitware et Girder peuvent vous aider à résoudre vos défis de données, lisez notre série de',
    'blog posts': 'articles de blog',
    'or': 'ou',
    'contact us': 'contactez-nous',
    'directly.': 'directement.',
    'To learn more about Girder\'s software, including how you can host your own instance either locally or in the cloud, see the': 'Pour en savoir plus sur le logiciel Girder, y compris comment vous pouvez héberger votre propre instance localement ou dans le cloud, consultez le',
    'User Guide': 'Guide de l\'utilisateur',
    'the': 'la',
    'full documentation': 'documentation complète',
    'or visit the': 'ou visitez le',
    'GitHub repository': 'dépôt GitHub',
    'To use the REST API to interact with this server, check out the': 'Pour utiliser l\'API REST pour interagir avec ce serveur, consultez la',
    'interactive web API docs': 'documentation interactive de l\'API web',
            'This instance of': 'Cette instance de',
            'was built from version': 'a été construite à partir de la version',
            // Meditwin Landing Page
            'Meditwin brings together French science and technology excellence around virtual twins for the future of medical care': 'Meditwin rassemble l\'excellence française en science et technologie autour des jumeaux virtuels pour l\'avenir des soins médicaux',
            'Meditwin Complex Data Platform': 'Plateforme de Données Complexes Meditwin',
            'Manage, explore, and share your data securely': 'Gérez, explorez et partagez vos données en toute sécurité',
            'Our Project': 'Notre Projet',
            'MEDITWIN is revolutionizing healthcare with personalized virtual twins of organs, metabolism, and tumors to improve diagnosis and treatment. Seven medical innovations in neurology, cardiology, and oncology will be developed and deployed via a sovereign industrial cloud platform. Led by Dassault Systèmes and top medical institutions, MEDITWIN sets a new global standard for virtual healthcare.': 'MEDITWIN révolutionne la santé grâce à des jumeaux virtuels personnalisés des organes, du métabolisme et des tumeurs pour mieux diagnostiquer et soigner. Sept innovations médicales en neurologie, cardiologie et oncologie seront développées et déployées via une plateforme cloud souveraine. Porté par Dassault Systèmes et des institutions médicales d\'excellence, MEDITWIN établit un nouveau standard mondial en santé virtuelle.',
            'Advanced Research Tools': 'Outils de Recherche Avancés',
            'State-of-the-art data analysis and visualization capabilities for medical research': 'Capacités d\'analyse et de visualisation de données de pointe pour la recherche médicale',
            'HIPAA Compliant': 'Conforme HIPAA',
            'Full compliance with medical data protection regulations and standards': 'Conformité totale aux réglementations et standards de protection des données médicales',
            'Collaborative Platform': 'Plateforme Collaborative',
            'Enable seamless collaboration between medical teams and research institutions': 'Permettre une collaboration transparente entre les équipes médicales et les institutions de recherche',
            'Real-time Analytics': 'Analyses en Temps Réel',
            'Live data processing and insights for immediate clinical decision support': 'Traitement de données en direct et insights pour un support décisionnel clinique immédiat',
            'Gallery': 'Galerie',
            'Medical Data Visualization': 'Visualisation de Données Médicales',
            'Research Dashboard': 'Tableau de Bord de Recherche',
            'Clinical Interface': 'Interface Clinique',
            'Analytics Platform': 'Plateforme d\'Analyses',
            'About Our Company': 'À Propos de Notre Entreprise',
            'Meditwin is developed by a team of medical professionals, data scientists, and software engineers dedicated to advancing healthcare through technology. We are committed to providing innovative solutions that improve patient outcomes and accelerate medical research.': 'Meditwin est développé par une équipe de professionnels de la santé, de scientifiques des données et d\'ingénieurs logiciels dédiés à l\'amélioration des soins de santé par la technologie. Nous nous engageons à fournir des solutions innovantes qui améliorent les résultats des patients et accélèrent la recherche médicale.',
            'Contact:': 'Contact :',
            'Institution:': 'Institution :',
            'Location:': 'Localisation :'
};

// Current language state - load from localStorage or default to French
let currentLanguage = localStorage.getItem('meditwin-language') || 'french';

// Get current translations based on language
function getCurrentTranslations() {
    return currentLanguage === 'french' ? frenchTranslations : englishTranslations;
}

/**
 * Translate a key based on current language
 * @param {string} key - The text to translate
 * @returns {string} - The translated text or the original key if not found
 */
export function translate(key) {
    const translations = getCurrentTranslations();
    return translations[key] || key;
}

/**
 * Set the current language
 * @param {string} language - 'english' or 'french'
 */
export function setLanguage(language) {
    if (language === 'english' || language === 'french') {
        currentLanguage = language;
        // Save language choice to localStorage for persistence
        localStorage.setItem('meditwin-language', currentLanguage);
        // Trigger a custom event to notify components to re-render
        window.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: currentLanguage } 
        }));
    }
}

/**
 * Get the current language
 * @returns {string} - Current language ('english' or 'french')
 */
export function getCurrentLanguage() {
    return currentLanguage;
}

/**
 * Get all available translations for current language
 * @returns {Object} - The translations object for current language
 */
export function getTranslations() {
    return getCurrentTranslations();
}

/**
 * Add or update a translation for both languages
 * @param {string} key - The text key
 * @param {string} englishValue - The English translation
 * @param {string} frenchValue - The French translation
 */
export function setTranslation(key, englishValue, frenchValue) {
    englishTranslations[key] = englishValue;
    frenchTranslations[key] = frenchValue;
}

export default {
    translate,
    setLanguage,
    getCurrentLanguage,
    getTranslations,
    setTranslation
};
