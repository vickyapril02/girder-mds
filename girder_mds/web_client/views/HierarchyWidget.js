import '../stylesheets/quickNavigation.styl';

const HierarchyWidget = girder.views.widgets.HierarchyWidget;
const events = girder.events;
const { handleClose } = girder.dialog;
const UploadWidget = girder.views.widgets.UploadWidget;
const { wrap } = girder.utilities.PluginUtils;
const { SORT_ASC, SORT_DESC } = girder.constants;
const $ = girder.$;
const _ = girder._;

const FOLDER_SORT_FIELDS = {
    name: 'Name',
    created: 'Date Created',
    updated: 'Date Updated',
    size: 'Size'
};

function buildQuickNavHtml(hierarchy) {
    const crumbs = hierarchy.breadcrumbs || [];
    let pathHtml = '';
    if (crumbs.length > 0) {
        pathHtml = crumbs.map((b, index) => {
            const sep = index > 0 ? '<span class="g-quick-nav-separator"> / </span>' : '';
            return `${sep}<span class="g-quick-nav-folder-name">${_.escape(b.get('name'))}</span>`;
        }).join('');
    } else {
        pathHtml = `<span class="g-quick-nav-folder-name">${_.escape(hierarchy.parentModel.get('name'))}</span>`;
    }

    const backBtn = crumbs.length > 1
        ? `<button class="g-quick-back btn btn-default btn-sm" title="Go back to parent folder">
               <i class="icon-left-open"></i> Back
           </button>`
        : '';

    return `
        <div class="g-quick-navigation-container">
            <div class="g-quick-nav-header"><h5>Quick Navigation</h5></div>
            <div class="g-quick-nav-current">
                <strong>Current: </strong>
                <span class="g-quick-nav-path">${pathHtml}</span>
            </div>
            <div class="g-quick-nav-actions">
                <button class="g-quick-upload btn btn-success btn-sm" title="Upload files here">
                    <i class="icon-upload"></i> Upload Here
                </button>
                ${backBtn}
            </div>
        </div>
    `;
}

function buildFolderSortHtml(collection) {
    const sortDir = collection.sortDir || SORT_ASC;
    const menuItems = Object.keys(FOLDER_SORT_FIELDS).map((field) => {
        return `<li role="presentation">
            <a class="g-collection-sort-link" role="menuitem" g-sort="${field}">
                ${_.escape(FOLDER_SORT_FIELDS[field])}
            </a>
        </li>`;
    }).join('');

    return `
        <div class="btn-group">
            <a class="g-sort-order-button g-up btn btn-sm${sortDir === SORT_ASC ? '' : ' hide'}" title="Sort order">
                <i class="icon-sort-name-up"></i>
            </a>
            <a class="g-sort-order-button g-down btn btn-sm${sortDir === SORT_DESC ? '' : ' hide'}" title="Sort order">
                <i class="icon-sort-name-down"></i>
            </a>
            <button class="g-collection-sort-actions btn btn-sm btn-default dropdown-toggle"
                data-toggle="dropdown" title="Sort by Field" type="button">
                Sort by <i class="icon-down-dir"></i>
            </button>
            <ul class="g-collection-sort-menu dropdown-menu" role="menu">
                ${menuItems}
            </ul>
        </div>
    `;
}

function applyFolderSort(hierarchy, sortField, toggleDirection) {
    const collection = hierarchy.folderListView && hierarchy.folderListView.collection;
    const parent = hierarchy.parentModel;
    if (!collection || !parent) {
        return;
    }

    if (toggleDirection) {
        collection.sortDir = collection.sortDir === SORT_ASC ? SORT_DESC : SORT_ASC;
    } else if (sortField) {
        collection.sortField = sortField;
    }

    hierarchy.folderListView.render();
    renderFolderSortBar(hierarchy);

    collection.fetch({
        parentType: parent.resourceName,
        parentId: parent.get('_id')
    }, true);
}

