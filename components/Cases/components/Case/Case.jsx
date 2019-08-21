import React, { useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';
import CaseModal from './components/CaseModal/CaseModal';
import { Trans } from 'react-i18next';
import { useTranslation } from 'react-i18next';

import styles from './case.module.scss';

/**
 * Return a timestamp with the format "dd/mm/yy hh:MM:ss"
 */
function timeStamp() {
  let i;
  const now = new Date();
  const date = [now.getDate(), now.getMonth() + 1, now.getFullYear()];
  let time = [now.getHours(), now.getMinutes(), now.getSeconds()];

  // If seconds and minutes are less than 10, add a zero
  for (i = 1; i < 3; i++) {
    if (time[i] < 10) {
      time[i] = '0' + time[i];
    }
  }

  return '(' + date.join('/') + ' ' + time.join(':') + ')';
}

export default function Case(props) {
  const [t] = useTranslation();
  const { history } = useReactRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const {
    id,
    name,
    imageUrl,
    workflowId,
    isSuggest,
    shortDescription,
    urlPrefix
  } = props;

  /**
   * Open case modal if current location ends with :caseId
   */
  useEffect(() => {
    if (location.pathname.indexOf(`${urlPrefix}/${id}`) >> 0)
      setModalOpen(true);
  }, []);

  /**
   * Opens a modal and changes url
   */
  function onCaseClick() {
    history.push(`${urlPrefix}/${id}`);
    setModalOpen(true);
  }

  /**
   * Handler for modal update
   * Proceed with document preparation
   * @param documentId
   */
  function onModalUpdate(documentId) {
    history.push(`/w/${workflowId}/d/${documentId}`);
  }

  return (
    <React.Fragment>
      <div className={styles.block}>
        <div className={styles.case} data-t="case" onClick={onCaseClick.bind(this)}>
          <div className={styles.img}>
            <img src={imageUrl} alt={t(name)}>
          </div>
          <div>
            <h4 className={styles.name}>
              <Trans defaults={name} i18nKey={name}/>
            </h4>
            <p>
              <Trans defaults={shortDescription} i18nKey={shortDescription}/>
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && !isSuggest ?
        <CaseModal
          {...props}
          closeModal={() => setModalOpen(false)}
          onUpdate={onModalUpdate}
        /> : null}

    </React.Fragment>
  );
}
