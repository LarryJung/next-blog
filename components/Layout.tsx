import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

type Props = {
  children?: ReactNode;
  title?: string;
  breadCrumbs?: string[];
  fixed?: boolean;
  hero?: boolean;
};

const BlogLayout = ({
  children,
  title = 'the next blog',
  breadCrumbs,
  fixed = true,
  hero = false,
}: Props) => {
  // const headerStyle: string = hero ? '' : 'fixed';
  const headerStyle = {
    position: '',
    zIndex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    margin: '',
    backgroundColor: '',
    borderBottom: '',
    opacity: 1,
    boxShadow: '',
  };
  !fixed && (headerStyle.position = 'fixed');
  !fixed && (headerStyle.backgroundColor = 'white');
  fixed && (headerStyle.backgroundColor = '');
  // !fixed && (headerStyle.borderBottom = '1px solid');
  // fixed && (headerStyle.borderBottom = '');
  fixed && (headerStyle.opacity = 1);
  !fixed && (headerStyle.opacity = 0.8);
  fixed && (headerStyle.boxShadow = '');
  !fixed && (headerStyle.boxShadow = '0 1px 40px 1px gray');
  // !hero && (headerStyle.margin = '0 0 64px 0');

  const contentStyle = {
    marginTop: 0,
  };
  !fixed && (contentStyle.marginTop = 64);

  const headerFont = { color: 'black', fontSize: '20px', minWidth: '30px' };
  !fixed && (headerFont.color = 'black');
  fixed && (headerFont.color = 'white');
  const menuTheme = fixed ? 'dark' : 'light';
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        {hero && (
          <div
            className="indexHero"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* <div
              style={{
                fontFamily: 'sans-serif',
                fontSize: '40px',
                color: 'lightyellow',
                padding: '0 15px 0 15px',
              }}
            >
              Everybody have a Good Day :)
            </div> */}
          </div>
        )}
        <Header className="indexFixedHeader" style={headerStyle as React.CSSProperties}>
          <span className="logo" style={headerFont}>
            Chaesun blog
          </span>

          <Menu theme={menuTheme} mode="horizontal" defaultOpenKeys={['1', '2']}>
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
            {/* <Menu.Item key="3">
            <Link href="/users">
              <a>Users List</a>
            </Link>
          </Menu.Item> */}
          </Menu>
        </Header>
        <Content className="site-layout" style={contentStyle}>
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
          <span>Copyright by Chaesun</span>
          <hr />
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
};

export default BlogLayout;
