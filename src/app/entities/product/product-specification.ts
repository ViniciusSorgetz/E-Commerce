import { Replace } from '@src/shared/utils/replace';
import { DateProp } from '../shared/date-prop';
import { NumericId } from '../shared/numeric-id';
import { ProductSpecificationInformation } from './product-specification-information';
import { ProductSpecificationLabel } from './product-specification-label';

interface ProductSpecificationProps {
  id?: NumericId;
  label: ProductSpecificationLabel;
  information: ProductSpecificationInformation;
  createdAt: DateProp;
  updatedAt: DateProp;
}

export class ProductSpecification {
  private props: ProductSpecificationProps;

  private constructor(props: ProductSpecificationProps) {
    this.props = props;
  }

  public static create(
    props: Replace<
      ProductSpecificationProps,
      { createdAt?: undefined; updatedAt?: undefined }
    >,
  ) {
    return new ProductSpecification({
      ...props,
      createdAt: new DateProp(),
      updatedAt: new DateProp(),
    });
  }

  public static with(props: ProductSpecificationProps) {
    return new ProductSpecification(props);
  }

  public get id(): number | undefined {
    return this.props.id?.value;
  }

  public set id(id: NumericId) {
    this.props.id = id;
  }

  public get label(): string {
    return this.props.label.value;
  }

  public get information(): string {
    return this.props.information.value;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt.value;
  }

  public get createdAt(): Date {
    return this.props.createdAt.value;
  }
}
