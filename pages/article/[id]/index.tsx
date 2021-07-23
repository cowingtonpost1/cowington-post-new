import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { server } from "../../../config";
import {Text} from '@chakra-ui/react'
const article = ({ article }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Text fontSize={80}>{article.title}</Text>
      <div dangerouslySetInnerHTML={{__html: article.content}}></div>
      <br />
      This is article {article.id}
      <Link href="/">Go Back</Link>
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
