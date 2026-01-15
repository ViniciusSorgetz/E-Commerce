import { Email } from '../shared/email';
import { Phone } from '../shared/phone';
import { ManufacturerName } from './manufacturer-name';

interface ManufacturerProps {
  name: ManufacturerName;
  email: Email;
  phone: Phone;
}

export class Manufacturer {
  constructor(private props: ManufacturerProps) {
    this.props = props;
  }
}
