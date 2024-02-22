import { MysqlError, OkPacket } from 'mysql';
import db from '../db/connect';

export const getTournamentMainHandicapDistribution = (): Promise<any> => {
    const sql = 'SELECT * FROM tournaments_main_handicap_distribution';
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

export const createTournamentMainHandicapDistribution = async (
    tournamentMainHandicapDistributionData: any,
    user: any,
    holes: (number | null)[], 

): Promise<{ message: string; tournamentMainHandicapDistributionId?: number }> => {
    try {
        const {
            tournament_id,
            player_id,
            in_score,
            out_score,
            total_score,
            proof,
            is_active
        } = tournamentMainHandicapDistributionData;

        const insertTournamentMainHandicapDistributionSql = `
            INSERT INTO tournaments_main_handicap_distribution
            (
                tournament_id, player_id, hole_1, hole_2, hole_3, hole_4, hole_5, hole_6, hole_7, hole_8, hole_9,
                hole_10, hole_11, hole_12, hole_13, hole_14, hole_15, hole_16, hole_17, hole_18,
                in_score, out_score, total_score, proof, is_active,
                created_by, created_time
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP())
        `;

        const result = await new Promise<{ message: string; tournamentMainHandicapDistributionId?: number }>((resolve, reject) => {
            db.query(
                insertTournamentMainHandicapDistributionSql,
                [
                    tournament_id,
                    player_id,
                    ...holes, 
                    in_score,
                    out_score,
                    total_score,
                    proof,
                    is_active,
                    user.id
                ],
                (err: MysqlError | null, result: OkPacket) => {
                    if (err) {
                        console.error('Error inserting tournament main handicap distribution:', err);
                        reject({ message: 'Internal Server Error' });
                    } else {
                        resolve({ message: 'Tournament main handicap distribution added successfully', tournamentMainHandicapDistributionId: result.insertId });
                    }
                }
            );
        });

        return result;
    } catch (error) {
        console.error('Error:', error);
        return { message: 'Error occurred', tournamentMainHandicapDistributionId: undefined };
    }
};
