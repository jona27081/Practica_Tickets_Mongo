import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TicketProductsDto } from "../dto/get-ticket.dto";

@Schema()
export class Ticket{
    @Prop()
    id: string;
    @Prop()
    fecha: string;
    @Prop()
    productos: TicketProductsDto[];
    @Prop()
    total: number;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);