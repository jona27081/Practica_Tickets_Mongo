import { Injectable, NotFoundException} from '@nestjs/common';
import { ValidationMessages } from 'src/Helpers/validation.messages.helper';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { IProducto} from './entities/producto.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductosService {

  constructor(@InjectModel('Productos') private productoModel: Model<IProducto>) { }

  async create(createProductoDto: CreateProductoDto):
    Promise<IProducto> {
    const newProducto = await new this.productoModel(createProductoDto);
    return newProducto.save();
  }

  async findAll():
    Promise<IProducto[]> {
    const Data = await this.productoModel.find();
    if (!Data || Data.length == 0) {
      throw new NotFoundException(ValidationMessages.ElEMENTO_NO_ENCONTRADO);
    }
    return Data;
  }

  async findOne(productoId: string):
    Promise<IProducto> {
    const producto = await this.productoModel.findById(productoId).exec();
    if (!producto) {
      throw new NotFoundException(ValidationMessages.ElEMENTO_NO_ENCONTRADO);
    }
    return producto;
  }

  async update(productoId: string, updateProductoDto: UpdateProductoDto):
    Promise<IProducto> {
    const producto = await this.productoModel.findByIdAndUpdate(productoId, updateProductoDto, { new: true });
    if (!producto) {
      throw new NotFoundException(ValidationMessages.ElEMENTO_NO_ENCONTRADO);
    }
    return producto;
  }


  async remove(productoId: string):
    Promise<IProducto> {
    const producto = await this.productoModel.findByIdAndRemove(productoId);
    if (!producto) {
      throw new NotFoundException(ValidationMessages.ElEMENTO_NO_ENCONTRADO);
    }
    return producto;
  }
}


