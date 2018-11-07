import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatListModule,
        MatTableModule,
        MatSnackBarModule,
        MatDialogModule,
        MatFormFieldModule],

    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatListModule,
        MatTableModule,
        MatSnackBarModule,
        MatDialogModule,
        MatFormFieldModule],
})

export class MaterialModule { }