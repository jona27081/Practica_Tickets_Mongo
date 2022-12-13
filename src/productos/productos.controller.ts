import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  async create(@Body() createProductoDto: CreateProductoDto) {
    const producto = await this.productosService.create(createProductoDto);
    return producto;
  }

  @Get()
  async findAll() {
    const producto = await this.productosService.findAll();
    return producto

  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const producto = this.productosService.findOne(id);
    return producto
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    const producto = this.productosService.update(id, updateProductoDto);
    return producto
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const producto = this.productosService.remove(id);
    return producto
  }
}
