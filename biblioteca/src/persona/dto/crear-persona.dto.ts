import { IsString, IsNotEmpty } from 'class-validator';

export class CrearPersonaDto {

    @IsString()
    nombre: string;

    @IsString()
    apellido: string;

    @IsString()
    email: string;
}