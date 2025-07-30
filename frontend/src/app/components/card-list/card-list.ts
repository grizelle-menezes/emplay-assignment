import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from '../../models/card.model';
import { CardService } from '../../services/card.service';
import { EditCard } from '../edit-card/edit-card';
import { AddCard } from '../add-card/add-card';
import { DeleteCard } from '../delete-card/delete-card';

@Component({
  selector: 'app-card-list',
  standalone: false,
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList implements OnInit {
  cards: Card[] = [];

  constructor(
    private cardService: CardService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchCards();
  }

  fetchCards(): void {
    this.cardService.getCards().subscribe(
      (cards) => {
        this.cards = cards;
        this.cdr.detectChanges();
      },
      (error) => {
        this.showToast('Failed to load cards. Please try again.', 'error');
      }
    );
  }

  updateCard(card: Card): void {
    const dialogRef = this.dialog.open(EditCard, {
      width: '400px',
      data: { ...card },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cardService.updateCard({ ...card, description: result.description }).subscribe(
          () => {
            this.fetchCards();
            this.showToast('Card updated successfully!', 'success');
          },
          (error) => {
            this.showToast('Failed to update card. Please try again.', 'error');
          }
        );
      }
    });
  }

  addNewCard(): void {
    const dialogRef = this.dialog.open(AddCard, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.fetchCards();
        }
      }
    );
  }

  deleteCard(card: Card): void {
    const dialogRef = this.dialog.open(DeleteCard, {
      width: '400px',
      data: { ...card },
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.fetchCards();
        }
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