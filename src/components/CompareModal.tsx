import React from 'react'
import { Launch } from '../__generated__/graphql'
import { DateTime } from 'luxon'
import './compareModal.css'

interface compareModalProps {
    compare: Array<Launch>
    options: Array<Launch> | undefined
    setCompare: React.Dispatch<React.SetStateAction<Launch[] | undefined>>
}

function CompareModal({ compare, setCompare, options }: compareModalProps) {
    return (
        <div
            className="modal-wrapper"
            style={{ display: compare?.length ? 'flex' : 'none' }}
        >
            <div className="modal-compare scrollbar-hide">
                <div className="header flex flex-column px-4 py-2 items-center justify-center">
                    <p className="text-5xl text-blue font-bold text-center ml-auto">
                        Compare
                    </p>
                    <p
                        className="ml-auto cursor-pointer"
                        onClick={() => setCompare([])}
                    >
                        ❌
                    </p>
                </div>
                <div className="flex justify-between">
                    <div>
                        <select
                            name="one"
                            value={JSON.stringify(compare[0])}
                            onChange={(e) => {
                                if (compare?.length === 2) {
                                    setCompare([
                                        JSON.parse(e.target.value),
                                        compare[1],
                                    ])
                                } else {
                                    setCompare([JSON.parse(e.target.value)])
                                }
                            }}
                        >
                            {options &&
                                options.map((launch) => {
                                    return (
                                        <option value={JSON.stringify(launch)}>
                                            {launch?.mission_name}
                                        </option>
                                    )
                                })}
                        </select>
                        {compare && compare.length > 0 && (
                            <div className="mt-20">
                                <h2 className="font-bold text-center text-xl">
                                    {compare[0]?.mission_name}
                                </h2>
                                <p className="text-blue text-center text-base mt-4">
                                    {compare[0]?.launch_site?.site_name_long}
                                </p>
                                <p className="text-center test-sm">
                                    {DateTime.fromISO(
                                        compare[0]?.launch_date_local
                                    ).toLocaleString({
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                                <p className="m-4">
                                    Video URL:{' '}
                                    <a
                                        href={
                                            compare[0].links?.video_link || ''
                                        }
                                    >
                                        {compare[0].links?.video_link}
                                    </a>
                                </p>
                                <h2 className="font-bold text-center text-xl">
                                    Ships
                                </h2>
                                {compare[0].ships?.map((ship) => {
                                    return (
                                        <div className="m-4" key={ship?.name}>
                                            <p>Name: {ship?.name}</p>
                                            <p>Home Port: {ship?.home_port}</p>
                                            <img
                                                width={'200px'}
                                                height={'200px'}
                                                src={ship?.image || ''}
                                                alt={ship?.name || ''}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                    <div>
                        <select
                            name="one"
                            value={JSON.stringify(compare[1]) || ''}
                            onChange={(e) => {
                                if (compare?.length) {
                                    setCompare([
                                        compare[0],
                                        JSON.parse(e.target.value),
                                    ])
                                }
                            }}
                        >
                            {options &&
                                options.map((launch) => {
                                    return (
                                        <option value={JSON.stringify(launch)}>
                                            {launch?.mission_name}
                                        </option>
                                    )
                                })}
                        </select>
                        {compare && compare.length > 1 && (
                            <div className="mt-20">
                                <h2 className="font-bold text-center text-xl">
                                    {compare[1]?.mission_name}
                                </h2>
                                <p className="text-blue text-center text-base mt-4">
                                    {compare[1]?.launch_site?.site_name_long}
                                </p>
                                <p className="text-center test-sm">
                                    {DateTime.fromISO(
                                        compare[1]?.launch_date_local
                                    ).toLocaleString({
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                                <p className="m-4">
                                    Video URL:{' '}
                                    <a
                                        href={
                                            compare[1].links?.video_link || ''
                                        }
                                    >
                                        {compare[1].links?.video_link}
                                    </a>
                                </p>
                                <h2 className="font-bold text-center text-xl">
                                    Ships
                                </h2>
                                {compare[1].ships?.map((ship) => {
                                    return (
                                        <div className="m-4" key={ship?.name}>
                                            <p>Name: {ship?.name}</p>
                                            <p>Home Port: {ship?.home_port}</p>
                                            <img
                                                width={'200px'}
                                                height={'200px'}
                                                src={ship?.image || ''}
                                                alt={ship?.name || ''}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompareModal
