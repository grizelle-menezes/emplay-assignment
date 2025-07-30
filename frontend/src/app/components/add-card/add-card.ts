import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardService } from '../../services/card.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-card',
  standalone: false,
  templateUrl: './add-card.html',
  styleUrls: ['./add-card.scss']
})
export class AddCard {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCard>,
    private cardService: CardService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required]], 
      description: ['', [Validators.required]]
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    if (this.form.valid) {
      const newCard = {
        title: this.form.value.title,
        description: this.form.value.description
      };

      this.cardService.addCard(newCard).subscribe(
        (response) => {
          this.dialogRef.close(response);
          this.showToast('Card added successfully!', 'success');
        },
        (error) => {
          console.error('Error adding card:', error);
          this.showToast('Failed to add new card. Please try again.', 'error');
        }
      );
    }
  }

  private showToast(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: [action === 'success' ? 'snackbar-success' : 'snackbar-error']
    });
  }
}