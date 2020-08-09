export class BaseDTO {
  private _id: string;

  private _isActive: boolean;

  private _createdAt: Date;

  private _updatedAt: Date;

  get id(): string {
    return this._id;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
