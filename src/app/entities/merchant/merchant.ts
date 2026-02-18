import { Replace } from '@src/shared/utils/replace';
import { DateProp } from '../shared/date-prop';
import { Email } from '../shared/email';
import { Phone } from '../shared/phone';
import { MerchantName } from './merchant-name';
import { Uuid } from '../shared/uuid';
import { randomUUID } from 'node:crypto';

interface MerchantProps {
  id: Uuid;
  name: MerchantName;
  email: Email;
  phone: Phone;
  updatedAt: DateProp;
  createdAt: DateProp;
}

export class Merchant {
  private constructor(private props: MerchantProps) {
    this.props = props;
  }

  public static create(
    props: Replace<
      MerchantProps,
      { createdAt?: undefined; updatedAt?: undefined; id?: undefined }
    >,
  ) {
    return new Merchant({
      ...props,
      id: new Uuid(randomUUID()),
      createdAt: new DateProp(),
      updatedAt: new DateProp(),
    });
  }

  public static with(props: MerchantProps) {
    return new Merchant(props);
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
