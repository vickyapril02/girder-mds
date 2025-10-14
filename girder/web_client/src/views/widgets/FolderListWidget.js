import $ from 'jquery';
import _ from 'underscore';

import FolderCollection from '@girder/core/collections/FolderCollection';
import FolderModel from '@girder/core/models/FolderModel';
import LoadingAnimation from '@girder/core/views/widgets/LoadingAnimation';
import View from '@girder/core/views/View';
import { restRequest } from '@girder/core/rest';

import FolderListTemplate from '@girder/core/templates/widgets/folderList.pug';

import '@girder/core/stylesheets/widgets/folderListDropdown.styl';

/**
 * This widget shows a list of folders under a given parent.
 * Initialize this with a "parentType" and "parentId" value, which will
 * be passed to the folder GET endpoint.
 */
var FolderListWidget = View.extend({
    events: {
        'click a.g-folder-list-link': function (event) {
            event.preventDefault();
            var cid = $(event.currentTarget).attr('g-folder-cid');
            var folderId = $(event.currentTarget).attr('data-folder-id');
            
            // Handle both main collection folders and subfolders
            var folder;
            if (cid && this.collection.get(cid)) {
                folder = this.collection.get(cid);
            } else if (folderId) {
                // Create a folder model for subfolders
                folder = this.findFolderById(folderId);
            }
            
            if (folder) {
                this.trigger('g:folderClicked', folder);
            }
        },
        'click a.g-show-more-folders': function () {
            this.collection.fetchNextPage();
        },
        'click .g-folder-dropdown-toggle': function (event) {
            event.preventDefault();
            event.stopPropagation();
            const folderId = $(event.currentTarget).attr('data-folder-id');
            this.toggleFolder(folderId);
        },
        'change .g-list-checkbox': function (event) {
            const target = $(event.currentTarget);
            const cid = target.attr('g-folder-cid');
            if (target.prop('checked')) {
                this.checked.push(cid);
            } else {
                const idx = this.checked.indexOf(cid);
                if (idx !== -1) {
                    this.checked.splice(idx, 1);
                }
            }
            this.trigger('g:checkboxesChanged');
        }
    },

    initialize: function (settings) {
        this.checked = [];
        this._checkboxes = settings.checkboxes;
        this.parentType = settings.parentType || 'folder';
        this.parentId = settings.parentId;
        
        // Properties for dropdown functionality
        this.expandedFolders = new Set(); // Track which folders are expanded
        this.folderChildren = {}; // Cache of folder children
        this.loadingFolders = new Set(); // Track which folders are loading children

        new LoadingAnimation({
            el: this.$el,
            parentView: this
        }).render();

        this.collection = new FolderCollection();
        this.collection.append = true; // Append, don't replace pages
        this.collection.filterFunc = settings.folderFilter;

        this.collection.on('g:changed', function () {
            this.render();
            this.trigger('g:changed');
        }, this).fetch({
            parentType: this.parentType,
            parentId: this.parentId
        });
    },

    render: function () {
        this.checked = [];
        this.$el.html(FolderListTemplate({
            folders: this.collection.toArray(),
            hasMore: this.collection.hasNextPage(),
            checkboxes: this._checkboxes,
            expandedFolders: this.expandedFolders,
            folderChildren: this.folderChildren
        }));
        return this;
    },

    /**
     * Insert a folder into the collection and re-render it.
     */
    insertFolder: function (folder) {
        this.collection.add(folder);
        this.trigger('g:changed');
        this.render();
    },

    /**
     * Set all folder checkboxes to a certain checked state. The event
     * g:checkboxesChanged is triggered once after checking/unchecking everything.
     * @param {bool} checked The checked state.
     */
    checkAll: function (checked) {
        this.$('.g-list-checkbox').prop('checked', checked);

        this.checked = [];
        if (checked) {
            this.collection.each(function (model) {
                this.checked.push(model.cid);
            }, this);
        }

        this.trigger('g:checkboxesChanged');
    },

    recomputeChecked: function () {
        this.checked = _.map(this.$('.g-list-checkbox:checked'), function (checkbox) {
            return $(checkbox).attr('g-folder-cid');
        }, this);
    },

    /**
     * Toggle the expanded state of a folder and load its children if needed
     */
    toggleFolder: function (folderId) {
        if (this.expandedFolders.has(folderId)) {
            this.expandedFolders.delete(folderId);
        } else {
            this.expandedFolders.add(folderId);
            // Load children if not already loaded
            if (!this.folderChildren[folderId]) {
                this.loadFolderChildren(folderId);
            }
        }
        this.render();
    },

    /**
     * Load children for a specific folder
     */
    loadFolderChildren: function (folderId) {
        if (this.loadingFolders.has(folderId)) {
            return; // Already loading
        }

        this.loadingFolders.add(folderId);
        this.folderChildren[folderId] = [];

        restRequest({
            url: 'folder',
            method: 'GET',
            data: {
                parentType: 'folder',
                parentId: folderId,
                limit: 0 // Get all children
            }
        }).done((response) => {
            this.folderChildren[folderId] = response;
            this.loadingFolders.delete(folderId);
            this.render();
        }).fail(() => {
            this.loadingFolders.delete(folderId);
            this.folderChildren[folderId] = [];
            this.render();
        });
    },

    /**
     * Check if a folder has children (either loaded or needs to be loaded)
     */
    hasChildren: function (folderId) {
        return this.folderChildren[folderId] && this.folderChildren[folderId].length > 0;
    },

    /**
     * Get children for a specific folder
     */
    getChildren: function (folderId) {
        return this.folderChildren[folderId] || [];
    },

    /**
     * Check if a folder is expanded
     */
    isExpanded: function (folderId) {
        return this.expandedFolders.has(folderId);
    },

    /**
     * Check if a folder is currently loading children
     */
    isLoading: function (folderId) {
        return this.loadingFolders.has(folderId);
    },

    /**
     * Find a folder by ID in the loaded children
     */
    findFolderById: function (folderId) {
        // Search in all loaded children
        for (let parentId in this.folderChildren) {
            const children = this.folderChildren[parentId];
            for (let i = 0; i < children.length; i++) {
                if (children[i]._id === folderId) {
                    // Create a proper Backbone model for navigation
                    const folderData = {
                        _id: children[i]._id,
                        name: children[i].name,
                        public: children[i].public,
                        parentId: children[i].parentId,
                        parentType: children[i].parentType || 'folder',
                        resourceName: 'folder'
                    };
                    return new FolderModel(folderData);
                }
            }
        }
        return null;
    }
});

export default FolderListWidget;
