import React, { useEffect, useState } from 'react'
import styles from '../../Pages/DroppingOdds/DroppingOdds.module.css'
import nextMatchStyle from "../../Pages/NextMatches/NextMatches.module.css";
import PagesNav from '../DroppingOdds/PagesNav'
import { Dropdown, Stack, Table } from 'react-bootstrap'
import SearchBtn from '../SearchForm/SearchBtn'
import ButtonBg from '../ButtonBg.js/ButtonBg'
import PostRequest from '../../services/PostRequest'
import { doFormatText, stringToSlug } from '../../data/formater'
import { toast } from 'react-toastify'
import SportsNav from '../DroppingOdds/SportsNav'
import { getSportsIcon } from '../../data/SportsIcon'
import { getFlagIconKey } from '../../data/flag'
import LeagueMatchItem from '../LeaguesData/LeagueMatchItem'
import { SPORTS_LIST } from '../../data/sports';

const SearchResultComponent = (props) => {
    const params = props.params
    const [sportName, setSportName] = useState('All Sports')
    const [matchData, setMatchData] = useState([])

    //console.log('matchData', matchData);


    const loadMatchDetails = async () => {
        const data = {
            league: `${params.sport}/${params.country}/${params.turnament}`,
            team: doFormatText(params['team-name'])
        }
        try {
            const response = await PostRequest('/league/matches', data)
            if (response) {
                setMatchData(response)
            } else {
                toast.error(response.data)
            }

        } catch (error) {
            toast.error(error)
        }
    }



    useEffect(() => {
        loadMatchDetails()
    }, [params])


    return (
        <div className={`mt-3 ${styles.droppingOddsBg}`}>
            <PagesNav nextTab={params['team-name']} />
            <div className={styles.searchTitle}>
                Next Match Search: {doFormatText(params['team-name'])}
            </div>
            <div className={`mt-4`}>

                {/* <div className={styles.searchFilterTitle}>Filter</div> */}

                <Stack direction='horizontal' gap={3} className={styles.setToggle}>

                    {/* <SearchBtn searchResult={true} sportName={stringToSlug(sportName)} /> */}

                    {/* <div>
                        <Dropdown className="d-inline">
                            <Dropdown.Toggle id="dropdown-autoclose-true" className={`${styles.displayLastTime} ${styles.displayLastTimeSearch}`}>

                                {doFormatText(sportName)}

                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => { setSportName('') }}>All sport</Dropdown.Item>
                                {
                                    SPORTS_LIST.map((sportName, index) => (
                                        <Dropdown.Item key={index} onClick={() => { setSportName(sportName.sportName) }}>{sportName.sportName}</Dropdown.Item>
                                    ))
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </div> */}

                    {/* <div className='mt-2'>
                        <ButtonBg btnName='Search' />
                    </div> */}


                </Stack>

            </div>

            {/* <div className={`mt-5 ${styles.searchHeading}`}>
                <span>Next Matches</span>
                <span className='ms-4'>Result</span>
            </div> */}

            <div className='mt-5'>

                <SportsNav
                    icon={getSportsIcon(
                        params.sport
                    )}
                    title={params.sport == 'soccer' ? 'football' : params.sport}
                    countryIcon={getFlagIconKey(
                        params.country
                    )}
                    countryName={params.country}
                    language={params.turnament}
                />
                <div className={nextMatchStyle.dataItemBorder}>
                    {
                        matchData.matches?.map((match, index) => (
                            <LeagueMatchItem
                                dateMatches={matchData.matches}
                                key={index}
                                matchIndex={index}
                                match={match}
                                isSaveable={true}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchResultComponent