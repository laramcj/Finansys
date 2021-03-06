import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {
  constructor(
    protected categoryService: CategoryService,
    protected override injector: Injector
  ) {
    super(injector, new Category(), categoryService, Category.fromJson);
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuider.group({
      user_id: 'lara_correa',
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
    });
  }

  protected override creationPageTitle(): string {
    return 'Cadastro de Nova Categoria';
  }

  protected override editionPageTitle(): string {
    const resourceName = this.resource.name || '';
    return 'Editando Categoria: ' + resourceName;
  }
}
