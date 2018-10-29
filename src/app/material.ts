import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatListModule,
        MatTableModule,
        MatSnackBarModule],
        
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatListModule,
        MatTableModule,
        MatSnackBarModule],
})

export class MaterialModule { }