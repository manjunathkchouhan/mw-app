import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
     private router: Router
  ) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.addListener((mediaQuery) => {
      console.log(mediaQuery);
      this.toggleDarkTheme(mediaQuery.matches);
    });
  }

  ngOnInit() {
  }
  toggleDarkTheme(dark) {
    document.body.classList.toggle('dark', dark);
  }
  toggle(event) {
    const check = event.detail.checked;
    console.log(check);
    this.toggleDarkTheme(check);
  }
}
