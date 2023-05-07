import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { tickets } from './Model/Ticket.entity';
import { TicketModule } from './Modules/Ticket.module';
import { contacts } from './Model/Contact.entity';
import { ContactModule } from './Modules/Contact.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mainameme-2544',
      database: 'helpdesk-ticket',
      entities: [tickets, contacts],
      synchronize: false,
    }),
    TicketModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
