import React, { useEffect, useState } from 'react';
import BlogLayout from '@/components/Layout';
import { wrapProps } from '../../utils/propsUtils';
import { useRouter, withRouter } from 'next/router';
import { GetStaticPaths } from 'next';
import { getPostByPath, getAllPosts } from '@/lib/api';
import markdownToHtml from '../../../lib/markdownToHtml';
export const getStaticProps = async ({ params }) => {
  const post = getPostByPath(params.slug, ['title', 'date', 'author', 'content']);
  const content = await markdownToHtml(post.content || '');
  return {
    props: {
      ...post,
      content,
    },
  };
};

export const getStaticPaths = async () => {
  const posts = getAllPosts(['slug']);
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
    <BlogLayout title={title} breadCrumbs={breadCrumbs}>
      <h1>{title}</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          margin: '15px 0 15px 0',
        }}
      >
        <div style={{ fontSize: '18px' }}>{date}</div>
        <div style={{ fontSize: '18px' }}>{author.name}</div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </BlogLayout>
  );
};

export default PostPage;
