import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { server } from "../../../config";
import {Heading, Text} from '@chakra-ui/react'
const article = ({ article }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Heading>{article.title}</Heading>
      <Text>Posted at {article.date_posted}</Text>
      <br></br>
      <div dangerouslySetInnerHTML={{__html: article.content}}></div>
      <br />
      <Link href={"/topic/"+article.topic}>Go Back</Link>
    </>
  );
};
export const getServerSideProps = async context => {
  const res = await fetch(server + `/api/article/${context.params.id}`);
  const article = await res.json();
  return {
    props: {
      article
    }
  };
};
export default article;
