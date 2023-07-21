import '../styles/main.less';
import React from 'react';
import Header from './header';
import { Helmet } from 'react-helmet';

class Layout extends React.Component<{
  title?: string;
  children: any;
}> {
  render() {
    const { title, children } = this.props;
    return (
      <div className="rivulet-layout">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title || '文档站'}</title>
        </Helmet>
        <Header />
        {children}
        {/* <footer>
          <div>
            © {new Date().getFullYear()}
            {` `}
            <a
              href="https://www.zhihu.com/people/xi-ming-52/activities"
              rel="external nofollow noopener noreferrer"
              target="_blank"
            >
              zhihu
            </a>{' '}
            | {` `}
            <a
              href="https://github.com/ximing"
              rel="external nofollow noopener noreferrer"
              target="_blank"
            >
              github
            </a>{' '}
            | {` `}
            <a
              href="https://dev.to/ximing"
              rel="external nofollow noopener noreferrer"
              target="_blank"
            >
              dev
            </a>{' '}
            | {` `}
            <a
              href="https://www.codewars.com/users/ximing"
              rel="external nofollow noopener noreferrer"
              target="_blank"
            >
              codewars
            </a>
          </div>
          <a href="/rss.xml" target="_blank">
            rss
          </a>
        </footer> */}
      </div>
    );
  }
}

export default Layout;
