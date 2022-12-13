import { Document } from "mongoose";

export interface IProducto extends Document{
    readonly id: number;
    readonly nombre: string;
    readonly precio: number;
}