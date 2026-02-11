import {
  Email,
  Manufacturer,
  ManufacturerName,
  Phone,
} from '@src/app/entities';
import { ManufacturerRepository } from '@src/app/repositories/manufacturer.repository';
import { RegisterManufacturerValidator } from './register-manufacturer.validator';
import { Injectable } from '@nestjs/common';

interface registerManufacturerBody {
  name: string;
  email: string;
  phone: string;
}

type registerManufacturerResponse = Promise<Manufacturer>;

@Injectable()
export class RegisterManufacturerUseCase {
  private registerManufacturerValidator: RegisterManufacturerValidator;

  constructor(private readonly manufacturerRepository: ManufacturerRepository) {
    this.registerManufacturerValidator = new RegisterManufacturerValidator(
      this.manufacturerRepository,
    );
  }

  public async execute(
    body: registerManufacturerBody,
  ): registerManufacturerResponse {
    const { name, email, phone } = body;

    await this.registerManufacturerValidator.validateEmail(email);
    await this.registerManufacturerValidator.validateEmail(phone);

    const registeredManufacturer = Manufacturer.create({
      name: new ManufacturerName(name),
      email: new Email(email),
      phone: new Phone(phone),
    });

    await this.manufacturerRepository.saveOne(registeredManufacturer);

    return registeredManufacturer;
  }
}
