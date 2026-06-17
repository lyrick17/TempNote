import { Component } from '@angular/core';
import { Header } from '../../core/shell/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import { MainContent } from './components/main-content/main-content';
import { Footer } from '../../core/shell/footer/footer';
import { Divider } from '../../core/shell/divider/divider';

@Component({
  selector: 'app-home',
  imports: [Header, Sidebar, MainContent, Footer, Divider],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {}
