import React, { useState, useEffect, useRef } from 'react';
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
  const prevScrollY = useRef<number>(0);
  const [goingUp, setGoingUp] = useState<boolean>(false);
  const [fixed, setFixed] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current >= 350) {
        setFixed(false);
      } else {
        setFixed(true);
      }
      if (prevScrollY.current < currentScrollY && goingUp) {
        setGoingUp(false);
      }
      if (prevScrollY.current > currentScrollY && !goingUp) {
        setGoingUp(true);
      }
      prevScrollY.current = currentScrollY;
      console.log(goingUp, currentScrollY, fixed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [goingUp]);

  return (
    <BlogLayout title="Home | Next Blog" fixed={fixed} hero={true}>
      <ul>
        {posts.map((post) => (
          <Card
            className={'homeCardList'}
            key={post.title}
            size="default"
            title={post.title}
            extra={
              <Link href={`posts/${post.breadCrumbs.join('/')}`}>
                <a>Read More...</a>
              </Link>
            }
            style={{
              marginBottom: '30px',
              borderStyle: 'solid',
              borderColor: 'lightsteelblue',
              boxShadow: '3px 3px 3px gray',
            }}
          >
            <p>{post.excerpt}</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <Meta description={`${post.date}`} style={{ marginBottom: '10px' }} />
              <Meta description={`by ${post.author.name}`} />
            </div>
          </Card>
        ))}
      </ul>
    </BlogLayout>
  );
};

export default IndexPage;
