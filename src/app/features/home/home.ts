import { Component } from '@angular/core';
import { Scratchpad } from './sections/scratchpad/scratchpad';

@Component({
  selector: 'app-home',
  imports: [Scratchpad],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {}
