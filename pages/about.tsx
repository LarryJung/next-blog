import Layout from '../components/Layout';
import ReactMarkdown from 'react-markdown';
import content from '@/assets/about.md';

const AboutPage = () => (
  <Layout title="About" breadCrumbs={['About']}>
    <ReactMarkdown children={content} />
  </Layout>
);

export default AboutPage;
