import React from 'react';
import BlogLayout from '@/components/Layout';
import { getPostByPath, getAllPosts } from '@/lib/api';
import markdownToHtml from '../../../lib/markdownToHtml';
import { FullPost } from '../../../interfaces/index';
// import { GetStaticPaths } from 'next';
import Parser from 'html-react-parser';
import Head from 'next/head';

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const post = getPostByPath(context.query.slug, [
//     'title',
//     'date',
//     'author',
//     'content',
//   ]) as FullPost;
//   const content = await markdownToHtml(post.content || '');
//   return {
//     props: {
//       ...post,
//       content,
//     },
//   };
// };

export const getStaticProps = async ({ params }: { params: { slug: string[] } }) => {
  const post = getPostByPath(params.slug, ['title', 'date', 'author', 'content']) as FullPost;
  const content = await markdownToHtml(post.content || '');
  return {
    props: {
      ...post,
      content,
    },
  };
};

export const getStaticPaths = async () => {
  const posts: { breadCrumbs: string[] }[] = getAllPosts(['slug']);
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.breadCrumbs,
        },
      };
    }),
    fallback: false,
  };
};

interface Props {
  title: string;
  date: string;
  author: Author;
  content: string;
  breadCrumbs: string[];
}
interface Author {
  name: string;
  picture: string;
}
const PostPage = ({ title, date, author, content, breadCrumbs }: Props) => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/styles/agate.min.css"
        />
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/highlight.min.js"></script>
        <script>hljs.highlightAll();</script>
      </Head>
      <BlogLayout title={title} breadCrumbs={breadCrumbs} hero={false} fixed={false}>
        <h1 style={{ fontSize: '35px' }}>{title}</h1>
        <hr />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            margin: '15px 0 15px 0',
          }}
        >
          <div style={{ fontSize: '18px' }}>{date}</div>
          <div style={{ fontSize: '18px' }}>by {author.name}</div>
        </div>
        <div className="markdown-body">{Parser(content)}</div>
      </BlogLayout>
    </>
  );
};

export default PostPage;
