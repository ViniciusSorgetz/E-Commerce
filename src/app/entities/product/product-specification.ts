import { DateProp } from '../shared/date-prop';
import { NumericId } from '../shared/numeric-id';
import { ProductSpecificationInformation } from './product-specification-information';
import { ProductSpecificationLabel } from './product-specification-label';

interface ProductSpecificationProps {
  id?: NumericId;
  label: ProductSpecificationLabel;
  information: ProductSpecificationInformation;
  created_at: DateProp;
  updated_at: DateProp;
}

export class ProductSpecification {
  private props: ProductSpecificationProps;

  constructor(props: ProductSpecificationProps) {
    this.props = props;
  }

  public get label(): ProductSpecificationLabel {
    return this.props.label;
  }

  public get information(): ProductSpecificationInformation {
    return this.props.information;
  }
}
