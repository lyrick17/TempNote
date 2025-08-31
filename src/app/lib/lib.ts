import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThemeToggle } from './theme-toggle/theme-toggle';

@NgModule({
  declarations: [],
  imports: [CommonModule, ThemeToggle],
  exports: [ThemeToggle],
})
export class Lib {

}
