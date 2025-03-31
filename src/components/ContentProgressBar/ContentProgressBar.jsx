import React from 'react';
import PropTypes from 'prop-types';

const ContentProgressBar = (props) => {
  const { bgcolor, completed, name } = props;

  const containerStyles = {
    height: 7,
    width: '100%',
    backgroundColor: '#e0e0de',
    borderRadius: 50,
    marginBottom: 12
  };

  const containerTextStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right',
  };

  const labelStyles = {
    padding: 5,
    color: '#000',
  };

  return (
    <>
      <div style={containerTextStyles}>
        <span>{name}</span>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>

      <div style={containerStyles}>
        <div style={fillerStyles}></div>
      </div>
    </>
  );
};

export default ContentProgressBar;

ContentProgressBar.propTypes = {
  bgcolor: PropTypes.string,
  completed: PropTypes.number,
  name: PropTypes.string,
};
