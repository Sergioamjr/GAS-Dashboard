import React from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar/Sidebar';
import Toaster from '../Toaster';
import Loading from '../Loading/Loading';

const PageWrapper = props => {
  const {
    children,
    menuIsOpen,
    title,
    subtitle,
    limit_container,
    loading
  } = props;
  const version = process.env.REACT_APP_VERSION;
  return (
    <div>
      <Header />
      <div className='d-flex full-screen full-screen-with-header overflow-hidden'>
        <Sidebar {...props} />
        <div
          className={`overflow-auto p-top-40 p-bottom-60 content-wrapper ${
            menuIsOpen ? '' : 'content-wrapper-without-menu'
          }`}
        >
          <div
            className={`container h-100 ${
              limit_container ? 'max-width-container' : ''
            }`}
          >
            <div className='d-flex d-flex-space-between d-flex-column h-100'>
              <div>
                {title && (
                  <h2 className='page-title fs-3'>
                    {title}{' '}
                    {subtitle && (
                      <span className='color-theme_'>{subtitle}</span>
                    )}
                  </h2>
                )}
                {loading ? <Loading /> : children}
              </div>
              {version && (
                <p className='p-right m-top-15 m-bottom-15 color-theme'>
                  Versão: {version}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default PageWrapper;
