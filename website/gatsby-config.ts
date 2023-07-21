import type { GatsbyConfig } from 'gatsby';
import * as path from 'path';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Rivulet`,
    description: `Rivulet`,
    siteUrl: `https://rivulet.sankuai.com/wiki`,
    author: 'Rivulet',
  },
  pathPrefix: '/rivulet', // 设置公共前缀
  flags: {
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PRESERVE_WEBPACK_CACHE: true,
    PREFIX_PATHS: true,
  },
  proxy: [
    {
      prefix: '/open',
      url: 'https://www.ximing.ren',
    },
    {
      prefix: '/content',
      url: 'https://www.ximing.ren',
    },
  ],
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-pnpm`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/contents/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, '../packages/utils/docs'),
        name: `utils`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, '../packages/event'),
        name: `rivulet-event`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, '../packages/stream'),
        name: `rivulet-stream`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `100`,
              icon: `<svg t="1685947446267" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4780" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><path d="M282.453333 676.693333m-181.333333 0a181.333333 181.333333 0 1 0 362.666667 0 181.333333 181.333333 0 1 0-362.666667 0Z" fill="#FFCA5F" p-id="4781"></path><path d="M570.453333 111.36m-42.666666 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z" fill="#FFCA5F" p-id="4782"></path><path d="M388.053333 866.346667A208 208 0 0 1 241.066667 512l106.666666-106.666667 45.226667 45.226667-106.666667 106.666667A144 144 0 1 0 490.666667 760.32l107.733333-106.666667 45.226667 45.226667-107.733334 106.666667a207.146667 207.146667 0 0 1-147.84 60.8zM723.413333 617.173333l-45.226666-45.226666 100.906666-100.906667A144 144 0 1 0 576 267.52l-100.906667 100.906667-45.226666-45.44 100.906666-100.906667A208 208 0 0 1 824.32 516.266667z" fill="#5C1CF7" p-id="4783"></path><path d="M442.794667 558.506667l134.570666-134.549334 45.248 45.269334-134.549333 134.549333z" fill="#5C1CF7" p-id="4784"></path></svg>`,
              className: `custom-class`,
              maintainCase: false,
              removeAccents: true,
              isIconAfterHeader: true,
              elements: [`h1`, `h2`, `h3`, `h4`, `h5`],
            },
          },
          {
            resolve: `gatsby-remark-plantuml-lite`,
            options: {
              // Configuration options
              imageType: `svg`,
              // Customize PlantUML server 服务部署在 rivulet ai master
              server: `http://10.196.200.185:8416`,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: false,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-emoji`,
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`,
              output: `html`,
            },
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'zh-Hans',
      },
    },
    {
      resolve: `gatsby-plugin-less`,
      options: {
        modifyVars: {},
      },
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: `rivulet`,
        short_name: `rivulet`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `assets/logo.png`,
      },
    },
    'gatsby-plugin-mdx',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
  ],
};

export default config;
