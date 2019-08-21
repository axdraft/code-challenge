import React, { useEffect, useLayoutEffect, useState } from 'react';
import to from 'await-to-js';
import Placeholder from './components/Placeholder/Placeholder';
import Case from './components/Case/Case';
import useRouter from 'use-react-router';
import { hasSsrData, getSsrData } from '../../services/ssrDataLayer';
import { getCases } from './services/cases';
import { Trans } from 'react-i18next';

import styles from './cases.module.scss';

export default function Cases(props) {
  const { urlPrefix } = props;
  const { staticContext } = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [cases, setCases] = useState(filterCases(getSsrData('cases', [], staticContext)));

  /**
   * Set loading state and proceed with retrieving cases
   */
  useLayoutEffect(() => {
    setLoading(true);
    proceedCases();
  }, []);

  /**
   * Get all cases
   * @returns {Promise<void>}
   */
  async function proceedCases() {
    const [err, response] = await to(getCases('us'));

    setLoading(false);

    if (err)
      return;

    setCases(filterCases(response.cases));
  }

  /**
   * Filter cases, which arrived from BE or SSR
   * @param casesToBeFiltered
   */
  function filterCases(casesToBeFiltered) {
    return casesToBeFiltered.filter(item => item.isVisible);
  }

  /**
   * Render case
   * @param currentCase
   * @param index
   */
  function renderCase(currentCase, index) {
    return (
      <Case
        {...currentCase}
        key={`case`}
        data-t="first-nine-cases"
        isFirst={index === 0}
        urlPrefix={urlPrefix}
      />
    );
  }

  return (
    <div className="container">
      {isLoading ?
        <React.Fragment>
          <Placeholder/>
          <Placeholder/>
        </React.Fragment>
        : null}

      {!isLoading ?
        <div className="text-center">
          {!cases.length ?
            <div className={`row text-center ${styles.notFound}`}>
              <Trans i18nKey="business.noCasesFound"/> No cases found
            </div>
            :
            ''
          }
          <div className={styles.blocks}>
            {cases.length ? cases.map(renderCase) : null}
          </div>
        </div>
        : null}
    </div>
  );
}
