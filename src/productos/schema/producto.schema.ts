import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Producto {
    @Prop()
    nombre: string;
    @Prop()
    precio: number;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);