import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterModule, RouterOutlet],
})
export class AppComponent {
  title = 'NexFront';
  footer: any;
}
