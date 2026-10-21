const App = girder.views.App;
const router = girder.router;
const eventStream = girder.utilities.eventStream;
const { getCurrentUser } = girder.auth;
const { wrap } = girder.utilities.PluginUtils;

// Force MDS-Data branding (Girder 5 admin UI no longer edits these in the browser).
wrap(App, 'initialize', function (initialize, settings) {
    settings = settings || {};
    settings.brandName = 'MDS-Data';
    settings.bannerColor = settings.bannerColor || '#4CAF50';
    initialize.call(this, settings);
});

wrap(App, 'login', function () {
    if (getCurrentUser()) {
        eventStream.open();
        window.location.reload();
    } else {
        router.navigate('/', { trigger: true });
    }
});
