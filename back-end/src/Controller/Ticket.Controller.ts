import { Controller, Get, Post, Body, Put, Query } from '@nestjs/common';
import { TicketDto } from 'src/Dtos/Ticket.dto';
import { TicketService } from 'src/Service/Ticket.service';

@Controller()
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get('/api/getTicket')
  getTicket() {
    return this.ticketService.getAllTicket();
  }

  @Get('/api/ticketLastUpdate')
  ticketLastUpdate() {
    return this.ticketService.sortByLastUpdate();
  }

  @Get('/api/ticketSortByStatus')
  ticketSortByStatus() {
    return this.ticketService.sortByStatus();
  }

  @Get('/api/filterTicketByStatus')
  filterTtByStatus(@Query('status') status: string) {
    return this.ticketService.filterByStatus(status);
  }

  @Post('/api/createTicket')
  createTicket(@Body() ticketDto: TicketDto) {
    return this.ticketService.createTicket(ticketDto);
  }

  @Put('/api/updateTicket')
  updateTicket(@Body() ticketDto: TicketDto) {
    return this.ticketService.updateTicket(ticketDto);
  }
}
