import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-edit-card',
  standalone: false,
  templateUrl: './edit-card.html',
  styleUrl: './edit-card.scss'
})
export class EditCard {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCard>,
    @Inject(MAT_DIALOG_DATA) public data: Card
  ) {
    this.form = this.fb.group({
      description: [data.description, Validators.required]
    });
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close({ description: this.form.value.description });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
