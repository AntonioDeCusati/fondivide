import { Timestamp } from "rxjs/internal/operators/timestamp";

export class Fondo {
    idFondo:number;
    nomeFondo:string;
    siglaFondo:string;
    percRipart:number;
    saldo:number;
    lastOperation:string;
    fondoFisso:number
}