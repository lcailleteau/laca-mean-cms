"use strict";
/**
 * Bean to store menu item elements.
 */
var LacaMenuItem = (function () {
    /**
     * Constructor.
     */
    function LacaMenuItem(label, header, anchor, anchorWithSitePrefix, icon, expandable, expanded, items) {
        this.label = label;
        this.header = header;
        this.anchor = anchor;
        this.anchorWithSitePrefix = anchorWithSitePrefix;
        this.icon = icon;
        this.expandable = expandable;
        this.expanded = expanded;
        this.items = items;
    }
    /**
     * Static methods.
     */
    LacaMenuItem.headerItem = function (label) {
        return new LacaMenuItem(label, true, null, false, null, true, true, null);
    };
    LacaMenuItem.accordionItem = function (label, icon, expandable, expanded, items) {
        return new LacaMenuItem(label, false, null, false, icon, expandable, expanded, items);
    };
    LacaMenuItem.leafItem = function (label, anchor, anchorWithSitePrefix, icon) {
        return new LacaMenuItem(label, false, anchor, anchorWithSitePrefix, icon, false, false, null);
    };
    return LacaMenuItem;
}());
exports.LacaMenuItem = LacaMenuItem;
//# sourceMappingURL=laca-menuitem.js.map