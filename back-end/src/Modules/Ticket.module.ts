import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketController } from "src/Controller/Ticket.Controller";
import { tickets } from "src/Model/Ticket.entity";
import { TicketService } from "src/Service/Ticket.service";

@Module({
    imports: [TypeOrmModule.forFeature([tickets])],
    providers: [TicketService],
    controllers: [TicketController]
})
export class TicketModule {}