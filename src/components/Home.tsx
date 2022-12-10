import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { DateTime } from 'luxon'
import { GET_PAST_LAUNCHES } from '../queries'
import './home.css'
import { Launch } from '../__generated__/graphql'
import CompareModal from './CompareModal'
import Loader from './Loader'

const Home = () => {
    const LIMIT = 10
    const { loading, data, fetchMore } = useQuery(GET_PAST_LAUNCHES, {
        notifyOnNetworkStatusChange: true,
        variables: {
            offset: 0,
            limit: LIMIT,
        },
    })
    const [compare, setCompare] = useState<Array<Launch>>()

    const updateQuery = (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
            return previousResult
        }

        const previousEdges = previousResult.launchesPast
        const fetchMoreEdges = fetchMoreResult.launchesPast

        fetchMoreResult.launchesPast = [...previousEdges, ...fetchMoreEdges]

        return { ...fetchMoreResult }
    }

    const handleLodMore = () => {
        if (data && data.launchesPast && !loading) {
            fetchMore({
                updateQuery,
                variables: {
                    offset: data.launchesPast.length,
                    limit: LIMIT,
                },
            })
        }
    }

    const handleLearnMore = (launchData: Launch) => {
        setCompare([launchData])
    }

    return (
        <div className="home scrollbar-hide">
            <h1 className="text-5xl text-blue mt-5 mb-20 font-bold text-center">
                SpaceX Past Launches
            </h1>
            <div className="flex flex-wrap gap-10 justify-center">
                {data &&
                    data.launchesPast &&
                    data.launchesPast.map((launch) => {
                        if (launch) {
                            return (
                                <div
                                    key={`${DateTime.fromISO(
                                        launch?.launch_date_local
                                    ).toUnixInteger()}${launch?.mission_name}`}
                                    className="card bg-cardGrey"
                                >
                                    <h2 className="font-bold text-center text-xl">
                                        {launch?.mission_name}
                                    </h2>
                                    <p className="text-blue text-center text-base mt-4">
                                        {launch?.launch_site?.site_name_long}
                                    </p>
                                    <p className="text-center test-sm">
                                        {DateTime.fromISO(
                                            launch?.launch_date_local
                                        ).toLocaleString({
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>

                                    <video
                                        className="mt-8 mb-8 w-full"
                                        src={launch.links?.video_link || ''}
                                        muted
                                        controls
                                    />
                                    <button
                                        onClick={() => handleLearnMore(launch)}
                                        className="rounded-full bg-btnBlue px-8 py-2 mx-auto "
                                    >
                                        Learn More
                                    </button>
                                </div>
                            )
                        }
                    })}
            </div>
            {!loading && (
                <button
                    className="rounded-full bg-btnBlue px-8 py-2 mt-20 "
                    onClick={() => handleLodMore()}
                >
                    Load more
                </button>
            )}
            {data && data.launchesPast && Boolean(compare?.length) && (
                <CompareModal
                    compare={compare as Array<Launch>}
                    setCompare={setCompare}
                    options={data.launchesPast as Array<Launch>}
                />
            )}
            {loading && <Loader />}
        </div>
    )
}

export default Home
