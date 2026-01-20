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

  public get label(): ProductSpecificationLabel {
    return this.props.label;
  }

  public get information(): ProductSpecificationInformation {
    return this.props.information;
  }
}
