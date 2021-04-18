import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

type Props = {
  children?: ReactNode;
  title?: string;
  breadCrumbs?: string[];
};

const BlogLayout = ({ children, title = 'the next blog', breadCrumbs }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Layout>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <div className="logo"></div>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <Link href="/">
              <a style={{ fontWeight: 'bold', fontSize: '20px' }}>Home</a>
            </Link>{' '}
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/about">
              <a style={{ fontWeight: 'bold', fontSize: '20px' }}>About</a>
            </Link>
          </Menu.Item>
          {/* <Menu.Item key="3">
            <Link href="/users">
              <a>Users List</a>
            </Link>
          </Menu.Item> */}
        </Menu>
      </Header>
      <Content className="site-layout" style={{ marginTop: 64 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '35px auto 0 auto',
            padding: '0 20px 0 20px',
            alignItems: 'flex-end',
            maxWidth: '1000px',
          }}
        >
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
        <span>Copyright by ll</span>
        <hr />
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  </>
);

export default BlogLayout;
