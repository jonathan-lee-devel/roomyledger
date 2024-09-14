import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'manage-properties',
    loadChildren: () => import('./manage-properties/manage-properties.module').then(m => m.ManagePropertiesModule),
  },
  {
    path: 'property-dashboard',
    loadChildren: () => import('./property-dashboard/property-dashboard.module').then(m => m.PropertyDashboardModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
