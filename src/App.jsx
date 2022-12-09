import React from 'react'
import './App.css'
import { useQuery } from '@apollo/client'
import { Header } from './components'
import { GET_PAST_LAUNCHES } from './queries'

function App() {
    const { loading, data, fetchMore } = useQuery(GET_PAST_LAUNCHES, {
        variables: {
            offset: 0,
            limit: 10,
        },
    })

    return (
        <div className="App">
            <Header />
        </div>
    )
}

export default App
