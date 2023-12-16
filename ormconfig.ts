import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
export const getConfig = (): PostgresConnectionOptions => ({
  type: 'postgres',
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  //   ssl: {
  //     rejectUnauthorized: true,
  //   },
  entities: [`${__dirname}/src/db/entities/*{.ts,.js}`],
  synchronize: true, // puoi anche controllare questa variabile d'ambiente
});
