import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PrestamoService } from './prestamo.service';
import { CrearPrestamoDto } from './dto/crear-prestamo.dto';
import { ActualizarPrestamoDto } from './dto/actualizar-prestamo.dto';

@Controller('prestamo')
export class PrestamoController {
    constructor(private readonly prestamoService: PrestamoService) {
    }

    // //CRUD DE PRESTAMOS
    
    // //Leer todas las Reservas -> Consulta en postman: http://localhost:3000/libro/obtener/libro
    @Get('obtener/prestamo')
    obtenerPrestamos() {
        return this.prestamoService.findAll();
    }

    @Get(':id')
    obtenerUno(@Param('id_prestamo') id_prestamo: number) {
        return this.prestamoService.findOne(id_prestamo);
    }

    //Crear prestamo -> Consulta en postman: http://localhost:3000/libro/crear/libro
    @Post('crear/prestamo') 
    crear(@Body() crearPrestamoDto: CrearPrestamoDto) {
        return this.prestamoService.create(crearPrestamoDto);
    }

    //Actualizar Prestamo -> Consulta en postman: http://localhost:3000/libro/1
    @Put(':id_prestamo')
    actualizar(
        @Param('id_prestamo') id_prestamo: number,
        @Body() actualizarPrestamoDto: ActualizarPrestamoDto
    ) {
        return this.prestamoService.update(id_prestamo, actualizarPrestamoDto);
    }

    //Eliminar libros -> Consulta en postman: http://localhost:3000/libro/1
    @Delete(':id_prestamo')
    borrar(@Param('id_prestamo') id_prestamo: number) {
        return this.prestamoService.remove(id_prestamo);
    }

     // //Leer todas las prestamos y relaciones con libros y personas -> Consulta en postman: http://localhost:3000/prestamo/full/prestamos
    @Get('full/prestamos')
    obtenerCompleto() {
        return this.prestamoService.findFull();
    }
}
