import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductoSchema } from './productos/schema/producto.schema';
import { TicketSchema } from './tickets/schema/ticket.schema';
import { ProductosController } from './productos/productos.controller';
import { ProductosService } from './productos/productos.service';
import { TicketsController } from './tickets/tickets.controller';
import { TicketsService } from './tickets/tickets.service';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Tickets'),
    MongooseModule.forFeature([{ name: 'Productos', schema: ProductoSchema}]),
    MongooseModule.forFeature([{ name: 'Tickets', schema: TicketSchema}]),
  ],
  controllers: [AppController, ProductosController, TicketsController],
  providers: [AppService, ProductosService, TicketsService],
})
export class AppModule {}
