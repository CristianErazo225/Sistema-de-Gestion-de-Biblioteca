import { IsNotEmpty } from 'class-validator';

export class CrearPrestamoDto {

    @IsNotEmpty()
    fecha_inicio: Date;

    @IsNotEmpty()
    fecha_fin: Date;
}