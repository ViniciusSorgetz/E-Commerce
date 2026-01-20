import { Replace } from '@src/shared/utils/replace';
import { DateProp } from '../shared/date-prop';
import { Email } from '../shared/email';
import { Phone } from '../shared/phone';
import { ManufacturerName } from './manufacturer-name';

interface ManufacturerProps {
  name: ManufacturerName;
  email: Email;
  phone: Phone;
  updatedAt: DateProp;
  createdAt: DateProp;
}

export class Manufacturer {
  private constructor(private props: ManufacturerProps) {
    this.props = props;
  }

  public static create(
    props: Replace<
      ManufacturerProps,
      { createdAt?: undefined; updatedAt?: undefined }
    >,
  ) {
    return new Manufacturer({
      ...props,
      createdAt: new DateProp(),
      updatedAt: new DateProp(),
    });
  }
}
