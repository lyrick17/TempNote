import { Component } from '@angular/core';
import { Header } from "./header/header";
import { Sidebar } from "./sidebar/sidebar";
import { MainContent } from "./main-content/main-content";
import { Footer } from "./footer/footer";
import { Divider } from "../lib/divider/divider";

@Component({
  selector: 'app-home',
  imports: [Header, Sidebar, MainContent, Footer, Divider],
  templateUrl: './home.html',
  styleUrls: ['./home.css', '../lib/shared/styles.css']
})
export class Home {

}
