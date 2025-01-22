import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LibroService } from './libro.service';

import { CrearLibroDto } from './dto/crear-libro.dto';
import { ActualizarLibroDto } from './dto/actualizar-libro.dto';

@Controller('libro')
export class LibroController {
    constructor(private readonly libroService: LibroService) {
    }

    // //CRUD DE LIBROS
    
    // //Leer todas las Reservas -> Consulta en postman: http://localhost:3000/libro/obtener/libro
    @Get('obtener/libro')
    obtenerLibros() {
         return this.libroService.findAll();
    }

    @Get(':id')
    obtenerUno(@Param('id_libro') id_libro: number) {
        return this.libroService.findOne(id_libro);
    }

    //Crear libros -> Consulta en postman: http://localhost:3000/libro/crear/libro
    @Post('crear/libro') 
    crear(@Body() crearLibroDto: CrearLibroDto) {
        return this.libroService.create(crearLibroDto);
    }

    //Actualizar libros -> Consulta en postman: http://localhost:3000/libro/1
    @Put(':id_libro')
    actualizar(
        @Param('id_libro') id_libro: number,
        @Body() actualizarLibroDto: ActualizarLibroDto
    ) {
        return this.libroService.update(id_libro, actualizarLibroDto);
    }

    //Eliminar libros -> Consulta en postman: http://localhost:3000/libro/1
    @Delete(':id_libro')
    borrar(@Param('id_libro') id_libro: number) {
        return this.libroService.remove(id_libro);
    }

   
}