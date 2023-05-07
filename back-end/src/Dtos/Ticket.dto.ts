import { IsString, IsNotEmpty } from "class-validator";

export class TicketDto {
    ticket_id: string;

    @IsString()
    @IsNotEmpty()

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    status: string;
    timestamp_created: Date;

    @IsString()
    @IsNotEmpty()
    contact_id: string;
}