import "reflect-metadata";
import {
    Entity, Column, PrimaryGeneratedColumn,
    Index
} from "typeorm";

@Entity()
export class TvShow {
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    @Index({ unique: true })
    name: string;

    @Column()
    channel: string;

    @Column()
    genre: string;

    @Column("smallint")
    rating: number = 0;

    @Column()
    explicit: boolean;

}