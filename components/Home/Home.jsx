import React from 'react';
import Footer from '../Footer/Footer';
import { Helmet } from 'react-helmet';
import { Trans } from 'react-i18next';
import { useTranslation } from 'react-i18next';

import styles from './home.module.scss';

export default function Home() {
  const [t] = useTranslation();

  return (
    <React.Fragment>
      <Helmet>
        <title>
          {t('titles.axd.home')}
        </title>

        <meta name="description" content={t('descriptions.axd.home')}/>

        <meta property="og:type" content="website"/>
        <meta property="og:title" content={t('titles.axd.home')}/>
        <meta property="og:description" content={t('descriptions.axd.home')}/>
        <meta property="og:image" content="https://www.axdraft.com/images/social-preview.png"/>

        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:image" content="https://www.axdraft.com/images/social-preview.png"/>
      </Helmet>

      <section className={styles.hero}>
        <div className="container">
          <div className="row">
            <div className="text-center col-md-10 col-md-offset-1">
              <h1>
                <Trans i18nKey="home.header"/>
              </h1>
            </div>
            <div className="text-center col-md-10 col-md-offset-1">
              <p>
                <Trans i18nKey="home.subHeaderOne"/>
              </p>
              <p>
                <Trans i18nKey="home.subHeaderTwo"/>
              </p>
            </div>
            <div className="text-center col-md-10 col-md-offset-1"/>
          </div>
        </div>
      </section>

      <Footer/>
    </React.Fragment>
  );
}
