import { Persona } from 'src/persona/persona.entity';
import { Libro } from 'src/libro/Libro.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';

@Entity()
export class Prestamo {

    @PrimaryGeneratedColumn()
    id_prestamo: number;

    @Column()
    fecha_inicio: Date;

    @Column()
    fecha_fin: Date;
    
    //Cada prestamo está asociada a una persona
    @ManyToOne(() => Persona, persona => persona.pretamos, { onDelete: 'SET NULL'})
    persona: Persona;

    //Cada libro está asociada a una persona
    @ManyToOne(() => Libro, libro => libro.pretamos, { onDelete: 'SET NULL'})
    libro: Libro;
} 