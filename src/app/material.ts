import { MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import { NgModule } from '@angular/core';


@NgModule({
    imports:[
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatListModule,
        MatTableModule],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatListModule,
        MatTableModule],
})

export class MaterialModule{}