import { Component } from '@angular/core';
import { Lib } from "../../lib/lib";

@Component({
  selector: 'app-header',
  imports: [Lib],
  templateUrl: './header.html',
  styleUrls: ['./header.css', '../../lib/shared/styles.css']
})
export class Header {

}
