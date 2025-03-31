import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  Drawer,
  Grid,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import {
  contentService,
  detailsState,
  contentState,
  contentLocalesState,
  primaryLocaleState,
} from 'store/contentStore';
import { metrics } from 'store/aiHealthCheckStore';
import {
  KeyboardArrowLeft,
  BarChartRounded,
  KeyboardArrowRight,
} from '@mui/icons-material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ReactPlayer from 'react-player';
import { globalDetails } from 'store/invitationStore';
import ContentBodyPreview from 'components/ContentBodyPreview';
import { activateContent, deleteContent } from 'services/contentService';
import { scanAi } from 'services/aiHealthCheckService';
import ContentModal from './ContentModal';
import AiCheckDetails from 'components/AiCheckDetails';
import { AI_CHECK_VERDICTS, VERDICT_ICONS } from 'constants/';
import images from 'images';
import { sourceListState } from 'store/importContentStore';
import { makeStyles } from '@mui/styles';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const useStyles = makeStyles((theme) => ({
  filtersButton: {
    display: 'none',
    [theme.breakpoints.down('laptop')]: {
      display: 'flex',
      marginBottom: '15px',
      position: 'relative',
      zIndex: '200',
    },
  },
  sideContainer: {
    [theme.breakpoints.down('laptop')]: {
      position: 'fixed',
      top: '55px',
      right: '-100%',
      transition: '350ms',
    },
  },
  sideContainerActive: {
    zIndex: '100',
    position: 'absolute',
    right: 0,
    top: '55px',
    transition: '350ms',
    backgroundColor: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
    padding: '15px',
    borderRadius: '10px',
  },
  userImage: {
    display: 'none',
    alignItems: 'center',
    padding: '15px 0px 15px 15px',
    backgroundColor: '#F3F4F6',
    borderRadius: '8px',
    width: '275px',
    marginBottom: '20px',
    [theme.breakpoints.down('laptopL')]: {
      display: 'flex',
    },
  },
  userBlock: {
    [theme.breakpoints.down('laptopL')]: {
      display: 'none',
    },
  },
  backButton: {
    display: 'none',
    [theme.breakpoints.down('laptopL')]: {
      display: 'flex',
      marginBottom: '20px',
      width: '100%',
    },
  },
  sideBox: {
    paddingLeft: '20px',
    paddingTop: '30px',
    [theme.breakpoints.down('laptopL')]: {
      paddingLeft: '0px',
      paddingTop: '0px',
    },
  },
  aiButton: {
    width: '275px',
    margin: '30px auto 30px 20px',
    justifyContent: 'flex-start',
    textTransform: 'unset',
    border: '1px solid #E8E9EA',
    borderRadius: '8px',
    padding: '16px',
    [theme.breakpoints.down('laptopL')]: {
      margin: '30px auto 30px 0px',
    },
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  color: '#000',
  border: 'none',
  borderRadius: '0',
  width: '20px',
}));

const CustomNFTButton = styled(Button)(({ theme }) => ({
  border: '1px solid #0063cc',
  textAlign: 'center',
  width: '250px',
  padding: '10px 0px',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: 16,
}));

const ContentDetails = () => {
  const classes = useStyles();
  const { sourceList } = useRecoilValue(sourceListState);
  const { detailsData } = useRecoilValue(detailsState);
  const contentLocales = useRecoilValue(contentLocalesState);
  const primaryLocale = useRecoilValue(primaryLocaleState);
  const metricsData = useRecoilValue(metrics);
  const [locale, setLocale] = useState(primaryLocale || 'en');
  const navigate = useNavigate();
  const { serviceData } = useRecoilValue(contentService);
  const globalDetailsData = useRecoilValue(globalDetails);
  const tokenName = globalDetailsData.token?.unitName || '';
  const [publicationDates, setPublicationDates] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [aiData, setAiData] = useState({});
  const [aiError, setAiError] = useState({});
  const [showLoader, setShowLoader] = React.useState(false);
  const [activateContentStatus, setActivateContentStatus] = useState(0);
  const [deleteContentStatus, setDeleteContentStatus] = useState(0);
  const [activateError, setActivateError] = useState({});
  const [deleteError, setDeleteError] = useState({});
  const [aiPanelOpened, setAiPanelOpened] = useState(false);
  const refreshDetails = useRecoilRefresher_UNSTABLE(detailsState);
  const refreshContent = useRecoilRefresher_UNSTABLE(contentState);
  const [removeModal, setRemoveModal] = useState(false);
  const [sidebarFilter, setSidebarFilter] = useState(false);
  const showSidebarFilter = () => setSidebarFilter(!sidebarFilter);

  useEffect(() => {
    Object.keys(detailsData.contentLocales).length === 1 &&
      Object.keys(detailsData.contentLocales).map((key) => {
        setLocale(key);
      });
  }, [detailsData.contentLocales]);

  const removeHandler = () => {
    setRemoveModal(true);
    openActivateModal();
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setRemoveModal(false);
    setActivateContentStatus(0);
    setDeleteContentStatus(0);
  };

  const openActivateModal = async () => {
    setIsOpenModal(true);
  };

  const activateOrSubmitHandler = async () => {
    setShowLoader(true);
    if (
      aiData?.verdict === AI_CHECK_VERDICTS.notSafety ||
      aiData?.verdict === AI_CHECK_VERDICTS.warning
    ) {
      await activateContent(detailsData.id)
        .then((response) => setActivateContentStatus(response.status))
        .catch((error) => {
          setActivateError(error.response.data);
          setShowLoader(false);
        });
      setAiData({});
      refreshDetails();
      refreshContent();
    } else {
      await scanAi(detailsData.id)
        .then((response) =>
          setAiData((prev) => ({ ...prev, ...response.data }))
        )
        .catch((error) => {
          setAiError(error.response.data);
        });
    }
    setShowLoader(false);
  };

  const removeContentHandler = async () => {
    setShowLoader(true);
    await deleteContent(detailsData.id)
      .then((response) => setDeleteContentStatus(response.status))
      .catch((error) => {
        setDeleteError(error.response.data);
        setShowLoader(false);
      });
    refreshContent();
    setShowLoader(false);
  };

  const toggleAiPanel = (state) => {
    if (state !== undefined && typeof state === 'boolean') {
      setAiPanelOpened(state);
    } else {
      setAiPanelOpened((prevState) => !prevState);
    }
  };

  useEffect(() => {
    if (aiData?.verdict === AI_CHECK_VERDICTS.safety) {
      const activateContentHandler = async () => {
        await activateContent(detailsData.id)
          .then((response) => setActivateContentStatus(response.status))
          .catch((error) => {
            setActivateError(error.response.data);
          });
        refreshDetails();
        refreshContent();
      };
      activateContentHandler();
    }
  }, [aiData]);

  useEffect(() => {
    let details = [];

    if (detailsData.created) {
      details.push({ name: 'Created', value: 'created' });
    }
    if (detailsData.published) {
      details.push({ name: 'Published', value: 'published' });
    }
    if (detailsData.originallyPublished) {
      details.push({
        name: '1-st time Published',
        value: 'originallyPublished',
      });
    }

    setPublicationDates(details);
  }, [detailsData]);

  const viewNftHandler = () => {
    if (detailsData.nft.system === 'Algorand') {
      window.open(
        `${serviceData.explorer}/asset/${detailsData.nft.tokenId}`,
        '_blank'
      );
    }
    if (detailsData.nft.system === 'Polygon') {
      let explorerNew = '';
      serviceData.sideChains.map((item) => {
        if (item.name === 'Polygon') {
          explorerNew = item.explorer;
        }
      });
      window.open(
        `${explorerNew}/token/${detailsData?.nft.smartContract}?a=${detailsData?.nft.tokenId}`,
        '_blank'
      );
    }
    if (detailsData.nft.system === 'Casper') {
      let explorerNew = '';
      serviceData.sideChains.map((item) => {
        if (item.name === 'Casper') {
          explorerNew = item.explorer;
        }
      });
      window.open(
        `${explorerNew}/contracts/${detailsData?.nft.smartContract}/nfts/${detailsData?.nft.tokenId}`,
        '_blank'
      );
    }
  };

  return (
    <Grid
      sx={{ marginTop: { mobileS: '0px', laptop: '24px' } }}
      container
      my={3}
    >
      <Grid className={classes.userBlock} item mobileS={2}>
        <Box sx={{ paddingRight: '20px' }}>
          <Button
            sx={{ marginBottom: '20px', width: '100%' }}
            onClick={() => navigate('/admin/content')}
            variant='outlined'
            startIcon={<KeyboardArrowLeft />}
          >
            Back to contents list
          </Button>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px 0px 15px 15px',
              backgroundColor: '#F3F4F6',
              borderRadius: '8px',
            }}
          >
            <Avatar
              variant='rounded'
              sx={{
                width: 55,
                height: 55,
              }}
              alt={detailsData.fullName}
              src={detailsData.thumbnailUrl}
            >
              {`${detailsData.first[0] || ''}${detailsData.last[0] || ''}`}
            </Avatar>
            <Typography variant='paragraph' sx={{ marginLeft: '15px' }}>
              {detailsData.fullName}
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Grid item mobileS={12} laptop={9} laptopL={6}>
        <Box
          sx={{
            marginBottom: '20px',
            display: 'flex',
          }}
        >
          <Box>
            <Button
              className={classes.filtersButton}
              onClick={showSidebarFilter}
              startIcon={!sidebarFilter && <KeyboardDoubleArrowLeftIcon />}
              endIcon={sidebarFilter && <KeyboardDoubleArrowRightIcon />}
            >
              Info
            </Button>
            <Button
              className={classes.backButton}
              onClick={() => navigate('/admin/content')}
              variant='outlined'
              startIcon={<KeyboardArrowLeft />}
            >
              Back to contents list
            </Button>

            {contentLocales.length > 1 &&
              contentLocales.map((key) => (
                <CustomButton
                  key={key}
                  onClick={() => setLocale(key)}
                  sx={{
                    borderBottom: key === locale && '2px solid #1976d2',
                  }}
                >
                  <Typography variant='paragraph'>{key}</Typography>
                </CustomButton>
              ))}
          </Box>
        </Box>
        <Box
          sx={{
            padding: '0px 20px 0px 20px',
            borderLeft: '1px solid #F3F4F5',
            borderRight: '1px solid #F3F4F5',
          }}
        >
          <Typography
            sx={{
              marginBottom: '10px',
              fontSize: { mobileS: '22px', tablet: '26px' },
              fontWeight: '500',
            }}
          >
            {detailsData.contentLocales[locale]?.title}
          </Typography>
          <Typography sx={{ marginBottom: '10px' }} color='text.secondary'>
            {detailsData.classification}
          </Typography>

          {publicationDates.map(({ name, value }) => (
            <Box key={name} sx={{ display: 'flex' }}>
              <Typography
                sx={{
                  marginBottom: '10px',
                  fontWeight: '500',
                  marginRight: '5px',
                }}
              >
                {name}:
              </Typography>
              <Typography>
                {new Date(detailsData[value]).toLocaleString()}
              </Typography>
            </Box>
          ))}

          {detailsData.contentLocales[locale]?.wordQuantity && (
            <Box sx={{ display: 'flex' }}>
              <Typography
                sx={{
                  marginBottom: '10px',
                  fontWeight: '500',
                  marginRight: '5px',
                }}
              >
                Words Quantity:
              </Typography>
              <Typography>
                {detailsData.contentLocales[locale].wordQuantity}
              </Typography>
            </Box>
          )}
          {detailsData.classification !== 'VideoRecord' &&
          detailsData.classification !== 'Poster' ? (
            <Box
              component='img'
              sx={{
                height: { mobileS: '300px', tablet: '600px' },
                width: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '10px',
              }}
              alt='picture'
              src={detailsData.imageUrl}
            />
          ) : null}

          {detailsData.classification !== 'Article' &&
            detailsData.classification !== 'VideoRecord' &&
            (detailsData.animationUrl !== '' ? (
              <ReactPlayer
                width='100%'
                height={
                  detailsData.classification === 'Poster' ? '500px' : '50px'
                }
                url={detailsData.animationUrl}
                autoPlay={false}
                controls={true}
              />
            ) : (
              <Box
                component='img'
                sx={{
                  height: '500px',
                  width: '100%',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  marginBottom: '10px',
                }}
                alt='picture'
                src={detailsData.imageUrl}
              />
            ))}
          <ContentBodyPreview
            value={detailsData.contentLocales[locale]?.value}
          />
        </Box>
      </Grid>

      <Grid
        className={
          sidebarFilter ? classes.sideContainerActive : classes.sideContainer
        }
        item
        mobileS={10}
        laptop={4}
      >
        <Box className={classes.sideBox}>
          <Box className={classes.userImage}>
            <Avatar
              variant='rounded'
              sx={{
                width: 55,
                height: 55,
              }}
              alt={detailsData.fullName}
              src={detailsData.thumbnailUrl}
            >
              {`${detailsData.first[0] || ''}${detailsData.last[0] || ''}`}
            </Avatar>
            <Typography variant='paragraph' sx={{ marginLeft: '15px' }}>
              {detailsData.fullName}
            </Typography>
          </Box>
          <Typography>{detailsData.classification} Price</Typography>
          <Box
            sx={{
              textAlign: 'center',
              width: '275px',
              padding: '10px 0px',
              borderRadius: '8px',
              backgroundColor: '#F3F4F6',
              fontWeight: '500',
              marginTop: '5px',
            }}
          >
            {detailsData.price}{' '}
            {detailsData.currency === 'AlgoToken'
              ? tokenName
              : detailsData.currency}
          </Box>

          {detailsData.passport && (
            <Box sx={{ marginTop: '20px' }}>
              <Button
                onClick={() =>
                  window.open(
                    `${process.env.REACT_APP_PORTAL_URL}certificate/${detailsData.id}`,
                    '_blank'
                  )
                }
                startIcon={<ListAltIcon />}
                sx={{ width: '250px' }}
                size='large'
                variant='outlined'
              >
                View Media Passport
              </Button>
            </Box>
          )}

          {detailsData.status === 'Draft' && (
            <Box sx={{ marginTop: '20px' }}>
              <Button
                onClick={openActivateModal}
                sx={{ width: '250px' }}
                size='large'
                variant='contained'
              >
                Publish
              </Button>
            </Box>
          )}

          {sourceList?.map((item) => {
            if (
              detailsData.status === 'Draft' &&
              item.id === detailsData.originSourceId
            ) {
              return (
                <Box sx={{ marginTop: '20px' }}>
                  <Button
                    onClick={removeHandler}
                    sx={{ width: '250px' }}
                    size='large'
                    variant='contained'
                    color='error'
                  >
                    Remove
                  </Button>
                </Box>
              );
            }
          })}

          {detailsData.nft && (
            <CustomNFTButton
              sx={{ marginTop: '20px' }}
              onClick={() => viewNftHandler()}
              startIcon={<VisibilityIcon />}
            >
              View {detailsData.nft?.system}
            </CustomNFTButton>
          )}
        </Box>
        {!metricsData.empty && (
          <Button
            className={classes.aiButton}
            onClick={toggleAiPanel}
            variant='outlined'
            startIcon={<BarChartRounded />}
            endIcon={<KeyboardArrowRight />}
          >
            <Box sx={{ color: 'black' }} component='span'>
              AI Content Quality Check
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                margin: '0 auto 0 10px',
              }}
            >
              <img
                src={images[VERDICT_ICONS[metricsData.verdict].primary]}
                alt='verdict icon'
              />
            </Box>
          </Button>
        )}
      </Grid>
      <ContentModal
        open={isOpenModal}
        handleCloseModal={handleCloseModal}
        activateOrSubmitHandler={activateOrSubmitHandler}
        aiData={aiData}
        aiError={aiError}
        setAiData={setAiData}
        setAiError={setAiError}
        showLoader={showLoader}
        activateContentStatus={activateContentStatus}
        deleteContentStatus={deleteContentStatus}
        setActivateError={setActivateError}
        activateError={activateError}
        deleteError={deleteError}
        removeModal={removeModal}
        removeContentHandler={removeContentHandler}
      />
      <Drawer anchor='right' open={aiPanelOpened} onClose={toggleAiPanel}>
        <Toolbar />
        <AiCheckDetails
          metricsData={metricsData}
          onClose={() => toggleAiPanel(false)}
        />
      </Drawer>
    </Grid>
  );
};

export default ContentDetails;
