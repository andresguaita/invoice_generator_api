import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertProductsMigration1684512345678  implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO product (name, price, stock) VALUES
            ('Product 1', 10.99, 100),
            ('Product 2', 15.50, 200),
            ('Product 3', 5.99, 150),
            ('Product 4', 20.00, 80),
            ('Product 5', 8.75, 60),
            ('Product 6', 12.99, 120),
            ('Product 7', 25.49, 90),
            ('Product 8', 18.99, 300),
            ('Product 9', 7.50, 50),
            ('Product 10', 9.99, 110),
            ('Product 11', 19.99, 200),
            ('Product 12', 13.75, 75),
            ('Product 13', 6.99, 60),
            ('Product 14', 4.50, 150),
            ('Product 15', 29.99, 100),
            ('Product 16', 22.49, 80),
            ('Product 17', 18.00, 140),
            ('Product 18', 16.50, 130),
            ('Product 19', 3.99, 40),
            ('Product 20', 27.00, 70),
            ('Product 21', 30.99, 150),
            ('Product 22', 11.25, 90),
            ('Product 23', 23.49, 80),
            ('Product 24', 12.75, 60),
            ('Product 25', 5.50, 130),
            ('Product 26', 14.99, 110),
            ('Product 27', 17.50, 140),
            ('Product 28', 21.99, 170),
            ('Product 29', 8.25, 50),
            ('Product 30', 10.50, 60),
            ('Product 31', 28.49, 110),
            ('Product 32', 4.99, 200),
            ('Product 33', 24.99, 90),
            ('Product 34', 9.25, 140),
            ('Product 35', 15.75, 80),
            ('Product 36', 6.50, 150),
            ('Product 37', 26.99, 110),
            ('Product 38', 7.99, 60),
            ('Product 39', 3.50, 70),
            ('Product 40', 16.00, 130),
            ('Product 41', 13.99, 100),
            ('Product 42', 18.75, 90),
            ('Product 43', 12.50, 80),
            ('Product 44', 19.25, 50),
            ('Product 45', 9.75, 120),
            ('Product 46', 20.99, 150),
            ('Product 47', 5.99, 40),
            ('Product 48', 25.00, 60),
            ('Product 49', 14.50, 70),
            ('Product 50', 22.75, 100);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM product WHERE name IN (
                'Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5',
                'Product 6', 'Product 7', 'Product 8', 'Product 9', 'Product 10',
                'Product 11', 'Product 12', 'Product 13', 'Product 14', 'Product 15',
                'Product 16', 'Product 17', 'Product 18', 'Product 19', 'Product 20',
                'Product 21', 'Product 22', 'Product 23', 'Product 24', 'Product 25',
                'Product 26', 'Product 27', 'Product 28', 'Product 29', 'Product 30',
                'Product 31', 'Product 32', 'Product 33', 'Product 34', 'Product 35',
                'Product 36', 'Product 37', 'Product 38', 'Product 39', 'Product 40',
                'Product 41', 'Product 42', 'Product 43', 'Product 44', 'Product 45',
                'Product 46', 'Product 47', 'Product 48', 'Product 49', 'Product 50'
            );
        `);
    }
}
