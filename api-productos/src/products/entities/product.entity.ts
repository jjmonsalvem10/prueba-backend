import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'productos' }) // Le dice a TypeORM que esta clase es una tabla llamada 'productos'
export class Product {
  @PrimaryGeneratedColumn('uuid') // Define la columna 'id' como la clave primaria y auto-generada como UUID
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false }) // Define una columna de tipo string
  nombre: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false }) // Define una columna para precios
  precio: number;

  @Column({ type: 'integer', nullable: false }) // Define una columna para el stock
  stock: number;
}




//export class Product {}
