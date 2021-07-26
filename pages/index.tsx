import NewTopicCard4 from '../Components/NewTopicCard4'
import { Grid, Box, GridItem, Flex, Spacer } from '@chakra-ui/react'

const minimumWidth = "19rem"
const maximumWidth = "19rem"

export default function Home() {
    return (
        <Flex gap={2} justify="flex-start" allign="center" wrap='wrap'>
            {/* <ArticleList articles={articles} /> */}
            {/* <TopicCard Topic={{title: "Cow news", image: "/cowimg.png", button_text: "CLICK HERE FOR COW NEWS", href:"/topic/cow"}} /> */}
            {/* <NewTopicCard title="Cow news" image="/cowimg.png" /> */}
            {/* <NewTopicCard2 title="Cow news" image="/cowimg.png" /> */}
            {/* <NewTopicCard3 title="Cow news" image="/cowimg.png" /> */}
            <Box p={2} minWidth={minimumWidth} maxWidth={maximumWidth} marginBottom={'2rem'}>
                <NewTopicCard4
                    title="Cow news"
                    image="/cowimg.png"
                    href="/topic/cow"
                />
            </Box>
            <Box p={2} minWidth={minimumWidth} maxWidth={maximumWidth}>
            <NewTopicCard4
                title="Computer news"
                image="/cowimg.png"
                href="/topic/computer"
            />
            </Box>
        </Flex>
    )
}
// export const getServerSideProps = async () => {
//   const res = await fetch(server + `/api/articles`);
//   const articles = await res.json();
//   return {
//     props: {
//       articles
//     }
//   };
// };
