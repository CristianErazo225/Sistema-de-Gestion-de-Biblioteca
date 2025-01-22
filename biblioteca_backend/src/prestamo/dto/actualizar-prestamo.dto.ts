import { IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class ActualizarPrestamoDto {

    @IsNotEmpty()
    @IsOptional()
    fecha_inicio?: Date;

    @IsNotEmpty()
    @IsOptional()
    fecha_fin?: Date;

    // @IsInt()
    // @IsOptional()
    // persona: number; // ID de la persona

    // @IsInt()
    // @IsOptional()
    // libro: number; // ID del libro
}