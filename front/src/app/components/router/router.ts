import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-router',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './router.html',
  styleUrl: './router.css'
})
export class Router {

}
