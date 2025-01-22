import { Prestamo } from 'src/prestamo/prestamo.entity';

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
@Entity()
export class Persona {

    @PrimaryGeneratedColumn()
    id_persona: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    email: string;
    
    
    //Una persona puede tener muchos prestamos
    @OneToMany(() => Prestamo,prestamo =>prestamo.persona)
    pretamos: Prestamo[];

    
} 