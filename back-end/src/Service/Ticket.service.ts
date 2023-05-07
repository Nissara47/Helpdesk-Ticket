import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketDto } from 'src/Dtos/Ticket.dto';
import { tickets } from 'src/Model/Ticket.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(tickets)
    private ticketRepository: Repository<tickets>,
  ) {}

  //get all ticket
  getAllTicket() {
    const ticket = this.ticketRepository.find();
    return ticket;
  }

  //create ticket
  createTicket(ticketDto: TicketDto) {
    const ticket = this.ticketRepository.create({
      ticket_id: uuidv4().toString(),
      title: ticketDto.title,
      description: ticketDto.description,
      status: ticketDto.status,
      timestamp_created: new Date(),
      contact_id: ticketDto.contact_id,
    });
    return this.ticketRepository.save(ticket);
  }

  //update ticket
  updateTicket(ticketDto: TicketDto) {
    const ticket = this.ticketRepository.create({
      ticket_id: ticketDto.ticket_id,
      timestamp_modified: new Date(),
    });
    this.ticketRepository.save(ticket);
    return this.ticketRepository.update(ticketDto.ticket_id, ticketDto);
  }

  //sort ticket by status
  async sortByStatus() {

    const pending = await this.ticketRepository.find({
      where: { status: 'Pending' },
    });
    const accepted = await this.ticketRepository.find({
      where: { status: 'Accepted' },
    });
    const resolved = await this.ticketRepository.find({
      where: { status: 'Resolved' },
    });
    const rejected = await this.ticketRepository.find({
      where: { status: 'Rejected' },
    });
    const ticket = pending.concat(accepted, resolved, rejected);
    return ticket;
  }

  //sort ticket by last time update
  sortByLastUpdate() {
    const ticket = this.ticketRepository
      .createQueryBuilder('t')
      .orderBy('t.timestamp_modified', 'DESC', 'NULLS LAST')
      .getMany();
    return ticket;
  }

  //filter ticket by status
  filterByStatus(status: string) {
    const ticket = this.ticketRepository
      .createQueryBuilder('t')
      .where('t.status = :status', { status: status })
      .getMany();
    return ticket;
  }
}
