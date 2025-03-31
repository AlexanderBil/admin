import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Images = ({ src }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const load = useCallback(() => setImgSrc(src + '-300x-1'), [src]);
  const onError = useCallback(() => setImgSrc(src), [src]);

  useEffect(() => {
    const img = new Image();
    img.src = src + '-300x-1';

    img.addEventListener('load', load);
    img.addEventListener('error', onError);

    return () => {
      img.removeEventListener('load', load);
      img.removeEventListener('error', onError);
    };
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt='image'
      style={{
        width: '100%',
        objectFit: 'cover',
      }}
    />
  );
};

export default Images;

Images.propTypes = {
  src: PropTypes.string,
};
