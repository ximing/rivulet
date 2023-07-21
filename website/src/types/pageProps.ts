import { PageProps } from 'gatsby';

export interface Header {
  id: string;
  value: string;
  depth: number;
}

export interface MarkdownRemark {
  id: string;
  frontmatter: {
    title: string;
    date: string;
    tags: string[];
    published: boolean;
    expanded: boolean;
  };
  fields: {
    title: string;
  };
  wordCount: {
    words: number;
    sentences: number;
    paragraphs: number;
  };
  timeToRead: number;
  headings: Header[];
  html: string;
}

interface QueryResult {
  api: {
    edges: Array<{
      node: MarkdownRemark;
    }>;
  };
  guide: {
    edges: Array<{
      node: MarkdownRemark;
    }>;
  };
}

export type APIPageProps = PageProps<
  QueryResult & {
    avatar: any;
    site: any;
  }
>;
