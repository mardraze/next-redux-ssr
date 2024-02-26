import { GetServerSideProps } from "next"
import { RootState } from "./store"

export const getGlobalServerSideProps = (async () => {
    const preloadedState = {
        me:{
            user: {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                nick: 'john' 
            }
        }
    }
    return { props: {preloadedState} }
}) satisfies GetServerSideProps<{preloadedState: RootState }>
