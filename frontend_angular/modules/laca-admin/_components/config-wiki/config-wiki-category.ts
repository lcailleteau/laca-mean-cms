/**
 * Bean to store Wiki category config elements.
 */
export class ConfigWikiCategory {
  _id: String;
  name: String;
  slug: String;
  siteSlug: String;
  description: String;
  parentCategory: String;
  childrenCategories: String[];
  articlesIds: String[];

  // Attributes not present in data model (not stored in database).
  display_nameWithTabs: String;
  display_parentCategory: String;
}
