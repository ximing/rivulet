import { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import path from 'path';

interface MarkdownRemarkNode {
  internal: {
    content: string;
    type: string;
  };
  html: string;
  frontmatter?: {
    title?: string;
    order?: number;
    [key: string]: any; // 这允许 frontmatter 有其他你尚未定义的字段
  };
  fileAbsolutePath?: string;
}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField, createNode } = actions;
  //@ts-ignore
  const markdownNode = node as MarkdownRemarkNode;

  if (markdownNode.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
    // 处理 order 字段
    const orderValue =
      node.frontmatter && markdownNode.frontmatter!.order
        ? markdownNode.frontmatter!.order
        : 999999;
    createNodeField({
      node,
      name: 'order',
      value: orderValue,
    });

    // 处理 title 字段
    let titleValue = markdownNode.frontmatter?.title;

    if (!titleValue) {
      const content = markdownNode.internal.content;
      const h1Match = content.match(/^#\s(.+)$/m); // 查找第一个 H1
      if (h1Match && h1Match[1]) {
        titleValue = h1Match[1];
      } else if (markdownNode.fileAbsolutePath) {
        titleValue = path.basename(
          markdownNode.fileAbsolutePath,
          path.extname(markdownNode.fileAbsolutePath)
        ); // 文件名作为默认值
      }
    }

    createNodeField({
      node,
      name: 'title',
      value: titleValue,
    });
  }
};
