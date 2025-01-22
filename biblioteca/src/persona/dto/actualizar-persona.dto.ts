import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ActualizarPersonaDto {

    @IsString()
    @IsOptional()
    nombre?: string;

    @IsString()
    @IsOptional()
    apellido?: string;

    @IsString()
    @IsOptional()
    email?: string;
}