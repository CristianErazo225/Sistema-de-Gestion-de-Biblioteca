import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ActualizarLibroDto {

    @IsString()
    @IsOptional()
    titulo?: string;

    @IsString()
    @IsOptional()
    autor?: string;

    @IsNotEmpty()
    @IsOptional()
    anio_publicacion?: number;
}