import React from 'react';
import BlogLayout from '../components/Layout';
import { getAllPosts } from '../lib/api';
import { MiniPost } from '../interfaces/index';
import { wrapProps } from '../utils/propsUtils';
import { Card } from 'antd';
import Link from 'next/link';
const { Meta } = Card;

export const getStaticProps = async () => {
  const allPosts: MiniPost[] = getAllPosts(['title', 'date', 'author', 'excerpt']).map((p: any) => {
    const post = {
      title: p.title,
      date: p.date,
      author: p.author,
      excerpt: p.excerpt,
      breadCrumbs: p.breadCrumbs,
    };
    return post;
  });

  return wrapProps({
    posts: allPosts,
  });
};

interface Props {
  posts: MiniPost[];
}

const IndexPage = ({ posts }: Props) => {
  return (
    <BlogLayout title="Home | Next Blog">
      <ul>
        {posts.map((post) => (
          <Card
            key={post.title}
            size="default"
            title={post.title}
            extra={
              <Link href={`posts/${post.breadCrumbs.join('/')}`}>
                <a>Read More...</a>
              </Link>
            }
            style={{ marginBottom: '30px' }}
          >
            <p style={{ fontSize: '13px' }}>{post.date}</p>
            <p>{post.excerpt}</p>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Meta description={post.author.name} />
            </div>
          </Card>
        ))}
      </ul>
    </BlogLayout>
  );
};

export default IndexPage;
