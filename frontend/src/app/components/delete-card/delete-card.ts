import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardService } from '../../services/card.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-card',
  standalone: false,
  templateUrl: './delete-card.html',
  styleUrls: ['./delete-card.scss']
})
export class DeleteCard {
  cardId: number;
  cardTitle: string;
  isDeleting = false;

  constructor(
    private dialogRef: MatDialogRef<DeleteCard>,
    private cardService: CardService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, title: string } 
  ) {
    this.cardId = data.id;
    this.cardTitle = data.title;
  }

  cancel() {
    this.dialogRef.close();
  }

  deleteCard() {
    this.isDeleting = true;
    this.cardService.deleteCard(this.cardId).subscribe(
      (response) => {
        this.dialogRef.close({ success: true, cardId: this.cardId });
        this.showToast('Card deleted successfully!', 'success');
      },
      (error) => {
        console.error('Error deleting card:', error);
        this.isDeleting = false;
        this.showToast('Failed to delete card. Please try again.', 'error');
      }
    );
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