import { gql } from '../__generated__/gql'

export const GET_PAST_LAUNCHES = gql(`
    query LaunchesPast($limit: Int, $offset: Int, $missionName: String) {
        launchesPast(limit: $limit, offset: $offset, find: {mission_name: $missionName}) {
            mission_name
            launch_date_local
            launch_site {
                site_name_long
            }
            links {
                article_link
                video_link
            }
            rocket {
                rocket_name
                rocket_type
            }
            ships {
                name
                home_port
                image
            }
        }
    }
`)
