import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/pages/home/home.component';
import { SignupComponent } from './views/pages/auth/signup/signup.component';
import { LoginComponent } from './views/pages/auth/login/login.component';
import { TrainingComponent } from './views/pages/training/training.component';
import { NewTrainingComponent } from './views/pages/training/new-training/new-training.component';
import { CurrentTrainingComponent } from './views/pages/training/current-training/current-training.component';
import { PastTrainingComponent } from './views/pages/training/past-training/past-training.component';

import { AuthGuard } from '../app/core/auth/auth.guard';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'training',
        component: TrainingComponent,
        canActivate: [ AuthGuard ],
        children: [
            {
                path: 'new-training',
                component: NewTrainingComponent
            },
            {
                path: 'current-training',
                component: CurrentTrainingComponent
            },
            {
                path: 'past-training',
                component: PastTrainingComponent
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}