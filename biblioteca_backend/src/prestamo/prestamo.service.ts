import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prestamo } from './prestamo.entity';
import { CrearPrestamoDto } from './dto/crear-prestamo.dto';
import { ActualizarPrestamoDto } from './dto/actualizar-prestamo.dto';

@Injectable()
export class PrestamoService {
    constructor(
        @InjectRepository(Prestamo)
        private prestamoRepository: Repository<Prestamo>,
    ) { }

    //Servicio para obtener todas los prestamos
    findAll(): Promise<Prestamo[]> {
        return this.prestamoRepository.find();
    }

    
    //Servicio para crear prestamos
    async create(crearPrestamoDto: CrearPrestamoDto): Promise<Prestamo> {
        const prestamo = this.prestamoRepository.create(crearPrestamoDto);
        return this.prestamoRepository.save(prestamo);
    }

    //Servicio para Actualizar prestamos
    async update(id_prestamo: number, actualizarPrestamoDto: ActualizarPrestamoDto): Promise<Prestamo> {
        const prestamo = await this.findOne(id_prestamo);
        Object.assign(prestamo, actualizarPrestamoDto);
        return this.prestamoRepository.save(prestamo);
    }

    //Servicio 
    async findOne(id_prestamo: number): Promise<Prestamo> {
            const prestamo = await this.prestamoRepository.findOne({ 
                where: { id_prestamo }
             , 
             relations: ['persona', 'libro']
            });
            if (!prestamo) {
                throw new NotFoundException('prestamo con ID ' + id_prestamo + ' no encontrado');
            }
            return prestamo;
        }

    //Servicio para eliminar prestamos
    async remove(id_prestamo: number): Promise<void> {
        const prestamo = await this.findOne(id_prestamo);
        await this.prestamoRepository.delete(id_prestamo);
    }

    //Servicio para obtener todas los prestamos y relaciones con libros y personas
    async findFull(): Promise<Prestamo[]>{
        return this.prestamoRepository.find( {relations: ['persona', 'libro']});

    }
}
