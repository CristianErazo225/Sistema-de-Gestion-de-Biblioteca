import { IsString, IsNotEmpty } from 'class-validator';

export class CrearLibroDto {

    @IsString()
    titulo: string;

    @IsString()
    autor: string;

    @IsNotEmpty()
    anio_publicacion: number;
}