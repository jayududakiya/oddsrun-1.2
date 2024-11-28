import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import useMetaTags from '../hooks/useMetaTags';
export default function ManullyTags() {


    const location = useLocation()

    const soccerNextMatches = {
        title: `Next matches betting odds in football, tennis, basketball – order of play, schedule`,
        description: `Discover all next matches betting odds and compare lines - football, tennis, basketball – order of play, schedule`,
        keyword: `Next matches, order of play, schedule, football, soccer, tennis, basketball, leagues, tournaments, odds comparison, matched betting, compare sport odds, betting lines`,
    }
    const droppingOdds = {
        title: `Track Betting Odds Movements | Comparison and Dropping odds`,
        description: `Monitor live betting odds changes with our advanced tracker. Stay informed and makes smarter bets with comparison real-time updates. Perfect dropping odds`,
        keyword: `dropping odds, arbitrage sports odds, comparison football odds, odds tracker, odds movement, compare betting`
    }

    const sureBets = {
        title: `Sports Arbitrage Betting Guide | Maximize Your Betting Profits`,
        description: `Learn how to profit from sports arbitrage betting with our comprehensive guide. Get tips, strategies, sure bets and real-time updates to make risk-free bets across various sports.`,
        keyword: `arbitrage sports odds, sure bets, best odds, best betting odds`
    }

    const bookMakers = {
        title: `Best Betting Bookmakers | Top-Rated Sites & Reviews`,
        description: `Find the best betting bookmakers with our expert reviews. Discover top-rated sites offering great odds, bonuses, and user-friendly interfaces for all your betting needs.`,
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
