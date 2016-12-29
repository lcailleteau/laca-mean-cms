/**
 * Bean to store menu config elements.
 */
export class ConfigMenuItem {
  label: String;
  header: boolean;
  anchor: String;
  published: boolean;
  type: String;
  icon: String;
  collapsed: boolean;
  items: ConfigMenuItem[];
}
