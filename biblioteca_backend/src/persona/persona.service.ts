import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Persona } from './persona.entity';

import { CrearPersonaDto } from './dto/crear-persona.dto';
import { ActualizarPersonaDto } from './dto/actualizar-persona.dto';

@Injectable()
export class PersonaService {
    constructor(
        @InjectRepository(Persona)
        private personaRepository: Repository<Persona>,
    ) { }

    //Servicio para obtener todas los libros
    findAll(): Promise<Persona[]> {
            return this.personaRepository.find();
    }

    
    //Servicio para crear Personas
    async create(crearPersonaDto: CrearPersonaDto): Promise<Persona> {
        const persona = this.personaRepository.create(crearPersonaDto);
        return this.personaRepository.save(persona);
    }

        //Servicio para Actualizar Personas
    async update(id_persona: number, actualizarPersonaDto: ActualizarPersonaDto): Promise<Persona> {
        const persona = await this.findOne(id_persona);
        Object.assign(persona, actualizarPersonaDto);
        return this.personaRepository.save(persona);
    }

    //Servicio para eliminar Personas
    async findOne(id_persona: number): Promise<Persona> {
            const persona = await this.personaRepository.findOne({ 
                where: { id_persona }
            //  , 
            //  relations: ['vehiculo', 'clientes']
            });
            if (!persona) {
                throw new NotFoundException('persona con ID ' + id_persona + ' no encontrado');
            }
            return persona;
        }

    //Servicio para eliminar Personas
    async remove(id_persona: number): Promise<void> {
        const persona = await this.findOne(id_persona);
        await this.personaRepository.delete(id_persona);
    }

    
}
