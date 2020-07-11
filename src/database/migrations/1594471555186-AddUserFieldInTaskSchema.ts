import {
	MigrationInterface,
	QueryRunner,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

export default class AddUserFieldInTaskSchema1594471555186
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'tasks',
			new TableColumn({
				name: 'user_id',
				type: 'integer',
				isNullable: true,
			}),
		);
		await queryRunner.createForeignKey(
			'tasks',
			new TableForeignKey({
				name: 'UserTask',
				columnNames: ['user_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'users',
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('tasks', 'UserTask');

		await queryRunner.dropColumn('tasks', 'user_id');
	}
}
