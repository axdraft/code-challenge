import React, { useState, useEffect } from 'react';
import to from 'await-to-js';
import ReactHtmlParser from 'react-html-parser';
import useReactRouter from 'use-react-router';
import { Helmet } from 'react-helmet';
import { Modal } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import { useTranslation } from 'react-i18next';

import styles from './case-modal.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEye, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Remove elements from DOM and prevent click everywhere
 * @param event
 * @private
 */
const removeElementFromDOM = event => {
  const iframe = document.querySelector(`.${styles.documentPreview}`);
  const hideIcon = document.querySelector(`.${styles.documentHide}`);
  const modal = document.querySelector('[role="dialog"]');

  event.preventDefault();
  event.stopPropagation();
  if (iframe)
    document.body.removeChild(iframe);

  if (hideIcon)
    document.body.removeChild(hideIcon);

  if (modal) {
    modal.style.pointerEvents = 'auto';
    modal.style.touchAction = 'auto';
  }

  document.body.removeListener('click', removeElementFromDOM);
};

export default function CaseModal(props) {
  const [t] = useTranslation();
  const { history } = useReactRouter();
  const [isLoading, setLoading] = useState({});
  const {
    id,
    name,
    imageUrl,
    description,
    shortDescription,
    documents,
    closeModal,
    onUpdate
  } = props;

  /**
   * Proceed with the selected document
   * @param currentDocument
   */
  function onDocumentClick(currentDocument) {
    onUpdate(currentDocument.documentId);
    closeModal();
  }

  /**
   * Handler for document preview click
   * @param documentId
   */
  function onDocumentPreviewClick(documentId) {
    setLoading({ [documentId]: true });

    proceedPreview(documentId);
  }

  /**
   * Get file for preview
   * @param documentId
   */
  function proceedPreview(documentId) {
    const [err, response] = await to(getPreview(documentId));

    if (err) {
      setLoading({});

      const errorMessage = err.error.message;

      if (errorMessage === 'File not found')
        console.error('business.fileNotFound');

      if (errorMessage === 'Preview file is unavailable')
        alerts.err(t('business.previewFileNotAvailable'));

      console.error('Something went wrong while fetching preview file. Error: ', err);

      return;
    }

    const iframe = document.createElement('iframe');
    const hideBlock = document.createElement('i');
    const modal = document.querySelector('[role="dialog"]');
    const url = 'https://mozilla.github.io/pdf.js/web/viewer.html?file=' + encodeURIComponent(response.file);

    // Click outside listener
    document.addEventListener('click', removeElementsFromDOM);

    modal.style.pointerEvents = 'none';
    modal.style.touchAction = 'none';

    hideBlock.className = 'fa fa-times ' + styles.documentHide;
    iframe.className = styles.documentPreview;
    iframe.src = url;
    document.body.appendChild(iframe);
    document.body.appendChild(hideBlock);
    document.body.classList.add('modal-open');

    setLoading({});
  }

  /**
   * Close modal window
   */
  function onModalClose() {
    history.goBack();
    closeModal();
  }

  return (
    <React.Fragment>

      <Helmet>
        <title>
          {t(name)}
        </title>

        <meta name="description" content={t(shortDescription)}/>



        <meta property="og:image" content="https://www.axdraft.com/images/social-preview.png"/>

        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:image" content="https://www.axdraft.com/images/social-preview.png"/>
      </Helmet>

      <Modal show={true} onHide={onModalClose}>
        <div className={`${styles.body} modal-body row`}>
          <FontAwesomeIcon
            icon={faTimes}
            className={`${styles.closeIcon} pull-right`}
            onClick={onModalClose}
          />

          <div className={styles.description}>
            <h3>
              <Trans defaults={name} i18nKey={name}/>
            </h3>
            <img src={imageUrl} alt={t(name)}/>
            <p>
              {ReactHtmlParser(t(description))}
            </p>
          </div>

          {documents.length > 1 ?
            <div>
              <p className={styles.listHeader}>
            <span>
              <Trans i18nKey="business.selectDocument"/>&nbsp;
            </span>

                <FontAwesomeIcon
                  data-for="case"
                  data-tip={t('business.preview')}
                  icon={faInfoCircle}
                  className={styles.infoIcon}
                />
              </p>

              {documents.map(document => {
                return (
                  <div key={document.documentId} className={styles.documentWrapper}>
                <span
                  className={styles.documentName}
                  onClick={() => onDocumentClick(document)}
                >
                  <Trans defaults={document.name} i18nKey={document.name}/>
                </span>

                    <div className={styles.preview}>
                      {isLoading[document.documentId] ?
                        <Spinner active className={styles.spinner}/>
                        :
                        <FontAwesomeIcon
                          icon={faEye}
                          data-for="case"
                          data-tip={t('business.actualPreview')}
                          size="lg"
                          onClick={() => onDocumentPreviewClick(document.documentId)}
                        />}
                    </div>
                  </div>
                );
              })}
            </div>
            : null}
        </div>

        {documents.length === 1 ?
          <div className={`row text-center ${styles.btnGroup}`}>
            <div>
              <button
                data-t="prepare-doc"
                className="btn btn-small btn-fill"
                onClick={() => onDocumentClick(documents[0])}
              >
                <Trans i18nKey="business.prepareBtn"/>
              </button>
            </div>
            <div>
              <button
                className={`${styles.btnLink} btn-link`}
                onClick={() => onDocumentPreviewClick(documents[0].documentId)}
              >
              </button>
            </div>
          </div> : null}
      </Modal>
    </React.Fragment>
  );
}
