import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, UsersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [],
})

export class AppComponent {}
