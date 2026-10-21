const HeaderView = girder.views.layout.HeaderView;
const { wrap } = girder.utilities.PluginUtils;

wrap(HeaderView, 'initialize', function (initialize, settings) {
    settings = settings || {};
    settings.brandName = settings.brandName || 'Phyba';
    settings.bannerColor = settings.bannerColor || '#4CAF50';
    initialize.call(this, settings);
});
