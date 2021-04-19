import Layout from '../components/Layout';
import ReactMarkdown from 'react-markdown';
// import content from '../assets/about.md';

// declare module '*.md';

const AboutPage = () => (
  <Layout title="About" breadCrumbs={['About']}>
    <ReactMarkdown children="# i am developer" />
  </Layout>
);

export default AboutPage;
