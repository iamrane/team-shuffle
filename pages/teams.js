import Head from 'next/head'
import Teams from '../components/Teams';

export default function TeamsPage() {
    return (
        <>
            <Head>
                <title>Dela lag - Teams</title>
                <meta name="description" content="Shuffle the team" />
            </Head>
            <Teams />
        </>
    )
}
