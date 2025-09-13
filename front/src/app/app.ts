import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjetoCrud } from "./projeto-crud/projeto-crud";

@Component({
  selector: 'app-root',
  imports: [ProjetoCrud],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front');
}
