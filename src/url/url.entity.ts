import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Url {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    urlCode: string;

    @Column()
    longUrl: string;

    @Column()
    shortUrl: string;

    @Column({ default: 0 })
    redirectCount: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}