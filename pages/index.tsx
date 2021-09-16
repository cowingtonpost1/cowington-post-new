import NewTopicCard4 from '../Components/NewTopicCard4'
import {
    Grid,
    Box,
    GridItem,
    Flex,
    Spacer,
    forwardRef,
    BoxProps,
} from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'
const minimumWidth = '19rem'
const maximumWidth = '19rem'

const MotionBox = motion<BoxProps>(Box)

export default function Home() {
    return (
        <Flex gap={2} justify="flex-start" allign="center" wrap="wrap">
            {/* <ArticleList articles={articles} /> */}
            {/* <TopicCard Topic={{title: "Cow news", image: "/cowimg.png", button_text: "CLICK HERE FOR COW NEWS", href:"/topic/cow"}} /> */}
            {/* <NewTopicCard title="Cow news" image="/cowimg.png" /> */}
            {/* <NewTopicCard2 title="Cow news" image="/cowimg.png" /> */}
            {/* <NewTopicCard3 title="Cow news" image="/cowimg.png" /> */}
            <MotionBox
                whileHover={{ scale: 1.1, cursor: 'pointer' }}
                initial={{ scale: 1 }}
                p={2}
                minWidth={minimumWidth}
                maxWidth={maximumWidth}
                whileTap={{scale: 0.9}}
                marginBottom={'2rem'}
            >
                <NewTopicCard4
                    title="Cow News"
                    image="/cowimg.png"
                    href="/topic/cow"
                />
            </MotionBox>
            <MotionBox
                p={2}
                minWidth={minimumWidth}
                maxWidth={maximumWidth}
                whileHover={{ scale: 1.1, cursor: 'pointer' }}
                whileTap={{scale: 0.9}}
                initial={{ scale: 1 }}
            >
                <NewTopicCard4
                    title="Computer News"
                    image="/computerimg.jpg"
                    href="/topic/computer"
                />
            </MotionBox>
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
