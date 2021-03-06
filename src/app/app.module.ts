import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { ThumbLoaderComponent } from "./pages/movies/thumb-loader/thumb-loader.component";
import { BulletComponent } from "./pages/movies/bullet/bullet.component";
import { MovieComponent } from "./pages/movies/movie/movie.component";
import { LoginComponent } from "./pages/login/login.component";
import { MoviesCanActivate } from "./gaurds/movies-can-activate";
import { SettingsComponent } from "./pages/settings/settings.component";
import { DurationPipe } from "./pipes/duration.pipe";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MoviesComponent,
    ThumbLoaderComponent,
    SettingsComponent,
    BulletComponent,
    MovieComponent,
    DurationPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    RadioButtonModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    MenuModule,
    ToastModule,
    TableModule,
    CheckboxModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule
  ],
  providers: [MoviesCanActivate],
  bootstrap: [AppComponent]
})
export class AppModule { }
