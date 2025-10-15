import $ from 'jquery';
import _ from 'underscore';

import FolderCollection from '@girder/core/collections/FolderCollection';
import FolderModel from '@girder/core/models/FolderModel';
import View from '@girder/core/views/View';
import { restRequest } from '@girder/core/rest';
import { translate } from '../../utilities/translations';

import '@girder/core/stylesheets/widgets/folderTreeWidget.styl';

/**
 * This widget shows a hierarchical tree view of folders with collapsible/expandable functionality.
 * It displays the entire folder structure in a tree format with arrows to expand/collapse folders.
 */
var FolderTreeWidget = View.extend({
    events: {
        'click .g-folder-tree-toggle': function (event) {
            event.preventDefault();
            event.stopPropagation();
            const folderId = $(event.currentTarget).attr('data-folder-id');
            this.toggleFolder(folderId);
        },
        'click .g-folder-tree-link': function (event) {
            event.preventDefault();
            const folderId = $(event.currentTarget).attr('data-folder-id');
            this.trigger('g:folderClicked', this.folders[folderId]);
        },
        'click .g-folder-tree-checkbox': function (event) {
            event.stopPropagation();
            const folderId = $(event.currentTarget).attr('data-folder-id');
            const checked = $(event.currentTarget).prop('checked');
            this.setFolderChecked(folderId, checked);
        }
    },

    initialize: function (settings) {
        this.parentType = settings.parentType || 'collection';
        this.parentId = settings.parentId;
        this.checkboxes = settings.checkboxes || false;
        this.folderFilter = settings.folderFilter;
        
        // Store all folders by ID for quick access
        this.folders = {};
        this.folderChildren = {}; // Maps folder ID to array of child folder IDs
        this.expandedFolders = new Set(); // Track which folders are expanded
        this.checkedFolders = new Set(); // Track which folders are checked
        
        // Load the complete folder hierarchy
        this.loadFolderHierarchy();
    },

    /**
     * Load the complete folder hierarchy from the server
     */
    loadFolderHierarchy: function () {
        this.$el.html('<div class="g-folder-tree-loading">' + translate('Loading folders...') + '</div>');
        
        // Fetch all folders in the collection
        restRequest({
            url: 'folder',
            method: 'GET',
            data: {
                parentType: this.parentType,
                parentId: this.parentId,
                limit: 0 // Get all folders
            }
        }).done((response) => {
            this.buildFolderHierarchy(response);
            this.render();
        }).fail(() => {
            this.$el.html('<div class="g-folder-tree-error">' + translate('Error loading folders') + '</div>');
        });
    },

    /**
     * Build the folder hierarchy from the flat list of folders
     */
    buildFolderHierarchy: function (folders) {
        // Clear existing data
        this.folders = {};
        this.folderChildren = {};
        
        // Store all folders by ID
        folders.forEach(folder => {
            this.folders[folder._id] = folder;
            this.folderChildren[folder._id] = [];
        });
        
        // Build parent-child relationships
        folders.forEach(folder => {
            if (folder.parentId && this.folderChildren[folder.parentId]) {
                this.folderChildren[folder.parentId].push(folder._id);
            }
        });
        
        // Sort children by name
        Object.keys(this.folderChildren).forEach(folderId => {
            this.folderChildren[folderId].sort((a, b) => {
                return this.folders[a].name.localeCompare(this.folders[b].name);
            });
        });
    },

    /**
     * Toggle the expanded state of a folder
     */
    toggleFolder: function (folderId) {
        if (this.expandedFolders.has(folderId)) {
            this.expandedFolders.delete(folderId);
        } else {
            this.expandedFolders.add(folderId);
        }
        this.render();
    },

    /**
     * Set the checked state of a folder
     */
    setFolderChecked: function (folderId, checked) {
        if (checked) {
            this.checkedFolders.add(folderId);
        } else {
            this.checkedFolders.delete(folderId);
        }
        this.trigger('g:checkboxesChanged');
    },

    /**
     * Get all checked folder IDs
     */
    getCheckedFolders: function () {
        return Array.from(this.checkedFolders);
    },

    /**
     * Check all folders
     */
    checkAll: function (checked) {
        if (checked) {
            Object.keys(this.folders).forEach(folderId => {
                this.checkedFolders.add(folderId);
            });
        } else {
            this.checkedFolders.clear();
        }
        this.render();
        this.trigger('g:checkboxesChanged');
    },

    /**
     * Render the folder tree
     */
    render: function () {
        const rootFolders = this.getRootFolders();
        const treeHtml = this.renderFolderList(rootFolders, 0);
        
        this.$el.html(`
            <div class="g-folder-tree-container">
                <div class="g-folder-tree-header">
                    <div class="g-folder-tree-title">${translate('Folder Structure')}</div>
                    <div class="g-folder-tree-actions">
                        ${this.checkboxes ? `
                            <label class="g-folder-tree-check-all">
                                <input type="checkbox" class="g-folder-tree-check-all-input">
                                ${translate('Select All')}
                            </label>
                        ` : ''}
                        <div class="g-folder-tree-controls">
                            <button class="g-folder-tree-btn g-expand-all" title="${translate('Expand All')}">
                                <i class="icon-plus"></i>
                            </button>
                            <button class="g-folder-tree-btn g-collapse-all" title="${translate('Collapse All')}">
                                <i class="icon-minus"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="g-folder-tree-content">
                    ${treeHtml}
                </div>
            </div>
        `);
        
        // Bind check all functionality
        if (this.checkboxes) {
            this.$('.g-folder-tree-check-all-input').on('change', (e) => {
                this.checkAll($(e.target).prop('checked'));
            });
        }
        
        // Bind expand/collapse all functionality
        this.$('.g-expand-all').on('click', (e) => {
            e.preventDefault();
            this.expandAll();
        });
        
        this.$('.g-collapse-all').on('click', (e) => {
            e.preventDefault();
            this.collapseAll();
        });
        
        return this;
    },

    /**
     * Get root level folders (folders with no parent or parent is collection)
     */
    getRootFolders: function () {
        return Object.keys(this.folders).filter(folderId => {
            const folder = this.folders[folderId];
            return !folder.parentId || folder.parentType !== 'folder';
        });
    },

    /**
     * Render a list of folders with their children
     */
    renderFolderList: function (folderIds, depth) {
        if (!folderIds || folderIds.length === 0) {
            return '';
        }
        
        let html = '';
        folderIds.forEach(folderId => {
            const folder = this.folders[folderId];
            const children = this.folderChildren[folderId] || [];
            const hasChildren = children.length > 0;
            const isExpanded = this.expandedFolders.has(folderId);
            const isChecked = this.checkedFolders.has(folderId);
            
            html += `
                <div class="g-folder-tree-item" data-folder-id="${folderId}" style="padding-left: ${depth * 20}px">
                    <div class="g-folder-tree-row">
                        ${hasChildren ? `
                            <span class="g-folder-tree-toggle ${isExpanded ? 'expanded' : 'collapsed'}" 
                                  data-folder-id="${folderId}">
                                <i class="icon-right-dir"></i>
                            </span>
                        ` : '<span class="g-folder-tree-spacer"></span>'}
                        
                        ${this.checkboxes ? `
                            <input type="checkbox" class="g-folder-tree-checkbox" 
                                   data-folder-id="${folderId}" ${isChecked ? 'checked' : ''}>
                        ` : ''}
                        
                        <a href="#" class="g-folder-tree-link" data-folder-id="${folderId}">
                            <i class="icon-folder"></i>
                            <span class="g-folder-tree-name">${folder.name}</span>
                            ${folder.description ? `<span class="g-folder-tree-description">${folder.description}</span>` : ''}
                        </a>
                    </div>
                    
                    ${hasChildren && isExpanded ? `
                        <div class="g-folder-tree-children">
                            ${this.renderFolderList(children, depth + 1)}
                        </div>
                    ` : ''}
                </div>
            `;
        });
        
        return html;
    },

    /**
     * Expand all folders
     */
    expandAll: function () {
        Object.keys(this.folders).forEach(folderId => {
            if (this.folderChildren[folderId] && this.folderChildren[folderId].length > 0) {
                this.expandedFolders.add(folderId);
            }
        });
        this.render();
    },

    /**
     * Collapse all folders
     */
    collapseAll: function () {
        this.expandedFolders.clear();
        this.render();
    },

    /**
     * Find and expand the path to a specific folder
     */
    expandToFolder: function (folderId) {
        const path = this.getFolderPath(folderId);
        path.forEach(id => {
            if (this.folderChildren[id] && this.folderChildren[id].length > 0) {
                this.expandedFolders.add(id);
            }
        });
        this.render();
    },

    /**
     * Get the path from root to a specific folder
     */
    getFolderPath: function (folderId) {
        const path = [];
        let currentId = folderId;
        
        while (currentId && this.folders[currentId]) {
            path.unshift(currentId);
            currentId = this.folders[currentId].parentId;
        }
        
        return path;
    }
});

export default FolderTreeWidget;
