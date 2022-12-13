import { Document } from "mongoose";

export interface ITicket extends Document{
    readonly id: string;
    readonly fecha: string;
    readonly productos: [];
    readonly total: number;
}
