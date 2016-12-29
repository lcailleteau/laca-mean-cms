import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { LacaAdminModule } from './laca-admin/laca-admin.module';
//import { UtilsModule } from './utils/utils.module';

//platformBrowserDynamic().bootstrapModule(LacaAdminModule, UtilsModule);
platformBrowserDynamic().bootstrapModule(LacaAdminModule);
