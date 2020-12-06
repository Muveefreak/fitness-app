import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AngularFireModule } from 'angularfire2';

// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { SignupComponent } from './views/pages/auth/signup/signup.component';
import { LoginComponent } from './views/pages/auth/login/login.component';
import { TrainingComponent } from './views/pages/training/training.component';
import { CurrentTrainingComponent } from './views/pages/training/current-training/current-training.component';
import { NewTrainingComponent } from './views/pages/training/new-training/new-training.component';
import { PastTrainingComponent } from './views/pages/training/past-training/past-training.component';
import { SidenavListComponent } from './views/theme/navigation/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './views/theme/navigation/header/header.component';
import { StopTrainingComponent } from './views/pages/training/current-training/stop-training.component';
import { AuthService } from './core/auth/auth.service';
import { TrainingService } from './views/pages/training/training.service';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    SidenavListComponent,
    HeaderComponent,
    StopTrainingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    // AngularFireModule.initializeApp(environment.firebase)
    // 3. Initialize
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [AuthService, TrainingService],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainingComponent]
})
export class AppModule { }
