import { Injectable, NotFoundException } from '@nestjs/common';
import { ValidationMessages } from 'src/Helpers/validation.messages.helper';;
import { CreateTicketDto } from './dto/create-ticket.dto';
import { GetTicketDto, TicketProductsDto } from './dto/get-ticket.dto';
import { v4 as uuidv4 } from 'uuid';
import { ITicket } from './entities/ticket.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProducto } from 'src/productos/entities/producto.entity';


@Injectable()
export class TicketsService {
  productsService: any;
  arrTicket: any;

  constructor(
    @InjectModel('Tickets') private ticketModel: Model<ITicket>,
    @InjectModel('Productos') private productoModel: Model<IProducto>,
    ) { }

  async findProducto(productoId: string):
    Promise<IProducto> {
    const producto = await this.productoModel.findById(productoId).exec();
    if (!producto) {
      throw new NotFoundException(ValidationMessages.ElEMENTO_NO_ENCONTRADO);
    }
    return producto;
  }

  async create(creatTicketDto: CreateTicketDto):
    Promise<ITicket> {
      let createTicket: GetTicketDto = new GetTicketDto();

      createTicket.productos = [];

      let totalTicket = 0;

      creatTicketDto.productos.forEach(async element =>{

        let productItem = this.findProducto(element.id);

        createTicket.productos.push({
          cantidad: element.cantidad,
          subtotal: ((await productItem).precio * element.cantidad),
          nombre: (await productItem).nombre,
          precio: (await productItem).precio,
        });
        totalTicket += (await productItem).precio * element.cantidad
      })

      createTicket.folio = uuidv4();
      createTicket.fecha = new Date().toLocaleDateString(),
      createTicket.total = totalTicket

    const newTicket = await new this.ticketModel(createTicket);
    return newTicket.save();
  }

  async findAll():
    Promise<ITicket[]> {
    const Data = await this.ticketModel.find();
    if (!Data || Data.length == 0) {
      throw new NotFoundException(ValidationMessages.ElEMENTO_NO_ENCONTRADO);
    }
    return Data;
  }

  async findOne(ticketId: string):
    Promise<ITicket> {
    const ticket = await this.ticketModel.findById(ticketId).exec();
    if (!ticket) {
      throw new NotFoundException(ValidationMessages.ElEMENTO_NO_ENCONTRADO);
    }
    return ticket;
  }
}
