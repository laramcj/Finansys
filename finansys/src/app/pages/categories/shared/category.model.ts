import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Category extends BaseResourceModel {
  constructor(
    public override user_id?: string,
    public override id?: string,
    public name?: string,
    public description?: string
  ) {
    super();
  }

  static fromJson(jsonData: any): Category {
    return Object.assign(new Category(), jsonData);
  }
}
