import { Injectable, Injector } from '@angular/core';

import { Category } from './category.model';
import { environment } from 'src/environments/environment';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseResourceService<Category> {
  constructor(injector: Injector) {
    super(environment.baseUrl + '/categorias', injector);
  }
}
