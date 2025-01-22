import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LibroController } from './libro/libro.controller';
import { PersonaController } from './persona/persona.controller';
import { PrestamoController } from './prestamo/prestamo.controller';
import { LibroService } from './libro/libro.service';
import { PersonaService } from './persona/persona.service';
import { PrestamoService } from './prestamo/prestamo.service';
import { Libro } from './libro/Libro.entity';
import { Persona } from './persona/persona.entity';
import { Prestamo } from './prestamo/prestamo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432, username: 'postgres',
      password: '123',
      database: 'biblioteca_db',
      entities: [Libro, Persona, Prestamo],
      synchronize: true, }),
      TypeOrmModule.forFeature([Libro, Persona, Prestamo]),
  ],
  controllers: [AppController, LibroController, PersonaController, PrestamoController],
  providers: [AppService, LibroService, PersonaService, PrestamoService],
})
export class AppModule {}
