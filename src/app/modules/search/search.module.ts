import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesComponent } from './components/categories/categories.component';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    SharedModule,
    SearchRoutingModule
  ],
  exports: []
})
export class SearchModule { }
