import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Layout, Menu, Breadcrumb } from 'antd';
import classNames from 'classnames';
const { Header, Content, Footer } = Layout;

type Props = {
  children?: ReactNode;
  title?: string;
  breadCrumbs?: string[];
  headerTransparent?: boolean;
};

const BlogLayout = ({
  children,
  title = 'the next blog',
  breadCrumbs,
  headerTransparent = true,
}: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout className="mainLayout">
        <Header
          className={classNames('indexFixedHeader', {
            transparent: headerTransparent,
          })}
        >
          <span
            className={classNames('logo', {
              black: headerTransparent,
              white: !headerTransparent,
            })}
          >
            Chaesun blog
          </span>
          <div></div>
          <Menu
            theme={headerTransparent ? 'light' : 'dark'}
            mode="horizontal"
            defaultOpenKeys={['1', '2']}
          >
            <Menu.Item key="1">
              <Link href="/">
                <a style={{ fontFamily: 'inherit', fontSize: '15px' }}>Home</a>
              </Link>{' '}
            </Menu.Item>
            <Menu.Item key="2">
              <Link href="/about">
                <a style={{ fontFamily: 'inherit', fontSize: '15px' }}>About</a>
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content className="layoutContent">
          <div className="breadCrumb">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </Breadcrumb.Item>
              {!!breadCrumbs &&
                breadCrumbs.map((b) => <Breadcrumb.Item key={b}>{b}</Breadcrumb.Item>)}
            </Breadcrumb>
          </div>
          <div
            className="site-layout-background"
            style={{
              padding: '0 20px 0 20px',
              minHeight: 1500,
              maxWidth: '950px',
              margin: '24px auto 0 auto',
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <hr />
          <span>Copyright by Chaesun</span>
          <hr />
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
};

export default BlogLayout;
