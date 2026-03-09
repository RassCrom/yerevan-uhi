import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

/**
 * SEO Component
 * Automatically updates page title and description based on the current active language.
 */
const SEO = () => {
  const { t } = useTranslation();

  const title = `${t('header.title_part1')} ${t('header.title_part2')} ${t('header.title_part3')} | Interactive Story`;
  const description = t('header.story_desc');

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
