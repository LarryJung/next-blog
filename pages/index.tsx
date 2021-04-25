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
  const [headerTransparent, setHeaderTransparent] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY >= 200) {
        setHeaderTransparent(true);
      } else {
        setHeaderTransparent(false);
      }
      if (prevScrollY.current < currentScrollY && goingUp) {
        setGoingUp(false);
      }
      if (prevScrollY.current > currentScrollY && !goingUp) {
        setGoingUp(true);
      }
      prevScrollY.current = currentScrollY;
      console.log(goingUp, currentScrollY, headerTransparent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [goingUp]);

  return (
    <BlogLayout title="Home | Next Blog" headerTransparent={headerTransparent}>
      <ul>
        {posts.map((post) => (
          <Link href={`posts/${post.breadCrumbs.join('/')}`}>
            <Card className={'homeCardList'} key={post.title} size="default" title={post.title}>
              <p>{post.excerpt}</p>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <Meta description={`${post.date}`} style={{ marginBottom: '10px' }} />
                <Meta description={`by ${post.author.name}`} />
              </div>
            </Card>
          </Link>
        ))}
      </ul>
    </BlogLayout>
  );
};

export default IndexPage;
