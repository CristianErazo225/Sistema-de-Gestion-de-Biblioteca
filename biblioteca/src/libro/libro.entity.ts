import { Prestamo } from 'src/prestamo/prestamo.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';

@Entity()
export class Libro {

    @PrimaryGeneratedColumn()
    id_libro: number;

    @Column()
    titulo: string;

    @Column()
    autor: string;

    @Column()
    anio_publicacion: number;

    //Un libro puede etar reservado en varios prestamos
    @OneToMany(() => Prestamo,prestamo =>prestamo.libro)
    pretamos: Prestamo[];

} 