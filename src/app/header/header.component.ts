import { Component, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})



export class HeaderComponent {
  constructor(private _snackBar: MatSnackBar) { }

  // constructor(private _snackBar: MatSnackBar) { }

  openSnackBar() {
    this._snackBar.open("hell0");
  }

}

