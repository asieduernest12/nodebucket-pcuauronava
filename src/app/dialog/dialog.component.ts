import {
  Component,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
  ContentChild,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'dialog-cmp',
  standalone: true,
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  imports: [MatDialogModule],
})
export class DialogComponent {
  // @Input() childTemplateRef: TemplateRef<Component>;
  contentRef: TemplateRef<HTMLTemplateElement>;
  // @ContentChild('.contentRef') contentRef: TemplateRef<HTMLElement>;
  @Output() onClose: EventEmitter<{ data: boolean }>;
  constructor(public dialog: MatDialog) {}

  
}
