import { Component } from '@angular/core';
import { MainContent } from '../../components/main-content/main-content';
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-stash',
  imports: [MainContent, Sidebar],
  templateUrl: './stash.html',
  styleUrl: './stash.css',
})
export class Stash {}
