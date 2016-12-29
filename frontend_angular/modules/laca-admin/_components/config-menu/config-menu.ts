import { ConfigMenuItem }       from './config-menuitem';

/**
 * Bean to store menu config elements.
 */
export class ConfigMenu {
  _id: String;
  siteSlug: String;
  title: String;
  name: String;
  description: String;
  published: boolean;
  items: ConfigMenuItem[];
}
