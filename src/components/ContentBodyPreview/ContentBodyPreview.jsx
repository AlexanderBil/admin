import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { styles } from './ContentBodyPreviewStyles';

const ContentBodyPreview = ({ value }) => {
  const id = useMemo(() => uuid(), []);

  useEffect(() => {
    const iframe = document.getElementById(id);
    if (iframe) {
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(
        `<style>${styles}</style><main>${ value ? value : ''}</main>`
      );
      iframe.contentWindow.document.close();
    }
  }, [value, id]);

  const checkHeight = () => {
    const iframe = document.getElementById(id);
    iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
  };

  return (
    <iframe
      title='myFrame'
      frameBorder='0'
      id={id}
      width='100%'
      onLoad={checkHeight}
    />
  );
};

ContentBodyPreview.propTypes = {
  value: PropTypes.string,
};

export default ContentBodyPreview;
