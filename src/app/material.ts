import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatListModule,
        MatTableModule,
        MatSnackBarModule,
        MatDialogModule],

    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatListModule,
        MatTableModule,
        MatSnackBarModule,
        MatDialogModule],
})

export class MaterialModule { }