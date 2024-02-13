import { MysqlError, OkPacket } from 'mysql';
import db from '../db/connect';

export const getTournamentMainFinalHoleResult = (): Promise<any> => {
    const sql = 'SELECT * FROM tournaments_main_final_hole_result';
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

export const createTournamentMainFinalHoleResult = (
  tournamentMainFinalHoleResultData: any,
  user: any
): Promise<{ message: string; tournamentMainFinalHoleResultId?: number }> => {
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
  } = tournamentMainFinalHoleResultData;


  const insertTournamentMainFinalHoleResultSql = `
  INSERT INTO tournaments_main_final_hole_result
  (
    tournament_id, player_id, hole_1, hole_2, hole_3, hole_4, hole_5, hole_6, hole_7, hole_8, hole_9,
    hole_10, hole_11, hole_12, hole_13, hole_14, hole_15, hole_16, hole_17, hole_18, in_score, out_score, total_score, is_active,
    created_by, created_time, update_by, update_time
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP())
`;




  return new Promise<{ message: string; tournamentMainFinalHoleResultId?: number }>((resolve, reject) => {
    db.query(
      insertTournamentMainFinalHoleResultSql,
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
        out_score,
        in_score,
        total_score,
        is_active,
        user.id,
        user.id
      ],
      (err: MysqlError | null, result: OkPacket) => {
        if (err) {
          console.error('Error inserting tournament final hole result:', err);
          reject({ message: 'Internal Server Error' });
        }

        resolve({ message: 'Tournament final hole result added successfully', tournamentMainFinalHoleResultId: result.insertId });
      }
    );
  });
};
