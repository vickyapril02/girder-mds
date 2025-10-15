import $ from 'jquery';
import View from '@girder/core/views/View';
import { translate } from '../../utilities/translations';

import '@girder/core/stylesheets/widgets/viewSwitcherWidget.styl';

/**
 * A widget that allows switching between different view modes (e.g., tree view vs list view)
 */
var ViewSwitcherWidget = View.extend({
    events: {
        'click .g-view-switcher-btn': function (event) {
            event.preventDefault();
            const viewType = $(event.currentTarget).attr('data-view-type');
            this.setViewType(viewType);
        }
    },

    initialize: function (settings) {
        this.currentViewType = settings.currentViewType || 'list';
        this.availableViews = settings.availableViews || [
            { type: 'list', label: 'List View', icon: 'icon-list' },
            { type: 'tree', label: 'Tree View', icon: 'icon-sitemap' }
        ];
        this.onViewChange = settings.onViewChange || function () {};
    },

    render: function () {
        this.$el.html(`
            <div class="g-view-switcher">
                <div class="g-view-switcher-label">${translate('View:')}</div>
                <div class="g-view-switcher-buttons">
                    ${this.availableViews.map(view => `
                        <button class="g-view-switcher-btn ${this.currentViewType === view.type ? 'active' : ''}" 
                                data-view-type="${view.type}" 
                                title="${translate(view.label)}">
                            <i class="${view.icon}"></i>
                            <span>${translate(view.label)}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `);
        
        return this;
    },

    setViewType: function (viewType) {
        if (this.currentViewType !== viewType) {
            this.currentViewType = viewType;
            this.render();
            this.onViewChange(viewType);
            this.trigger('g:viewChanged', viewType);
        }
    },

    getCurrentViewType: function () {
        return this.currentViewType;
    }
});

export default ViewSwitcherWidget;
