import { Routes } from '@angular/router';

import { GeneratorPageComponent } from './pages/generator-page/generator-page.component';
import { PaymentsPageComponent } from './pages/payments-page/payments-page.component';

export const routes: Routes = [
    { path: '',   redirectTo: '/generator-page', pathMatch: 'full' },
    { path: 'generator-page', component: GeneratorPageComponent },
    { path: 'payments-page', component: PaymentsPageComponent },    
];
