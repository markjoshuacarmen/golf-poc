import { MysqlError, OkPacket } from 'mysql';
import db from '../db/connect';

export const getTournamentCrossoverParBetter = (): Promise<any> => {
    const sql = 'SELECT * FROM tournaments_crossover_par_better';
    return new Promise((resolve, reject) => {
      db.query(sql, (err: MysqlError | null, data: any[]) => {
        if (err) {
          reject(err);
        } if (data.length === 0) {
          resolve({ message: 'No data found' }); 
        }
        resolve(data);
      });
    });
  };

export const createTournamentCrossoverParBetter = (
  tournamentCrossoverParBetterData: any,
  user: any
): Promise<{ message: string; tournamentCrossoverParBetterId?: number }> => {
  const {
    tournament_id,
    player_id,
    hole_1,
    hole_2,
    hole_3,
    hole_4,
    hole_5,
    hole_6,
    hole_7,
    hole_8,
    hole_9,
    hole_10,
    hole_11,
    hole_12,
    hole_13,
    hole_14,
    hole_15,
    hole_16,
    hole_17,
    hole_18,
    is_active
  } = tournamentCrossoverParBetterData;

  const insertTournamentCrossoverParBetterSql = `
    INSERT INTO tournaments_crossover_par_better
    (
      tournament_id, player_id, hole_1, hole_2, hole_3, hole_4, hole_5, hole_6, hole_7, hole_8, hole_9,
      hole_10, hole_11, hole_12, hole_13, hole_14, hole_15, hole_16, hole_17, hole_18, is_active,
      created_by, created_time, update_by, update_time
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP())
  `;

  return new Promise<{ message: string; tournamentCrossoverParBetterId?: number }>((resolve, reject) => {
    db.query(
      insertTournamentCrossoverParBetterSql,
      [
        tournament_id,
        player_id,
        hole_1,
        hole_2,
        hole_3,
        hole_4,
        hole_5,
        hole_6,
        hole_7,
        hole_8,
        hole_9,
        hole_10,
        hole_11,
        hole_12,
        hole_13,
        hole_14,
        hole_15,
        hole_16,
        hole_17,
        hole_18,
        is_active,
        user.id,
        user.id
      ],
      (err: MysqlError | null, result: OkPacket) => {
        if (err) {
          console.error('Error inserting tournament crossover Par Better:', err);
          reject({ message: 'Internal Server Error' });
        }

        resolve({ message: 'Tournament crossover ParBetter added successfully', tournamentCrossoverParBetterId: result.insertId });
      }
    );
  });
};
