import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
  ContentChild,
  ElementRef,
  AfterViewInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'dialog-cmp',
  standalone: true,
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  imports: [MatDialogModule, CommonModule],
})
export class DialogComponent {
  @ViewChild('templateRef') templateRef: TemplateRef<any>;
  @Output() onClose: EventEmitter<{ data: boolean }> = new EventEmitter();

  @Input() open: boolean;
  @Input() wrap: boolean = true;
  dialogRef: MatDialogRef<DialogComponent>;
  constructor(public dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (this.open && !changes['open']?.previousValue && !this.dialogRef) {
      this.dialogRef = this.dialog.open(this.templateRef);
      this.dialogRef
        .afterClosed()
        .subscribe(() => this.onClose && this.onClose.emit({ data: false }));
    } else if (
      this.dialogRef &&
      !this.open &&
      changes['open']?.previousValue === true
    ) {
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }
}
