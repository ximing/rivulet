import React from 'react';
import { Tree } from 'antd';
import { MarkdownRemark } from '../types/pageProps';
import { DownOutlined } from '@ant-design/icons';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const slugs = require('github-slugger')();

interface TreeNode {
  title: string;
  key: string;
  children?: TreeNode[];
  node: any;
}

function buildTwoLevelTree(node: MarkdownRemark): {
  treeData: TreeNode;
  defaultExpandedKeys: string[];
} {
  const sortedTitles = [...node.headings].sort((a, b) => a.depth - b.depth);

  const firstLevel = sortedTitles[0];
  const secondLevelIndex = sortedTitles.findIndex(
    (title) => title.depth !== firstLevel.depth
  );
  const secondLevel =
    secondLevelIndex !== -1 ? sortedTitles[secondLevelIndex] : null;

  node.headings.forEach((item) => {
    item.depth;
  });

  const treeData: any[] = [],
    defaultExpandedKeys: string[] = [];
  let h1Node: any, h2Node: any;
  node.headings.forEach((heading) => {
    switch (heading.depth) {
      case firstLevel?.depth:
        h1Node = {
          title: heading.value,
          key: `${node.id}$$$${heading.value}`,
          children: [],
          node,
        };
        defaultExpandedKeys.push(heading.value);
        treeData.push(h1Node);
        break;
      case secondLevel?.depth:
        h2Node = {
          title: heading.value,
          key: `${node.id}$$$${heading.value}`,
          node,
        };
        defaultExpandedKeys.push(heading.value);
        if (h1Node) h1Node.children.push(h2Node);
        break;
      default:
        break;
    }
  });

  return {
    treeData: {
      title: node.fields.title,
      key: `$$$${node.id}`,
      children:
        treeData.length === 1 ? treeData[0].children || treeData[0] : treeData,
      node,
    },
    defaultExpandedKeys:
      node.frontmatter.expanded === false ? [] : defaultExpandedKeys,
  };
}

interface GuideComponentProps {
  edges: Array<{
    node: MarkdownRemark;
  }>;
  setSelectNode: React.Dispatch<React.SetStateAction<MarkdownRemark | null>>;
}

export const GuideComponent: React.FC<GuideComponentProps> = ({
  edges,
  setSelectNode,
}) => {
  const __treeData: any[] = [],
    __defaultExpandedKeys: string[] = [];
  edges.map(({ node }) => {
    const { treeData, defaultExpandedKeys } = buildTwoLevelTree(node);
    __treeData.push(treeData);
    __defaultExpandedKeys.push(...defaultExpandedKeys);
  });
  return (
    <nav className="sidebar-menu thin-scrollbar">
      <Tree
        treeData={__treeData}
        blockNode
        showLine
        switcherIcon={<DownOutlined />}
        defaultExpandedKeys={__defaultExpandedKeys}
        onSelect={(selectedKeys, info) => {
          console.log(selectedKeys, info);
          setSelectNode(info.node.node);
          // const selectedKey = selectedKeys[0]; // 获取选中的key
          window.location.hash = slugs.slug(info.node.title, false);
        }}
      />
    </nav>
  );
};
