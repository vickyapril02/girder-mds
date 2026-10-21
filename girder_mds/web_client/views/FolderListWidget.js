import FolderListTemplate from '../templates/folderList.pug';
import '../stylesheets/folderListDropdown.styl';

const FolderListWidget = girder.views.widgets.FolderListWidget;
const FolderModel = girder.models.FolderModel;
const { restRequest } = girder.rest;
const { wrap } = girder.utilities.PluginUtils;
const { SORT_ASC } = girder.constants;
const $ = girder.$;

const NAME_COMPARE_OPTIONS = { numeric: true, sensitivity: 'base' };

function compareSortValues(aVal, bVal, sortField, sortDir) {
    if (sortField === 'name') {
        return (aVal || '').localeCompare(bVal || '', undefined, NAME_COMPARE_OPTIONS) * sortDir;
    }

    if (sortField === 'size' || sortField === 'created' || sortField === 'updated') {
        const aNum = aVal || 0;
        const bNum = bVal || 0;
        return (aNum > bNum ? 1 : aNum < bNum ? -1 : 0) * sortDir;
    }

    return String(aVal || '').localeCompare(String(bVal || ''), undefined, NAME_COMPARE_OPTIONS) * sortDir;
}

function sortFolders(folders, field, dir) {
    const sortDir = dir || SORT_ASC;
    const sortField = field || 'name';

    return folders.slice().sort((a, b) => {
        return compareSortValues(a[sortField], b[sortField], sortField, sortDir);
    });
}

function sortFolderModels(models, field, dir) {
    const sortDir = dir || SORT_ASC;
    const sortField = field || 'name';

    return models.slice().sort((a, b) => {
        const aVal = typeof a.get === 'function' ? a.get(sortField) : a[sortField];
        const bVal = typeof b.get === 'function' ? b.get(sortField) : b[sortField];
        return compareSortValues(aVal, bVal, sortField, sortDir);
    });
}

FolderListWidget.prototype.getSortedFolders = function () {
    const { sort, sortdir } = this.getSortParams();
    return sortFolderModels(this.collection.toArray(), sort, sortdir);
};

FolderListWidget.prototype.getSortParams = function () {
    return {
        sort: this.collection.sortField || 'name',
        sortdir: this.collection.sortDir || SORT_ASC
    };
};

FolderListWidget.prototype.resortFolderChildren = function () {
    const { sort, sortdir } = this.getSortParams();

    Object.keys(this.folderChildren).forEach((folderId) => {
        if (this.folderChildren[folderId] && this.folderChildren[folderId].length) {
            this.folderChildren[folderId] = sortFolders(this.folderChildren[folderId], sort, sortdir);
        }
    });
};

FolderListWidget.prototype.refreshExpandedFolderChildren = function () {
    const expanded = Array.from(this.expandedFolders);
    expanded.forEach((folderId) => {
        this.loadFolderChildren(folderId, true);
    });
};

FolderListWidget.prototype.toggleFolder = function (folderId) {
    if (!folderId) {
        return;
    }
    if (this.expandedFolders.has(folderId)) {
        this.expandedFolders.delete(folderId);
    } else {
        this.expandedFolders.add(folderId);
        if (!this.folderChildren[folderId]) {
            this.loadFolderChildren(folderId);
            return;
        }
    }
    this.render();
};

FolderListWidget.prototype.loadFolderChildren = function (folderId, force) {
    if (this.loadingFolders.has(folderId)) {
        return;
    }

    if (!force && this.folderChildren[folderId]) {
        return;
    }

    this.loadingFolders.add(folderId);
    this.folderChildren[folderId] = [];

    const { sort, sortdir } = this.getSortParams();

    restRequest({
        url: 'folder',
        method: 'GET',
        data: {
            parentType: 'folder',
            parentId: folderId,
            limit: 0,
            sort: sort,
            sortdir: sortdir
        }
    }).done((response) => {
        this.folderChildren[folderId] = sortFolders(response, sort, sortdir);
        this.loadingFolders.delete(folderId);
        this.render();
    }).fail(() => {
        this.loadingFolders.delete(folderId);
        this.folderChildren[folderId] = [];
        this.render();
    });
};

FolderListWidget.prototype.findFolderById = function (folderId) {
    for (const parentId in this.folderChildren) {
        const children = this.folderChildren[parentId];
        for (let i = 0; i < children.length; i++) {
            if (children[i]._id === folderId) {
                return new FolderModel({
                    _id: children[i]._id,
                    name: children[i].name,
                    public: children[i].public,
                    parentId: children[i].parentId,
                    parentType: children[i].parentType || 'folder',
                    resourceName: 'folder'
                });
            }
        }
    }
    return null;
};

wrap(FolderListWidget, 'initialize', function (initialize, settings) {
    this.expandedFolders = new Set();
    this.folderChildren = {};
    this.loadingFolders = new Set();
    this._lastSortKey = null;
    initialize.call(this, settings);

    this.collection.on('g:changed', () => {
        const { sort, sortdir } = this.getSortParams();
        const sortKey = `${sort}:${sortdir}`;

        if (this._lastSortKey !== null && this._lastSortKey !== sortKey) {
            this.refreshExpandedFolderChildren();
        } else {
            this.resortFolderChildren();
        }
        this._lastSortKey = sortKey;
    }, this);
});

wrap(FolderListWidget, 'render', function () {
    this.checked = [];
    this.$el.html(FolderListTemplate({
        folders: this.getSortedFolders(),
        hasMore: this.collection.hasNextPage(),
        checkboxes: this._checkboxes,
        expandedFolders: this.expandedFolders,
        folderChildren: this.folderChildren
    }));
    return this;
});

Object.assign(FolderListWidget.prototype.events, {
    'click .g-folder-dropdown-toggle': function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.toggleFolder($(event.currentTarget).attr('data-folder-id'));
    }
});

FolderListWidget.prototype.events['click a.g-folder-list-link'] = function (event) {
    event.preventDefault();
    const cid = $(event.currentTarget).attr('g-folder-cid');
    const folderId = $(event.currentTarget).attr('data-folder-id');

    let folder;
    if (cid && this.collection.get(cid)) {
        folder = this.collection.get(cid);
    } else if (folderId) {
        folder = this.findFolderById(folderId);
    }

    if (folder) {
        this.trigger('g:folderClicked', folder);
    }
};
