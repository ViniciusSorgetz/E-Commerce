import { ValidationError } from 'src/shared/errors/validation-error';

export class ProductImageUrl {
  constructor(private url: string) {
    this.validate(url);
    this.url = url;
  }

  private validate(url: string) {
    const re = new RegExp(
      'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
    );
    if (!url.match(re)) {
      throw new ValidationError('Product Image must be a url.');
    }
  }

  public get value(): string {
    return this.url;
  }
}
