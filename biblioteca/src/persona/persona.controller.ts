import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { CrearPersonaDto } from './dto/crear-persona.dto';
import { ActualizarPersonaDto } from './dto/actualizar-persona.dto';

@Controller('persona')
export class PersonaController {
    constructor(private readonly personaService: PersonaService) {
    }

    // //CRUD DE PERSONAS
    
    // //Leer todas las Reservas -> Consulta en postman: http://localhost:3000/libro/obtener/libro
    @Get('obtener/persona')
    obtenerPersonas() {
        return this.personaService.findAll();
    }

    //Crear libros -> Consulta en postman: http://localhost:3000/libro/crear/libro
    @Post('crear/persona') 
    crear(@Body() crearPersonaDto: CrearPersonaDto) {
        return this.personaService.create(crearPersonaDto);
    }

    //Actualizar libros -> Consulta en postman: http://localhost:3000/libro/1
    @Put(':id_persona')
    actualizar(
        @Param('id_persona') id_persona: number,
        @Body() actualizarPersonaDto: ActualizarPersonaDto
    ) {
        return this.personaService.update(id_persona, actualizarPersonaDto);
    }

    //Eliminar libros -> Consulta en postman: http://localhost:3000/libro/1
    @Delete(':id_persona')
    borrar(@Param('id_persona') id_persona: number) {
        return this.personaService.remove(id_persona);
    }

    
}
