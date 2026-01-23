import { ProductPrice } from './product-price';
import { ProductReview } from './product-review';
import { DateProp } from '../shared/date-prop';
import { NumericId } from '../shared/numeric-id';
import { ProductSpecification } from './product-specification';
import { ProductDescription } from './product-description';
import { ProductName } from './product-name';
import { ProductCategory } from './product-category';
import { ProductImage } from './product-image';
import { ValidationError } from 'src/shared/errors/validation.error';
import { Uuid } from '../shared/uuid';
import { Replace } from '@src/shared/utils/replace';

interface ProductProps {
  id?: NumericId;
  name: ProductName;
  price: ProductPrice;
  description: ProductDescription;
  manufacturerId: Uuid;
  specifications: ProductSpecification[];
  categories: ProductCategory[];
  reviews: ProductReview[];
  images: ProductImage[];
  createdAt: DateProp;
  updatedAt: DateProp;
}

export class Product {
  private props: ProductProps;

  private constructor(props: ProductProps) {
    this.validateSpecifications(props.specifications);
    props.images = this.getValidatedImages(props.images);
    this.props = props;
  }

  public static create(
    props: Replace<
      ProductProps,
      { createdAt?: undefined; updatedAt?: undefined }
    >,
  ) {
    return new Product({
      ...props,
      createdAt: new DateProp(),
      updatedAt: new DateProp(),
    });
  }

  public static with(props: ProductProps) {
    return new Product(props);
  }

  private getValidatedImages(images: ProductImage[]) {
    if (images.length == 0) {
      return images;
    }

    images.sort((a, b) => a.position - b.position);

    if (images[0].position !== 1) {
      throw new ValidationError(
        'The first image position of the product images array must be 1',
      );
    }

    if (images[0] && images[0].position)
      for (let i = 0; i < images.length; i++) {
        if (images[i + 1]) {
          if (images[i + 1].position !== images[i].position + 1) {
            throw new ValidationError("Product images positions aren't valid.");
          }
        }
      }

    return images;
  }

  private validateSpecifications(specifications: ProductSpecification[]) {
    specifications.forEach((specification) => {
      const duplicatedLabel = specifications.find(
        (s) =>
          s.label == specification.label &&
          JSON.stringify(s) !== JSON.stringify(specification),
      );

      if (duplicatedLabel) {
        throw new ValidationError(
          'Product specifications label must be unique inside the product.',
        );
      }
    });
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

  public get updatedAt(): Date {
    return this.props.updatedAt.value;
  }

  public get createdAt(): Date {
    return this.props.createdAt.value;
  }

  public get manufacturerId(): string {
    return this.props.manufacturerId.value;
  }

  public get images(): ProductImage[] {
    return this.props.images;
  }

  public get reviews(): ProductReview[] {
    return this.props.reviews;
  }
}
