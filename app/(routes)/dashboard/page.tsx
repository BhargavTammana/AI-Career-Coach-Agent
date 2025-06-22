import React from 'react'
import WelcomeBanner from './_components/WelcomeBanner'
import AiTools from './_components/AiTools'
import PreviousHistory from './_components/PreviousHistory'
function Dashboard() {
    return (
        <div>
            <WelcomeBanner />
            <AiTools />
            <PreviousHistory/>
        </div>
        
    )
}

export default Dashboard