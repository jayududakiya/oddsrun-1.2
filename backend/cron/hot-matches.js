module.exports = {
    start: async () => {

        try {

            const finalOddsMathesForTheDay = []

            const today = moment()
            const condition = {
                date: {
                    $in: [today.format('YYYYMMDD'), today.add(1, 'day').clone().format('YYYYMMDD')]
                },
                sport: {
                    $in: ["basketball", "soccer", "football", "tennis"],
                },
                'matchDetails.match.event-stage-name': 'Scheduled'
            }

            try {

                const aggregate = [
                    {
                        $match: condition,
                    },
                    {
                        $group: {
                            _id: '$match',
                            market: { $last: "$market" },
                            odds: { $last: "$odds" },
                            pastDate: { $first: "$date" },
                            date: { $last: "$date" },
                            matches: { $last: "$matchDetails" }
                        }
                    },
                    {
                        $sort: {
                            date: -1
                        }
                    },
                    {
                        $limit: 20,
                    },
                ];

                const matches = await _MachOdds.aggregate(aggregate);

                if (matches) {
                    matches.map(m => {

                        const sport = m._id.split('/')[1]

                        finalOddsMathesForTheDay.push({
                            date: m.date,
                            sport: sport,
                            matches: m.matches
                        })
                    })
                }


                await _HotMatches.insertMany(finalOddsMathesForTheDay)


            } catch (error) {
                console.log('error', error)
            }


            // Remove OLD Matches Data
            try {

                const removeCondition = {
                    date: {
                        $nin: [today.format('YYYYMMDD'), today.add(1, 'day').clone().format('YYYYMMDD')]
                    },
                    'matches.match.event-stage-name': {
                        $ne: 'Scheduled'
                    }
                }

                _HotMatches.deleteMany(removeCondition);


            } catch (e) {

                console.log('Error while delete', e)

            }



        } catch (error) {
            console.log('Error', error)
        }

    }
}