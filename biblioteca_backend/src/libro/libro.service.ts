import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from './Libro.entity';

import { CrearLibroDto } from './dto/crear-libro.dto';
import { ActualizarLibroDto } from './dto/actualizar-libro.dto';


@Injectable()
export class LibroService {
    constructor(
        @InjectRepository(Libro)
        private libroRepository: Repository<Libro>,
    ) { }

    //Servicio para obtener todas los libros
    findAll(): Promise<Libro[]> {
         return this.libroRepository.find();
    }

    
    //Servicio para crear Libros
    async create(crearLibroDto: CrearLibroDto): Promise<Libro> {
        const libro = this.libroRepository.create(crearLibroDto);
        return this.libroRepository.save(libro);
    }

     //Servicio para Actualizar Libros
    async update(id_libro: number, actualizarLibroDto: ActualizarLibroDto): Promise<Libro> {
        const libro = await this.findOne(id_libro);
        Object.assign(libro, actualizarLibroDto);
        return this.libroRepository.save(libro);
    }

    //Servicio para eliminar libros
    async findOne(id_libro: number): Promise<Libro> {
         const libro = await this.libroRepository.findOne({ 
             where: { id_libro }
            //  , 
            //  relations: ['vehiculo', 'clientes']
          });
         if (!libro) {
             throw new NotFoundException('libro con ID ' + id_libro + ' no encontrado');
         }
         return libro;
     }

    //Servicio para eliminar libros
    async remove(id_libro: number): Promise<void> {
        const libro = await this.findOne(id_libro);
        await this.libroRepository.delete(id_libro);
    }

    // async findFull(): Promise<Libro[]>{
    //     return this.libroRepository.find( {relations: ['prestamos']});

    // }
}
