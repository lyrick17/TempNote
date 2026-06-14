// icons/search-icon.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-file-image-icon',
  standalone: true,
  template: `
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="size"
      [attr.height]="size"
      [attr.style]="style"
      [attr.class]="class"
      [attr.fill]="fill"
      viewBox="0 0 24 24"
    >
      <path
        [attr.fill]="fill"
        d="M16 18H8l2.5-6 2 4 1.5-2 2 4Zm-1-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
      />
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1ZM8 18h8l-2-4-1.5 2-2-4L8 18Zm7-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
      />
    </svg>
  `,
})
export class FileImageIcon {
  @Input() size = '16';
  @Input() style = '';
  @Input() class = '';
  @Input() fill = 'var(--tertiaryColor)';
}
