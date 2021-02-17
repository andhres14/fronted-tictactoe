import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styles: [
  ]
})
export class NotFoundComponent {

  constructor(private router: Router) { }

  goToMainPage(): void {
    this.router.navigateByUrl('/game');
  }

}
