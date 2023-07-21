import * as React from 'react';
import type { PageProps } from 'gatsby';
import { Button } from 'antd';
import Layout from '../components/layout';

const BlogPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Button type="primary">134</Button>
      123
    </Layout>
  );
};

export default BlogPage;
