import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Link, Typography } from '@mui/material';
import styled from '@emotion/styled';
import nftLogo from '../../../logo/nftLogo.png';
import Images from './Image';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  styleHover: {
    overflow: 'visible',
    textOverflow: 'clip',
    whiteSpace: 'normal',
    wordBreak: 'break-all',
    marginBottom: '20px',
    [theme.breakpoints.down('laptop')]: {},
  },
  styleWithoutHover: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: '20px',
    [theme.breakpoints.down('laptop')]: {
      whiteSpace: 'normal',
      overflow: 'visible',
      wordBreak: 'break-all',
    },
  },
}));

const StyledSpan = styled(Typography)(() => ({
  fontWeight: '500',
  fontSize: '14px',
  whiteSpace: 'nowrap',
  display: 'inline-block',
}));

const StyledP = styled(Typography)(() => ({
  fontWeight: '500',
  fontSize: '14px',
  whiteSpace: 'nowrap',
  display: 'inline-block',
  fontStyle: 'italic',
  maxWidth: '300px',
}));

const styleHoverAttributes = {
  overflow: 'visible',
  textOverflow: 'clip',
  whiteSpace: 'normal',
  maxWidth: '400px',
  wordBreak: 'break-all',
  marginBottom: '20px',
};

const styleWithoutHoverAttributes = {
  whiteSpace: 'nowrap',
  maxWidth: '230px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginBottom: '20px',
};

export const ContentTableCell = ({
  title,
  classification,
  contentId,
  blockchain,
  tokenId,
  smartContract,
  imageUrl,
  statusContent,
  attributes,
}) => {
  const classes = useStyles();
  const [isHover, setIsHover] = useState(false);
  const [isHoverAttributes, setIsHoverAttributes] = useState(false);

  const onMouseEnterHandler = () => {
    setIsHover(true);
  };

  const onMouseLeaveHandler = () => {
    setIsHover(false);
  };

  const onMouseEnterHandlerAttributes = () => {
    setIsHoverAttributes(true);
  };

  const onMouseLeaveHandlerAttributes = () => {
    setIsHoverAttributes(false);
  };

  return (
    <Box sx={{ maxWidth: '250px' }}>
      <Box sx={{ marginBottom: '3px' }}>
        <Link
          target='_blank'
          style={{ color: '#000', textDecorationColor: '#000' }}
          href={`${process.env.REACT_APP_PORTAL_URL}content/${contentId}`}
        >
          {title} ({classification})
        </Link>
      </Box>
      <Box sx={{ marginBottom: '3px' }}>
        <StyledSpan>ID:</StyledSpan> {contentId}
      </Box>
      <Box sx={{ marginBottom: '3px' }}>
        <StyledSpan>Status:</StyledSpan> {statusContent}
      </Box>
      <Box sx={{ marginBottom: '3px' }}>
        <StyledSpan>Blockchain:</StyledSpan> {blockchain}
      </Box>
      <Box sx={{ marginBottom: '3px' }}>
        <StyledSpan>TokenId:</StyledSpan> {tokenId}
      </Box>
      <Box
        className={isHover ? classes.styleHover : classes.styleWithoutHover}
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        <StyledSpan>SmartContract:</StyledSpan>{' '}
        <span style={{ borderBottom: '1px solid #000' }}>{smartContract}</span>
      </Box>

      {attributes && (
        <>
          <StyledP sx={{ textDecoration: 'underline' }}>Attributes:</StyledP>
          <Box
            onMouseEnter={onMouseEnterHandlerAttributes}
            onMouseLeave={onMouseLeaveHandlerAttributes}
            style={
              isHoverAttributes
                ? styleHoverAttributes
                : styleWithoutHoverAttributes
            }
          >
            {attributes.map((item) => (
              <StyledP
                style={{ whiteSpace: isHoverAttributes ? 'normal' : 'nowrap' }}
                key={item.value}
              >
                {item.attribute}:
                <span style={{ fontWeight: '400' }}> {item.value}</span>
              </StyledP>
            ))}
            <hr />
          </Box>
        </>
      )}

      {imageUrl && (
        <Box
          style={{
            marginTop: '10px',
            maxWidth: '230px',
            display: 'flex',
          }}
        >
          <Link
            target='_blank'
            style={{ color: '#000', textDecorationColor: '#000' }}
            href={`${process.env.REACT_APP_PORTAL_URL}content/${contentId}`}
          >
            <Images src={imageUrl} />
          </Link>
          <Box
            sx={{
              width: '40px',
              height: '40px',
              position: 'absolute',
              marginLeft: '210px',
              marginTop: '-18px',
            }}
          >
            <img
              style={{ width: '100%', objectFit: 'cover' }}
              src={nftLogo}
              alt=''
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

ContentTableCell.propTypes = {
  title: PropTypes.string,
  classification: PropTypes.string,
  contentId: PropTypes.number,
  blockchain: PropTypes.string,
  tokenId: PropTypes.string,
  smartContract: PropTypes.string,
  imageUrl: PropTypes.string,
  statusContent: PropTypes.string,
  attributes: PropTypes.array,
};
