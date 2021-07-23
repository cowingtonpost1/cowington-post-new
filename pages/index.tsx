import Image from "next/image";
import ArticleList from "../Components/ArticleList";
import TopicCard from "../Components/TopicCard";
import NewTopicCard from '../Components/NewTopicCard'
import NewTopicCard2 from '../Components/NewTopicCard2'
import NewTopicCard3 from '../Components/NewTopicCard3'
import NewTopicCard4 from '../Components/NewTopicCard4'

export default function Home() {
  return (
    <div>
      {/* <ArticleList articles={articles} /> */}
      <TopicCard Topic={{title: "Cow news", image: "/cowimg.png", button_text: "CLICK HERE FOR COW NEWS", href:"/topic/cow"}} />
      <NewTopicCard title="Cow news" image="/cowimg.png" />
      <NewTopicCard2 title="Cow news" image="/cowimg.png" />
      <NewTopicCard3 title="Cow news" image="/cowimg.png" />
      <NewTopicCard4 title="Cow news" image="/cowimg.png" href='/topic/cow' />
    </div>
  );
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
