import * as React from 'react';
import { Tree } from 'antd';
import { MarkdownRemark } from '../types/pageProps';
import { DownOutlined } from '@ant-design/icons';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const slugs = require('github-slugger')();

export const ApiSidebar = ({
  edges,
  setSelectNode,
}: {
  edges: Array<{
    node: MarkdownRemark;
  }>;
  setSelectNode: React.Dispatch<React.SetStateAction<MarkdownRemark | null>>;
}) => {
  return (
    <nav className="sidebar-menu thin-scrollbar">
      {edges.map(({ node }) => {
        // Convert markdown headings to tree data
        const treeData: any[] = [],
          defaultExpandedKeys: string[] = [];
        let h1Node: any, h2Node: any;
        node.headings.forEach((heading) => {
          switch (heading.depth) {
            case 1:
              h1Node = {
                title: heading.value,
                key: heading.value,
                children: [],
              };
              defaultExpandedKeys.push(heading.value);
              treeData.push(h1Node);
              break;
            case 2:
              h2Node = {
                title: heading.value,
                key: heading.value,
                children: [],
              };
              defaultExpandedKeys.push(heading.value);
              if (h1Node) h1Node.children.push(h2Node);
              break;
            case 3: {
              const h3Node = { title: heading.value, key: heading.value };
              if (h2Node) h2Node.children.push(h3Node);
              break;
            }
            default:
              break;
          }
        });
        return (
          <Tree
            key={node.id}
            blockNode
            showLine
            switcherIcon={<DownOutlined />}
            defaultExpandedKeys={defaultExpandedKeys}
            treeData={treeData}
            onSelect={(selectedKeys) => {
              setSelectNode(node);
              const selectedKey = selectedKeys[0]; // 获取选中的key
              window.location.hash = slugs.slug(selectedKey, false);
            }}
          />
        );
      })}
    </nav>
  );
};
