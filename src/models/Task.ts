/* eslint-disable camelcase */
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('tasks')
class Task {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	name: string;

	@Column('timestamp with time zone')
	date: Date;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export default Task;
