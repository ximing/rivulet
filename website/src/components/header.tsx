import React, { useState, useEffect, useRef } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import { clsx } from 'clsx';
import { throttle } from 'lodash';

function Header() {
  const [isNavBarVisible, setNavBarVisibleVisible] = useState(true);
  const prevScrollPos = useRef(0);
  const data = useStaticQuery(headerQuery);
  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = currentScrollPos > prevScrollPos.current;

      setNavBarVisibleVisible(!isScrollingDown);
      prevScrollPos.current = currentScrollPos;
    }, 300);

    window.addEventListener('scroll', handleScroll);

    return () => {
      handleScroll.cancel();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerClassName = clsx({
    navbarHideable: true,
    navbarHidden: !isNavBarVisible,
  });
  const { author } = data.site.siteMetadata;
  return (
    <header id="header" className={headerClassName}>
      <div className="navbar__inner">
        <div className="navbar__items">
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
              marginRight: 20,
            }}
            className="navbar__brand"
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
          <Link
            activeClassName="navbar__link--active"
            className="navbar__item navbar__link"
            to="/utils"
          >
            工具库
          </Link>
          {/*<Link*/}
          {/*  activeClassName="navbar__link--active"*/}
          {/*  className="navbar__item navbar__link"*/}
          {/*  to="/brook"*/}
          {/*>*/}
          {/*  业务框架*/}
          {/*</Link>*/}
          {/* <Link
                  activeClassName="navbar__link--active"
                  className="navbar__item navbar__link"
                  to="/blog"
                >
                  博客
                </Link> */}
          {/* <Link
                  activeClassName="navbar__link--active"
                  className="navbar__item navbar__link"
                  to="/showcase"
                >
                  展示案例
                </Link> */}
        </div>
        <div className="navbar__items navbar__items--right"></div>
      </div>
    </header>
  );
}

const headerQuery = graphql`
  query HeaderQuery {
    avatar: file(absolutePath: { regex: "/logo.png/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
        #        gatsbyImageData(layout: FIXED, width: 50, height: 50, formats: [JPG])
      }
    }
    site {
      siteMetadata {
        author
      }
    }
  }
`;

export default Header;
