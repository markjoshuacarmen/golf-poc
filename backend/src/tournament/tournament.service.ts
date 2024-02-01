import { MysqlError, OkPacket } from 'mysql';
import db from '../db/connect';

export const getTournaments = (): Promise<any> => {
  const sql = 'SELECT * FROM tournaments';
  return new Promise((resolve, reject) => {
    db.query(sql, (err: MysqlError | null, data: any[]) => {
      if (err) {
        reject(err);
      }

      if (data.length === 0) {
        resolve({ message: 'No data found' });
      }

      resolve(data);
    });
  });
};

export const createTournament = (
  tournamentData: any,
  created_by: number
): Promise<{ message: string; tournamentId?: number }> => {
  const {
    tournament_date,
    course_id,
    course_handicap,
    derived_handicap_index,
    hole,
    corner,
    round,
    to_lose,
    has_crossover,
    has_olympic,
    has_system_36,
    class_a_index,
    is_active
  } = tournamentData;

  const insertTournamentSql = `
    INSERT INTO tournaments 
    (tournament_date, course_id, course_handicap, derived_handicap_index, hole, corner, round, to_lose, has_crossover, has_olympic, has_system_36, class_a_index, is_active, created_by, created_time, update_by, update_time) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?, CURRENT_TIMESTAMP())
  `;

  return new Promise((resolve, reject) => {
    db.query(
      insertTournamentSql,
      [
        tournament_date,
        course_id,
        course_handicap,
        derived_handicap_index,
        hole,
        corner,
        round,
        to_lose,
        has_crossover,
        has_olympic,
        has_system_36,
        class_a_index,
        is_active,
        created_by,
        created_by
      ],
      (err: MysqlError | null, result: OkPacket) => {
        if (err) {
          console.error('Error inserting tournament:', err);
          reject({ message: 'Internal Server Error' });
        }

        resolve({ message: 'Tournament added successfully', tournamentId: result.insertId });
      }
    );
  });
};
