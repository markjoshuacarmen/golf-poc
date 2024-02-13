import { MysqlError, OkPacket } from 'mysql';
import db from '../db/connect';

export const getTournamentOlympic = (): Promise<any> => {
    const sql = 'SELECT * FROM tournaments_olympic';
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

export const createTournamentOlympic = (
  tournamentOlympicData: any,
  user: any
): Promise<{ message: string; tournamentOlympicId?: number }> => {
  const {
    tournament_id,
    player_id,
    group_num,
    points,
    top_score,
    gap,
    return_initial,
    return_final,
    is_active
  } = tournamentOlympicData;

  const insertTournamentOlympicSql = `
    INSERT INTO tournaments_olympic
    (
      tournament_id, player_id, group_num, points, top_score, gap, return_initial, return_final, is_active,
      created_by, created_time, update_by, update_time
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP())
  `;

  return new Promise<{ message: string; tournamentOlympicId?: number }>((resolve, reject) => {
    db.query(
      insertTournamentOlympicSql,
      [
        tournament_id,
        player_id,
        group_num,
        points,
        top_score,
        gap,
        return_initial,
        return_final,
        is_active,
        user.id,
        user.id
      ],
      (err: MysqlError | null, result: OkPacket) => {
        if (err) {
          console.error('Error inserting tournament olympic:', err);
          reject({ message: 'Internal Server Error' });
        }

        resolve({ message: 'Tournament olympic added successfully', tournamentOlympicId: result.insertId });
      }
    );
  });
};
