import { MysqlError, OkPacket } from 'mysql';
import db from '../db/connect';
import { createTournamentMainHandicapDistribution } from '../tournamentMainHandicapDistribution/tournamentMainHandicapDistribution.service';

export const getTournamentMainScore = (): Promise<any> => {
    const sql = 'SELECT * FROM tournaments_main_score';
    return new Promise((resolve, reject) => {
        db.query(sql, (err: MysqlError | null, data: any[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

export const createTournamentMainScore = async (
    tournamentMainScoreData: any,
    user: any
): Promise<{ message: string; tournamentMainScoreId?: number; tournamentMainHandicapDistributionId?: number }> => {
    try {
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
        } = tournamentMainScoreData;

        // Fetch player data from the players table
        const playerQuery = 'SELECT * FROM players WHERE id = ?';
        const playerQueryParams = [player_id];

        const playerResult = await new Promise<any>((resolve, reject) => {
            db.query(playerQuery, playerQueryParams, (err: MysqlError | null, data: any[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        if (playerResult.length === 0) {
            throw new Error('Player not found');
        }

        // Extract index from the player data
        const { Index } = playerResult[0];

        if (typeof Index === 'undefined') {
            throw new Error('Index is undefined');
        }

        // Fetch course data from the courses table
        const courseQuery = 'SELECT * FROM courses WHERE id = ?';
        const courseQueryParams = [tournament_id];

        const courseResult = await new Promise<any>((resolve, reject) => {
            db.query(courseQuery, courseQueryParams, (err: MysqlError | null, data: any[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        if (courseResult.length === 0) {
            throw new Error('Course not found');
        }

        // Extract slope from the course data
        const { slope } = courseResult[0];

        if (typeof slope === 'undefined') {
            throw new Error('Slope is undefined');
        }

        // Calculate hdcp (handicap)
        const hdcp = (slope * Index) / 113;

        // Create an array to hold hole values
        const holes: (number | null)[] = [];

        // Apply conditions for each hole and store the values
        for (let i = 1; i <= 18; i++) {
            let holeValue: number | null = null;
            if (player_id !== null) {
                if (hdcp < 18) {
                    holeValue = i === 1 ? 1 : 0;
                } else {
                    const adjustedHdcp = hdcp - 18;
                    holeValue = i > adjustedHdcp ? 1 : 2;
                }
            }
            holes.push(holeValue);
        }

        // Calculate out_score, in_score, and total_score
        const out_score = holes.slice(0, 9).reduce((acc, curr) => acc! + (curr === null ? 0 : curr), 0);
        const in_score = holes.slice(9).reduce((acc, curr) => acc! + (curr === null ? 0 : curr), 0);
        const total_score = (out_score || 0) + (in_score || 0);
        const proof = hdcp - total_score;

        const gross_out = hole_1 + hole_2 + hole_3 + hole_4 + hole_5 + hole_6 + hole_7 + hole_8 + hole_9;
        const gross_in = hole_10 + hole_11 + hole_12 + hole_13 + hole_14 + hole_15 + hole_16 + hole_17 + hole_18;
        const gross_total = gross_out + gross_in;

        const tournamentExistsQuery = 'SELECT * FROM tournaments WHERE id = ?';
        const tournamentExistsParams = [tournament_id];

        const tournamentMainScoreResult = await new Promise<{ message: string; tournamentMainScoreId?: number }>((resolve, reject) => {
            db.query(tournamentExistsQuery, tournamentExistsParams, (err: MysqlError | null, tournamentResult: any[]) => {
                if (err) {
                    console.error('Error checking if tournament exists:', err);
                    reject({ message: 'Internal Server Error' });
                } else if (tournamentResult.length === 0) {
                    reject({ message: 'Tournament not found' });
                } else {
                    const is_active = tournamentResult[0].is_active;

                    const insertMainScoreSql = `
                        INSERT INTO tournaments_main_score
                        (tournament_id, player_id, hole_1, hole_2, hole_3, hole_4, hole_5, hole_6, hole_7, hole_8, hole_9,
                        hole_10, hole_11, hole_12, hole_13, hole_14, hole_15, hole_16, hole_17, hole_18, gross_out, gross_in,
                        gross_total, net_out, net_in, net_total, is_active, created_time, update_time)
                        VALUES 
                        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,  CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())
                    `;

                    db.query(
                        insertMainScoreSql,
                        [
                            tournament_id, player_id, hole_1, hole_2, hole_3, hole_4, hole_5, hole_6, hole_7, hole_8, hole_9,
                            hole_10, hole_11, hole_12, hole_13, hole_14, hole_15, hole_16, hole_17, hole_18, gross_out, gross_in,
                            gross_total, out_score, in_score, total_score, is_active, user.id, new Date(), user.id, new Date()
                        ],
                        async(insertErr: MysqlError | null, result: any) => {
                            if (insertErr) {
                                console.error('Error inserting tournament main score:', insertErr);
                                reject({ message: 'Internal Server Error' });
                            } else {
                                const mainScoreId = result.insertId;
                                resolve({
                                    message: 'Tournament main score added successfully',
                                    tournamentMainScoreId: mainScoreId
                                });
                            }
                        }
                    );
                }
            });
        });

        const tournamentMainHandicapDistributionResult = await createTournamentMainHandicapDistribution(
            {
                tournament_id,
                player_id,
                out_score,
                in_score,
                total_score,
                proof,
                is_active: tournamentMainScoreData.is_active 
            },
            user,
            holes // Pass the holes array to createTournamentMainHandicapDistribution
        );

        // Check if the creation of tournament main handicap distribution was successful
        if (tournamentMainScoreResult.tournamentMainScoreId && tournamentMainHandicapDistributionResult && tournamentMainHandicapDistributionResult.tournamentMainHandicapDistributionId) {
            // Main tournament score and handicap distribution created successfully
            return {
                message: 'Tournament main score and handicap distribution added successfully',
                tournamentMainScoreId: tournamentMainScoreResult.tournamentMainScoreId,
                tournamentMainHandicapDistributionId: tournamentMainHandicapDistributionResult.tournamentMainHandicapDistributionId
            };
        } else {
            // Either main tournament score or handicap distribution creation failed
            throw new Error('Error creating tournament main score and handicap distribution');
        }
    } catch (error) {
        console.error('Error:', error);
        return { message: 'Error occurred', tournamentMainScoreId: undefined, tournamentMainHandicapDistributionId: undefined };
    }
};
