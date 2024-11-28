import React from 'react'
import styles from "../../Pages/LeaguesData/LeaguesData.module.css";
import matchWithOddsStyles from "../../Pages/MatchWithOdds/MatchWithOdds.module.css";
import { Stack, Table } from 'react-bootstrap';
import { Icon } from '@iconify/react/dist/iconify.js';
import { getFlagIconKey } from '../../data/flag';

const Standings = () => {
    return (
        <div className={`pt-4 mt-5 ${styles.bg}`}>
            <div className={matchWithOddsStyles.tableOutLine}>
                <Table bordered>
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            <td style={{ background: '#f0f1fe' }}>#</td>
                            <td style={{ background: '#f0f1fe', width: '35%' }}>Team</td>
                            <td style={{ background: '#f0f1fe' }}>MP</td>
                            <td style={{ background: '#f0f1fe' }}>W</td>
                            <td style={{ background: '#f0f1fe' }}>D</td>
                            <td style={{ background: '#f0f1fe' }}>L</td>
                            <td style={{ background: '#f0f1fe' }}>G</td>
                            <td style={{ background: '#f0f1fe' }}>GD</td>
                            <td style={{ background: '#f0f1fe' }}>Pts</td>
                            <td style={{ background: '#f0f1fe' }}>From</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>
                                <Icon fontSize={"25px"}
                                    icon={getFlagIconKey('India')}
                                    className="ms-2 me-2"
                                /> Pyramids
                            </td>
                            <td style={{ textAlign: 'center' }}>21</td>
                            <td style={{ textAlign: 'center' }}>15</td>
                            <td style={{ textAlign: 'center' }}>5</td>
                            <td style={{ textAlign: 'center' }}>1</td>
                            <td style={{ textAlign: 'center' }}>33.14</td>
                            <td style={{ textAlign: 'center' }}>19</td>
                            <td style={{ textAlign: 'center' }}>50</td>
                            <td>
                                <Stack direction='horizontal' gap={2}>
                                    <div className={`${styles.standingsResult}`}>?</div>
                                    <div className={`${styles.standingsResult} ${styles.standingsResultW}`}>w</div>
                                    <div className={`${styles.standingsResult} ${styles.standingsResultL}`}>L</div>
                                    <div className={`${styles.standingsResult} ${styles.standingsResultD}`}>D</div>
                                </Stack>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Standings