function bindFolderSortEvents(hierarchy) {
    hierarchy.$el.off('click.mdsSort', '.g-mds-folder-sort-container a.g-collection-sort-link');
    hierarchy.$el.off('click.mdsSort', '.g-mds-folder-sort-container a.g-sort-order-button');
    hierarchy.$el.on('click.mdsSort', '.g-mds-folder-sort-container a.g-collection-sort-link', function (event) {
        event.preventDefault();
        applyFolderSort(hierarchy, $(event.currentTarget).attr('g-sort'), false);
    });
    hierarchy.$el.on('click.mdsSort', '.g-mds-folder-sort-container a.g-sort-order-button', function (event) {
        event.preventDefault();
        applyFolderSort(hierarchy, null, true);
    });
}

function renderFolderSortBar(hierarchy) {
    const collection = hierarchy.folderListView && hierarchy.folderListView.collection;
    if (!collection) {
        return;
    }

    if (!hierarchy.$('.g-mds-folder-sort-container').length) {
        hierarchy.$('.g-quick-navigation-container').after(
            '<div class="g-mds-folder-sort-container"></div>'
        );
    }

    hierarchy.$('.g-mds-folder-sort-container').html(buildFolderSortHtml(collection));
}

Object.assign(HierarchyWidget.prototype.events, {
    'click .g-quick-upload': 'uploadDialog',
    'click .g-quick-back': 'upOneLevel',
    'click .g-quick-nav-folder-name': 'navigateToBreadcrumb'
});

HierarchyWidget.prototype.navigateToBreadcrumb = function (event) {
    event.preventDefault();
    const index = $(event.currentTarget).parent().find('.g-quick-nav-folder-name').index(event.currentTarget);
    if (index >= 0 && index < this.breadcrumbs.length) {
        this.breadcrumbs = this.breadcrumbs.slice(0, index + 1);
        this.setCurrentModel(this.breadcrumbs[index]);
    }
};

wrap(HierarchyWidget, 'render', function (render) {
    render.call(this);

    if (!this.$('.g-quick-navigation-container').length) {
        this.$('.g-folder-list-container').before(buildQuickNavHtml(this));
    } else {
        this.$('.g-quick-navigation-container').replaceWith(buildQuickNavHtml(this));
    }

    renderFolderSortBar(this);
    bindFolderSortEvents(this);

    return this;
});

wrap(HierarchyWidget, 'setCurrentModel', function (setCurrentModel, parent, opts) {
    setCurrentModel.call(this, parent, opts);

    if (this.uploadWidget) {
        this.uploadWidget.parent = parent;
        this.uploadWidget.parentType = parent.resourceName;
        if (this.uploadWidget.updateParent) {
            this.uploadWidget.updateParent(parent);
        }
    }
});

wrap(HierarchyWidget, 'uploadDialog', function () {
    const container = $('#g-dialog-container');

    this.uploadWidget = new UploadWidget({
        el: container,
        parent: this.parentModel,
        parentType: this.parentModel.resourceName,
        parentView: this
    }).on('g:uploadFinished', function () {
        handleClose('upload');
        this.upload = false;
        events.trigger('g:alert', {
            icon: 'ok',
            text: 'Upload completed successfully!',
            type: 'success',
            timeout: 2000
        });
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }, this).render();
});

// Fix folder click upload target (Girder 5 uses uploadWidget.parent not .folder)
wrap(HierarchyWidget, 'initialize', function (initialize, settings) {
    initialize.call(this, settings);

    this.folderListView.off('g:folderClicked').on('g:folderClicked', function (folder) {
        this.descend(folder);
        if (this.uploadWidget) {
            this.uploadWidget.parent = folder;
            this.uploadWidget.parentType = folder.resourceName;
        }
    }, this);

    if (this.folderListView) {
        this.folderListView.collection.on('g:changed', () => {
            renderFolderSortBar(this);
        }, this);
    }
});
