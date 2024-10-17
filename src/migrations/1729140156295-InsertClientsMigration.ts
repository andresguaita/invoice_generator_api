import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertClientsMigration1684512345678 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO client (name, email, address) VALUES
            ('John Doe', 'john.doe@example.com', 'Calle 12 # 23-45'),
            ('Jane Smith', 'jane.smith@example.com', 'Calle 12 # 23-45'),
            ('Alice Johnson', 'alice.johnson@example.com', 'Calle 12 # 23-45'),
            ('Bob Brown', 'bob.brown@example.com','Calle 12 # 23-45');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM client WHERE email IN (
                'john.doe@example.com', 'jane.smith@example.com', 
                'alice.johnson@example.com', 'bob.brown@example.com'
            );
        `);
    }
}
