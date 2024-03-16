import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from "@angular/material/input"
import { MatCardModule } from "@angular/material/card";

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PostListComponent } from './posts/post-list/post-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    // header component
    HeaderComponent,
    // post list component 
    PostListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    //module to add api integrations
    HttpClientModule,
    // for snackbar module need to be imported
    MatSnackBarModule,



  ],
  providers: [
    // snackbar time duration
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
