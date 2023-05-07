import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactDto } from 'src/Dtos/Contact.dto';
import { contacts } from 'src/Model/Contact.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(contacts)
    private contactRepository: Repository<contacts>,
  ) {}

  //get all contact
  getAllcontact() {
    const contact = this.contactRepository.find();
    return contact;
  }

  //create contact
  createContact(contactDto: ContactDto) {
    const contact = this.contactRepository.create({
      contact_id: uuidv4().toString(),
      contact_firstname: contactDto.contact_firstname,
      contact_lastname: contactDto.contact_lastname,
      email: contactDto.email,
      tel: contactDto.tel,
    });
    return this.contactRepository.save(contact);
  }

  //get contact detail
  getContactDetail(contact_id: string) {
    const contact = this.contactRepository
      .createQueryBuilder('c')
      .where('c.contact_id = :contact_id', { contact_id: contact_id })
      .getMany();
    return contact;
  }
}
