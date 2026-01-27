import { Replace } from '@src/shared/utils/replace';
import { DateProp } from '../shared/date-prop';
import { Email } from '../shared/email';
import { Phone } from '../shared/phone';
import { ManufacturerName } from './manufacturer-name';
import { Uuid } from '../shared/uuid';
import { randomUUID } from 'node:crypto';

interface ManufacturerProps {
  id: Uuid;
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
      { createdAt?: undefined; updatedAt?: undefined; id?: undefined }
    >,
  ) {
    return new Manufacturer({
      ...props,
      id: new Uuid(randomUUID()),
      createdAt: new DateProp(),
      updatedAt: new DateProp(),
    });
  }

  public static with(props: ManufacturerProps) {
    return new Manufacturer(props);
  }

  public get id(): string {
    return this.props.id.value;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt.value;
  }

  public get createdAt(): Date {
    return this.props.createdAt.value;
  }

  public get name(): string {
    return this.props.name.value;
  }

  public get phone(): string {
    return this.props.phone.value;
  }

  public get email(): string {
    return this.props.email.value;
  }
}
