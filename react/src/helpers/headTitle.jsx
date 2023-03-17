import React from 'react';
import { Helmet } from 'react-helmet';

const Head = ({ title, description }) => {
  const defaultTitle = 'Slanda Hotel';
  const defaultMeta = [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }, 
  ];

  return (
    <Helmet
      title={title ? `${title} | ${defaultTitle}` : defaultTitle}
      meta={[...defaultMeta]}
    >
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
};

export default Head;
