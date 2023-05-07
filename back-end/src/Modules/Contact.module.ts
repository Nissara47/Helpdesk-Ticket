import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactController } from "src/Controller/Contact.Controller";
import { contacts } from "src/Model/Contact.entity";
import { ContactService } from "src/Service/Contact.service";

@Module({
    imports: [TypeOrmModule.forFeature([contacts])],
    providers: [ContactService],
    controllers: [ContactController]
})
export class ContactModule {}