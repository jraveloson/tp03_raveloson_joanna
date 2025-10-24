import { Routes } from '@angular/router';
import { ListePollutionsComponent } from './liste-pollutions/liste-pollutions.component';
import { DetailsPollutionComponent } from './details-pollution/details-pollution.component';
import { AddPollutionComponent } from './add-pollution/add-pollution.component';
import { EditPollutionComponent } from './edit-pollution/edit-pollution.component';

export const routes: Routes = [
    { path: '', redirectTo: 'pollutions', pathMatch: 'full' },
    { path: 'pollutions', component: ListePollutionsComponent },
    { path: 'pollutions/add', component: AddPollutionComponent },
    { path: 'pollutions/:id', component: DetailsPollutionComponent },
    { path: 'pollutions/edit/:id', component: EditPollutionComponent }

];
