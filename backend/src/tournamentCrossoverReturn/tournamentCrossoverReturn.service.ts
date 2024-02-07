import { MysqlError, OkPacket } from 'mysql';
import db from '../db/connect';

export const getTournamentCrossoverReturn = (): Promise<any> => {
    const sql = 'SELECT * FROM tournaments_crossover_return';
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

export const createTournamentCrossoverReturn = (
  tournamentCrossoverReturnData: any,
  user: any
): Promise<{ message: string; tournamentCrossoverReturnId?: number }> => {
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
        total_win_loss,
        par_3,
        par_4,
        par_5,
        total_hole_won,
        is_active,
  } = tournamentCrossoverReturnData;

  const insertTournamentCrossoverReturnSql = `
  INSERT INTO tournament_crossover_return
    (
      id, tournament_id, player_id, hole_1, hole_2, hole_3, hole_4, hole_5, hole_6, hole_7, hole_8, hole_9,
      hole_10, hole_11, hole_12, hole_13, hole_14, hole_15, hole_16, hole_17, hole_18, total_win_loss, par_3, par_4, par_5, total_hole_won, is_active,
      created_by, created_time, update_by, update_time
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  return new Promise<{ message: string; tournamentCrossoverReturnId?: number }>((resolve, reject) => {
    db.query(
      insertTournamentCrossoverReturnSql,
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
        total_win_loss,
        par_3,
        par_4,
        par_5,
        total_hole_won,
        is_active,
        user.id,
        user.id
      ],
      (err: MysqlError | null, result: OkPacket) => {
        if (err) {
          console.error('Error inserting tournament crossover knockout:', err);
          reject({ message: 'Internal Server Error' });
        }

        resolve({ message: 'Tournament crossover knockout added successfully', tournamentCrossoverReturnId: result.insertId });
      }
    );
  });
};
