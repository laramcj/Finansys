import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { CategoryService } from '../../categories/shared/category.service';
import { Entry } from './entry.model';

import { environment } from '../../../../environments/environment';
import { flatMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntryService extends BaseResourceService<Entry> {
  constructor(
    protected override injector: Injector,
    private categoryService: CategoryService
  ) {
    super(environment.baseUrl + '/lancamentos', injector, Entry.fromJson);
  }

  override create(entry: Entry): Observable<Entry> {
    entry.user_id = 'lara_correa';
    entry.id = Math.ceil(Math.random() * 100).toString();

    return this.categoryService.getById(Number(entry.categoryId)).pipe(
      flatMap((category) => {
        entry.category = category;

        return super.create(entry);
      })
    );
  }
}
