import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
class User {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	email: string;

	@Column()
	password: string;
}

export default User;
