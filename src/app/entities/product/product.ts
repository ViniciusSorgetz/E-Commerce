import { ProductPrice } from './product-price';
import { ProductReview } from './product-review';
import { DateProp } from '../shared/date-prop';
import { NumericId } from '../shared/numeric-id';
import { ProductSpecification } from './product-specification';
import { ProductDescription } from './product-description';
import { ProductName } from './product-name';
import { ProductCategory } from './product-category';
import { ProductImage } from './product-image';
import { ValidationError } from 'src/shared/errors/validation-error';

interface ProductProps {
  id?: NumericId;
  name: ProductName;
  price: ProductPrice;
  description: ProductDescription;
  manufacturerId: NumericId;
  specifications: ProductSpecification[];
  categories: ProductCategory[];
  reviews: ProductReview[];
  mainImage: ProductImage;
  images: ProductImage[];
  created_at: DateProp;
  updated_at: DateProp;
}

export class Product {
  private props: ProductProps;

  constructor(props: ProductProps) {
    this.validateImages(props.mainImage, props.images);
    this.props = props;
  }

  private validateImages(mainImage: ProductImage, images: ProductImage[]) {
    if (images.includes(mainImage)) {
      throw new ValidationError(
        'Images property should not include the main product image',
      );
    }
  }

  public get id(): number | undefined {
    return this.props.id?.value;
  }

  public set id(id: NumericId) {
    this.props.id = id;
  }

  public get name(): string {
    return this.props.name.value;
  }

  public get price(): number {
    return this.props.price.value;
  }

  public get description(): string {
    return this.props.description.value;
  }

  public get specifications(): ProductSpecification[] {
    return this.props.specifications;
  }

  public get categories(): ProductCategory[] {
    return this.props.categories;
  }
}
