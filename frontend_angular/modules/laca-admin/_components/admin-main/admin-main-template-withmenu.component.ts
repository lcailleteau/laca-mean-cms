import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { LacaMenuItem } from '../laca-menu/laca-menuitem';

import { AdminMainService } from '../../_services/admin-main.service';

@Component({
    templateUrl: './_components/admin-main/admin-main-template-withmenu.component.template.html'
})
export class AdminMainTemplateWithMenuComponent implements OnInit {
  leftMenuItems: LacaMenuItem[];

  /**
   * Constructor with services injections.
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminMainService: AdminMainService) {
  }

  /**
   * OnInit method.
   */
  ngOnInit() {
    // Fetch the site from the activated route.
    this.route.params.forEach((params: Params) => {
      // Is this an observable technique ?
      this.adminMainService.site = params['site'];
    });

    // Buiild left menu items.
    this.buildLeftMenuItems();
  }

  /**
   * Build left menu items.
   */
  buildLeftMenuItems() {
    this.leftMenuItems = [
      LacaMenuItem.headerItem("Général"),
      LacaMenuItem.leafItem("Accueil", "", true, "info-sign"),
      LacaMenuItem.leafItem("Site", "/crisis-center", false, "info-sign"),
      LacaMenuItem.leafItem("Users", "/home", true, "user"),

      LacaMenuItem.headerItem("Gestion de contenu"),
      LacaMenuItem.leafItem("Homepages", "/homes", true, "home"),
      LacaMenuItem.leafItem("Fragments HTML", "/frag", true, "object-align"),
      LacaMenuItem.accordionItem("Wiki", "duplicate", false, true, [
        LacaMenuItem.leafItem("Catégories", "/config-wiki-category", true, "folder-open"),
        LacaMenuItem.leafItem("Articles", "/frag", true, "pencil")
      ]),
      LacaMenuItem.accordionItem("Exercices", "duplicate", false, true, [
        LacaMenuItem.leafItem("Catégories", "/config-wiki-category", true, "folder-open"),
        LacaMenuItem.leafItem("Exercices", "/frag", true, "pencil")
      ]),
      LacaMenuItem.leafItem("Gestionnaire de médias", "/frag", true, "picture"),

      LacaMenuItem.headerItem("Mise en forme"),
      LacaMenuItem.leafItem("Menus", "/config-menu", true, "picture"),
      LacaMenuItem.leafItem("Modèles de pages", "/frag", true, "picture")
    ];
  }
}
