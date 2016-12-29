/**
 * Bean to store menu item elements.
 */
export class LacaMenuItem {
  label: String;
  header: boolean;
  anchor: String;
  anchorWithSitePrefix: boolean;
  icon: String;
  expandable: boolean;
  expanded: boolean;
  items: LacaMenuItem[];

  /**
   * Constructor.
   */
  constructor(
      label: string,
      header: boolean,
      anchor: String,
      anchorWithSitePrefix: boolean,
      icon: String,
      expandable: boolean,
      expanded: boolean,
      items: LacaMenuItem[]) {
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
  public static headerItem(label: string) {
    return new LacaMenuItem(label, true, null, false, null, true, true, null);
  }
  public static accordionItem(
      label: string,
      icon: String,
      expandable: boolean,
      expanded: boolean,
      items: LacaMenuItem[]) {
    return new LacaMenuItem(label, false, null, false, icon, expandable, expanded, items);
  }
  public static leafItem(
      label: string,
      anchor: String,
      anchorWithSitePrefix: boolean,
      icon: String) {
    return new LacaMenuItem(label, false, anchor, anchorWithSitePrefix, icon, false, false, null);
  }
}
