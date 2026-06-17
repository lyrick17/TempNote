// icons/search-icon.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plus-icon',
  standalone: true,
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      [attr.style]="style"
      [attr.class]="class"
      [attr.fill]="fill"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path
        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
        [attr.fill]="fill"
      ></path>
    </svg>
  `,
})
export class PlusIcon {
  @Input() size = '16';
  @Input() style = '';
  @Input() class = '';
  @Input() fill = '';
}
