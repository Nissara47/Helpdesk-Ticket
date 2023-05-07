import { Controller, Get, Post, Body, Put, Query } from '@nestjs/common';
import { ContactDto } from 'src/Dtos/Contact.dto';
import { ContactService } from 'src/Service/Contact.service';

@Controller()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get('/api/getContact')
  getContact() {
    return this.contactService.getAllcontact();
  }

  @Get('/api/getContactDetail')
  getContactDetail(@Query('contact_id') contact_id: string) {
    return this.contactService.getContactDetail(contact_id);
  }

  @Post('/api/createContact')
  createContact(@Body() contactDto: ContactDto) {
    return this.contactService.createContact(contactDto);
  }
}
