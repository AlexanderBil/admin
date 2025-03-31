import React, { useState } from 'react';
import Table from 'components/Table';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import { Typography, Box } from '@mui/material';
import { ROLE_LABELS, VERDICT_ICONS } from 'constants/';
import { contentFiltersState, contentState, idNft } from 'store/contentStore';
import nftLogo from '../../images/nftLogo.svg';
import mpLogo from '../../images/mpLogo.svg';
import snLogo from '../../images/snLogo.svg';
import { useNavigate } from 'react-router-dom';
import images from '../../images';
import CheckboxTableCell from './cells/CheckboxTableCell';

const ContentTableContainer = ({
  handlePageChange,
  handlePageSizeChange,
  mainCheckbox,
}) => {
  const { pagination, contentData } = useRecoilValue(contentState);
  const navigate = useNavigate();
  const setDetailsId = useSetRecoilState(idNft);
  const [filters, setFilters] = useRecoilState(contentFiltersState);
  const [logoImg, setLogoImg] = useState([]);

  const detailsHandler = (id) => {
    navigate(`/admin/content/${id}`);
    setDetailsId((prev) => ({
      ...prev,
      id,
    }));
  };

  const showUserContentHandler = (userId) => {
    setFilters((prevState) => ({
      ...prevState,
      creatorId: userId,
    }));
  };

  const columns = [
    {
      name: 'ckeckbox',
      label: '',
      renderCell: ({ contentId }) =>
        filters.statuses?.includes('Draft') && (
          <CheckboxTableCell
            mainCheckbox={mainCheckbox}
            contentId={contentId}
          />
        ),
    },
    {
      name: 'imageUrl',
      label: '',
      renderCell: ({ imageUrl, contentId }) => (
        <Box
          onClick={() => detailsHandler(contentId)}
          component='img'
          sx={{
            height: '70px',
            width: '120px',
            objectFit: 'cover',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
          alt='nft'
          src={imageUrl}
        />
      ),
    },
    {
      name: 'title',
      label: '',
      renderCell: ({ title }) => (
        <Typography sx={{ fontWeight: '500', maxWidth: '250px' }}>
          {title}
        </Typography>
      ),
    },
    {
      name: 'time',
      label: '',
      renderCell: ({ created, published, originallyPublished }) => (
        <Box sx={{ maxWidth: '310px', width: '100%' }}>
          {created && (
            <Typography sx={{ marginBottom: '5px', fontSize: '16px' }}>
              <span style={{ fontWeight: '500' }}>Created:</span>{' '}
              {new Date(created).toLocaleString()}
            </Typography>
          )}
          {published && (
            <Typography sx={{ marginBottom: '5px', fontSize: '16px' }}>
              <span style={{ fontWeight: '500' }}>Published:</span>{' '}
              {new Date(published).toLocaleString()}
            </Typography>
          )}
          {originallyPublished && (
            <Typography sx={{ fontSize: '16px' }}>
              <span style={{ fontWeight: '500' }}>1-st time Published:</span>{' '}
              {new Date(originallyPublished).toLocaleString()}
            </Typography>
          )}
        </Box>
      ),
    },
    {
      name: 'classification',
      label: '',
      renderCell: ({ classification }) => (
        <Typography>{classification}</Typography>
      ),
    },
    {
      name: 'healthCheckStatus',
      label: '',
      renderCell: ({ healthCheckStatus }) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: healthCheckStatus !== 'Failure' ? '100px' : '125px',
            justifyContent: 'center',
            marginTop: '15px',
            textAlign: 'center'
          }}
        >
          {healthCheckStatus && healthCheckStatus !== 'Failure' && (
            <Typography>AI Content Quality Check</Typography>
          )}

          {healthCheckStatus !== 'Failure' && healthCheckStatus && (
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
                healthCheckStatus && healthCheckStatus !== 'Failure'
                  ? images[
                      VERDICT_ICONS[healthCheckStatus.toUpperCase()].secondary
                    ]
                  : ''
              }
            />
          )}
        </Box>
      ),
    },
    {
      name: 'nft',
      label: '',
      renderCell: ({ nft, passport }) => {
        let logos = [];

        if (nft) {
          logos.push(nftLogo);
        }
        if (passport) {
          logos.push(mpLogo);
        }
        if (passport?.status === 'Signed') {
          logos.push(snLogo);
        }

        return logos.length ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {logos.map((item) => (
              <Box
                key={item}
                component='img'
                sx={{
                  height: '30px',
                  width: '30px',
                  objectFit: 'contain',
                  marginBottom: '5px'
                }}
                alt={''}
                src={item}
              />
            ))}
          </Box>
        ) : null;
      },
    },
    {
      name: 'name',
      label: '',
      renderCell: ({ authorPrimaryRole, fullName, createdById }) => (
        <Box sx={{ width: '135px' }}>
          <Typography variant='body1' color='text.secondary'>
            By {ROLE_LABELS[authorPrimaryRole] || ''}
          </Typography>
          <Typography
            sx={{
              cursor: 'pointer',
              width: 'fit-content',
              '&:hover': { borderBottom: '1px solid #D3D3D3' },
            }}
            onClick={() => showUserContentHandler(createdById)}
          >
            {fullName}
          </Typography>
        </Box>
      ),
    },
    {
      name: 'price',
      label: '',
      renderCell: ({ price }) => (
        <Typography variant='body1'>{price} 1WMT</Typography>
      ),
    },
  ];

  return (
    <Table
      isNeadPagination={contentData.length === 0}
      columns={columns}
      data={contentData}
      pagination={pagination}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handlePageSizeChange}
      rowsPerPageOptions={[15, 20, 25, 30]}
      from={'content'}
      sideContent='center'
    />
  );
};

export default ContentTableContainer;

ContentTableContainer.propTypes = {
  handlePageChange: PropTypes.func,
  handlePageSizeChange: PropTypes.func,
  mainCheckbox: PropTypes.bool,
};
