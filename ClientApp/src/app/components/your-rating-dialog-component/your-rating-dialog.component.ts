import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'your-rating-dialog',
  templateUrl: './your-rating-dialog.component.html',
  styleUrls: ['./your-rating-dialog.component.scss']
})
export class YourRatingDialogComponent{
  constructor(
    public dialogRef: MatDialogRef<YourRatingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
