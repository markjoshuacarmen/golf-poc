import { MysqlError, OkPacket } from 'mysql';
import db from '../db/connect';

export const getTournamentMainNetOverUnder = (): Promise<any> => {
    const sql = 'SELECT * FROM tournaments_main_net_over_under';
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

export const createTournamentMainNetOverUnder = (
  tournamentMainNetOverUnderData: any,
  user: any
): Promise<{ message: string; tournamentMainNetOverUnderId?: number }> => {
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
    in_score,
    out_score,
    total_score,
    is_active
  } = tournamentMainNetOverUnderData;

  const insertTournamentMainNetOverUnderSql = `
    INSERT INTO tournaments_main_net_over_under
    (
      tournament_id, player_id, hole_1, hole_2, hole_3, hole_4, hole_5, hole_6, hole_7, hole_8, hole_9,
      hole_10, hole_11, hole_12, hole_13, hole_14, hole_15, hole_16, hole_17, hole_18, in_score, out_score, total_score, is_active,
      created_by, created_time, update_by, update_time
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP())
  `;

  return new Promise<{ message: string; tournamentMainNetOverUnderId?: number }>((resolve, reject) => {
    db.query(
      insertTournamentMainNetOverUnderSql,
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
        in_score,
        out_score,
        total_score,
        is_active,
        user.id,
        user.id
      ],
      (err: MysqlError | null, result: OkPacket) => {
        if (err) {
          console.error('Error inserting tournament main net over under:', err);
          reject({ message: 'Internal Server Error' });
        }

        resolve({ message: 'Tournament main net over under added successfully', tournamentMainNetOverUnderId: result.insertId });
      }
    );
  });
};
