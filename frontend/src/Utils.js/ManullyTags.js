import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import useMetaTags from '../hooks/useMetaTags';
export default function ManullyTags() {


    const location = useLocation()

    const soccerNextMatches = {
        title: `Upcoming Sports Events | Next Matches Odds & Betting`,
        description: `Discover upcoming sports events and compare odds from top bookmakers for the best betting opportunities on the next matches. Stay informed and bet smarter.`,
        keyword: `Next matches, order of play, schedule, football, soccer, tennis, basketball, leagues, tournaments, odds comparison, matched betting, compare sport odds, betting lines`,
    }
    const droppingOdds = {
        title: `Dropping Odds | Track Sports Betting Trends & Maximize Wins`,
        description: `Stay ahead in betting with Dropping Odds. Monitor market shifts and spot opportunities to secure the highest odds for maximum returns.`,
        keyword: `dropping odds, arbitrage sports odds, comparison football odds, odds tracker, odds movement, compare betting`
    }

    const sureBets = {
        title: `Sure Bets | Maximize Profit with Arbitrage Betting`,
        description: `Explore sure bets and arbitrage betting strategies to guarantee profits, minimize risks, and maximize returns with the best odds at OddsRun.`,
        keyword: `arbitrage sports odds, sure bets, best odds, best betting odds`
    }

    const bookMakers = {
        title: `Bookmakers Odds Comparison | Find Top Betting Sites`,
        description: `Compare bookmakers odds for the best betting sites. Get top odds, bonuses, and more with our bookmakers odds comparison for the highest returns on your wagers.`,
        keyword: `list of bookies, best bookmakers, top rated bookmakers, top betting sites, betting bookies, sports bookmakers, esport bookmakers`
    }

    const cricketNextMatches = {
        title: `Latest Cricket Betting Odds | Real-Time Updates`,
        description: `Stay updated with the latest cricket betting odds. Our real-time tracker provides insights and updates to help you make informed bets on all major cricket matches and tournaments.`,
        keyword: `Next matches, order of play, schedule, cricket, india, pakistan, leagues, tournaments, odds comparison, matched betting, compare cricket odds, betting lines`
    }

    const tennisNextMatches = {
        title: `Latest Tennis Betting Lines | Best tennis odds`,
        description: `Stay ahead with the latest tennis betting lines. Our real-time updates provide insights and tennis odds to help you make informed bets on all major matches and tournaments.`,
        keyword: `Next matches, order of play, schedule, tennis, tenis, wimbledon, us open, australian open, tournaments, odds comparison, matched betting, compare tennis odds, betting lines`
    }

    const boxingNextMatches = {
        title: `Best Online Boxing Betting Sites | Top Picks & Reviews`,
        description: `Discover the best online boxing betting sites. Read our top picks and reviews to find trusted platforms with great odds, bonuses, and user-friendly interfaces.`,
        keyword: `Next matches, order of play, schedule, boxing, tournaments, odds comparison, matched betting, compare box odds, betting lines`
    }

    const esportNextMatches = {
        title: `Next betting football matches | Best soccer odds`,
        description: `Discover the best online football betting odds. Read our top picks and reviews to find trusted platforms with great odds, bonuses, and user-friendly interfaces.`,
        keyword: `Next matches, order of play, schedule, football, soccer, premier league, tournaments, odds comparison, matched betting, compare football odds, betting lines`
    }

    const basketBallNextMatches = {
        title: `Next betting basketball matches | Best basket odds`,
        description: `Discover the best online basketball betting odds. Read our top picks and reviews to find trusted platforms with great odds, bonuses, and user-friendly interfaces.`,
        keyword: `Next matches, order of play, schedule, basketball, tournaments, odds comparison, matched betting, compare basket odds, betting lines`
    }

    const baseballNextMatches = {
        title: `Next betting baseball matches | Best baseballodds`,
        description: `Discover the best online baseball betting odds. Read our top picks and reviews to find trusted platforms with great odds, bonuses, and user-friendly interfaces.`,
        keyword: `Next matches, order of play, schedule, baseball, tournaments, odds comparison, matched betting, compare baseball odds, betting lines`
    }
    const getMetaObj = () => {

        if (location.pathname === "/soccer/next-matches") {
            return soccerNextMatches
        } else if (location.pathname === "/droppingOdds") {
            return droppingOdds
        } else if (location.pathname === "/sure-bets") {
            return sureBets
        } else if (location.pathname === "/bookmakers") {
            return bookMakers
        }else if(location.pathname === "/cricket/next-matches"){
            return cricketNextMatches
        }else if(location.pathname === "/tennis/next-matches"){
            return tennisNextMatches
        }else if(location.pathname === "/boxing/next-matches"){
            return boxingNextMatches
        }else if(location.pathname === "/esports/next-matches"){
            return esportNextMatches
        }else if(location.pathname === "/basketball/next-matches"){
            return basketBallNextMatches
        }else if(location.pathname === "/baseball/next-matches"){
            return baseballNextMatches
        }
         else {
            return ''
        }
    }

    let metaObj = getMetaObj()
    const meta = {
        title: (metaObj.title || ''),
        description: (metaObj.description || ''),

        canonical: window.location.href,
        meta: {
            charset: "utf-8",
            name: {
                keywords: (metaObj.keyword || '')
            },
        },
    }

    const metaTags = [
        { name: "description", content: meta.description },
        { name: "keywords", content: meta.meta.name.keywords },
    ];
    useMetaTags(metaTags, meta.title);

    useEffect(() => {
        getMetaObj()
    }, [location])

    return (
        <>

        </>
    )
}
