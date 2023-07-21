import * as React from 'react';
import { graphql, Link } from 'gatsby';
import { Empty, Radio, RadioChangeEvent } from 'antd';
import Image from 'gatsby-image';
import Layout from '../components/layout';
import { APIPageProps, MarkdownRemark } from '../types/pageProps';
import { ApiSidebar } from '../components/apiSidebar';
import { GuideComponent } from '../components/guideSidebar';
import { RenderDoc } from '../components/renderDoc';

const BrookPage: React.FC<APIPageProps> = ({ data }) => {
  const apis = data.api.edges;
  const guides = data.guide.edges;
  const [selectTab, setSelectTab] = React.useState('guide');
  const [selectNode, setSelectNode] = React.useState<MarkdownRemark | null>(
    //@ts-ignore
    data[selectTab]?.edges?.[0]?.node
  );
  const { author } = data.site.siteMetadata;
  const onChange = (e: RadioChangeEvent) => {
    console.log(`radio checked:${e.target.value}`);
    setSelectTab(e.target.value);
    //@ts-ignore
    setSelectNode(data[e.target.value]?.edges?.[0]?.node);
  };
  return (
    <Layout>
      <div className="doc-content">
        <div className="doc-sidebar">
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
              marginRight: 20,
            }}
            className="sidebarLogo"
            to={`/`}
          >
            <Image
              style={{
                width: 32,
                height: 32,
                marginBottom: 0,
                marginRight: '0.5rem',
                maxWidth: 32,
                maxHeight: 32,
                borderRadius: `100%`,
              }}
              imgStyle={{
                borderRadius: `50%`,
              }}
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
            />
            <b>{author}</b>
          </Link>
          <Radio.Group
            onChange={onChange}
            value={selectTab}
            style={{ width: '100%' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Radio.Button
                value="guide"
                style={{ width: '50%', textAlign: 'center' }}
              >
                指南
              </Radio.Button>
              <Radio.Button
                value="api"
                style={{ width: '50%', textAlign: 'center' }}
              >
                API
              </Radio.Button>
            </div>
          </Radio.Group>
          {selectTab === 'guide' ? (
            <GuideComponent edges={guides} setSelectNode={setSelectNode} />
          ) : (
            <ApiSidebar edges={apis} setSelectNode={setSelectNode} />
          )}
        </div>
        <div className="doc-main">
          {selectNode ? <RenderDoc html={selectNode.html} /> : <Empty />}
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query MyQuery {
    avatar: file(absolutePath: { regex: "/logo.png/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
      }
    }
    api: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/brook/docs/api/" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            tags
            published
          }
          id
          wordCount {
            words
            sentences
            paragraphs
          }
          timeToRead
          headings {
            id
            value
            depth
          }
          html
        }
      }
    }
    guide: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/brook/docs/guide/" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            tags
            published
            expanded
          }
          id
          fields {
            title
          }
          wordCount {
            words
            sentences
            paragraphs
          }
          timeToRead
          headings {
            id
            value
            depth
          }
          html
        }
      }
    }
  }
`;

export default BrookPage;
