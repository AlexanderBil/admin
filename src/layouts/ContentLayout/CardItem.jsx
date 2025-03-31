import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, Checkbox, Typography } from '@mui/material';
import { ROLE_LABELS, VERDICT_ICONS } from 'constants/';
import nftLogo from '../../images/nftLogo.svg';
import mpLogo from '../../images/mpLogo.svg';
import snLogo from '../../images/snLogo.svg';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  authorNameState,
  contentFiltersState,
  bulkPublicationState,
} from 'store/contentStore';
import images from 'images';

const CardItem = ({ card, tokenName, detailsHandler, mainCheckbox }) => {
  const [filters, setFilters] = useRecoilState(contentFiltersState);
  const [logoImg, setLogoImg] = useState([]);
  const setAuthorName = useSetRecoilState(authorNameState);
  const [checkedState, setCheckboxBulkState] = useRecoilState(bulkPublicationState);

  useEffect(() => {

    if (mainCheckbox) {
      if(checkedState.includes(card.contentId)) {
        return
      } else {
        setCheckboxBulkState((prev) => [...prev, card.contentId]);
      }
    }

    if (!mainCheckbox) {
      setCheckboxBulkState([]);
    }
  }, [mainCheckbox]);

  const handleChange = (event) => {
    if(checkedState.includes(card.contentId)) {
      setCheckboxBulkState((prev) =>
        prev.filter((item) => item !== card.contentId)
      );
    } else {
      setCheckboxBulkState((prev) => [...prev, card.contentId]);
    }
  };

  const showUserContentHandler = (card) => {
    setFilters((prevState) => ({
      ...prevState,
      creatorId: card.createdById,
    }));
    setAuthorName((prevState) => ({
      ...prevState,
      first: card.first,
      last: card.last,
    }));
  };

  useEffect(() => {
    let logos = [];

    if (card.nft) {
      logos.push(nftLogo);
    }
    if (card.passport) {
      logos.push(mpLogo);
    }
    if (card.passport?.status === 'Signed') {
      logos.push(snLogo);
    }

    setLogoImg(logos);
  }, []);

  return (
    <Card
      sx={{
        border: '1px solid #E6E6E6',
        borderRadius: '8px',
        position: 'relative',
        paddingBottom: '5px',
        height: '100%',
      }}
    >
      {logoImg.length ? (
        <Box
          sx={{
            maxWidth: '100px',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: '7px',
            top: '7px',
          }}
        >
          {logoImg.map((item) => (
            <Box
              key={item}
              component='img'
              sx={{
                marginLeft: '5px',
                height: '30px',
                width: '30px',
                objectFit: 'contain',
              }}
              alt={''}
              src={item}
            />
          ))}
        </Box>
      ) : null}

      <CardMedia
        onClick={() => detailsHandler(card.contentId)}
        sx={{
          padding: '16px',
          borderRadius: '24px',
          objectFit: 'cover',
          cursor: 'pointer',
        }}
        component='img'
        height='194'
        image={card.imageUrl}
        alt={card.title}
      />
      <Box sx={{ padding: '0px 16px 10px 16px' }}>
        <Typography
          sx={{ overflow: 'hidden' }}
          height={45}
          marginBottom={1}
          variant='body1'
          component='div'
        >
          {card.title}
          
        </Typography>
        <Typography marginBottom={1} variant='h6' component='div'>
          {card.price} {card.currency === 'AlgoToken' ? tokenName : card.currency}
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          By {ROLE_LABELS[card.authorPrimaryRole] || ''}
        </Typography>
        <Typography
          sx={{
            cursor: 'pointer',
            width: 'fit-content',
            '&:hover': { borderBottom: '1px solid #D3D3D3' },
          }}
          onClick={() => showUserContentHandler(card)}
          variant='body1'
        >
          {card.fullName}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '15px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {card.healthCheckStatus && card.healthCheckStatus !== 'Failure' && (
              <Typography sx={{ marginRight: '7px' }} >AI Content Quality Check</Typography>
            )}

            {card.healthCheckStatus !== 'Failure' && card.healthCheckStatus && (
              <Box
                component='img'
                sx={{
                  marginLeft: '5px',
                  height: '25px',
                  width: '25px',
                  objectFit: 'contain',
                }}
                alt={''}
                src={
                  card.healthCheckStatus && card.healthCheckStatus !== 'Failure'
                    ? images[
                        VERDICT_ICONS[card.healthCheckStatus.toUpperCase()]
                          .secondary
                      ]
                    : ''
                }
              />
            )}
          </Box>
          {filters.statuses?.includes('Draft') && (
            <Checkbox
              sx={{ padding: 0 }}
              checked={checkedState.includes(card.contentId)}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default CardItem;

CardItem.propTypes = {
  card: PropTypes.object,
  tokenName: PropTypes.string,
  detailsHandler: PropTypes.func,
  mainCheckbox: PropTypes.bool,
};
