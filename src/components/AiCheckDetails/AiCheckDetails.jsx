import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Toolbar,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { contentLocalesState, detailsState, primaryLocaleState } from 'store/contentStore';
import { AI_CHECK_VERDICTS, LABELS_BY_VERDICT, COLOR_BY_VERDICT, VERDICT_ICONS } from 'constants/';
import images from 'images';

const LocalesTabs = ({ list, currentLocale, onChange }) => (
  <Box sx={{ marginBottom: '20px' }}>
    {
      list.map((key) => (
        <Button
          key={key}
          onClick={() => onChange(key)}
          sx={{
            color: '#000',
            border: 'none',
            borderRadius: '0',
            width: '20px',
            borderBottom: key === currentLocale && '2px solid #1976d2',
          }}
        >
          <Typography variant='paragraph'>{key}</Typography>
        </Button>
      ))
    }
  </Box>
);

const FieldTitle = ({ name = '', verdict = '' }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', margin: '24px 0 16px 0' }}>
      { verdict && (
        <img src={images[VERDICT_ICONS[verdict].primary]} alt='verdict' style={{ marginRight: '15px' }} />
      ) }
      <Typography sx={{ marginRight: 'auto', fontWeight: 'bold', fontSize: '18px' }} >{name}</Typography>
      { verdict && (
        <Typography sx={{ color: COLOR_BY_VERDICT[verdict].primary, fontSize: '14px' }}>
          {LABELS_BY_VERDICT[verdict]}
        </Typography>
      ) }
    </Box>
  );
};

const MetricItem = ({ name = '', description = '', metricDecision = '', value = 0 }) => {
  return (
    <Accordion
      disableGutters
      sx={{ margin: '12px 0', boxShadow: 'none', padding: '12px 0' }}
    >
      <AccordionSummary sx={{ padding: 0 }} expandIcon={<ExpandMoreIcon />}>
        {metricDecision && (
          <img
            style={{ marginRight: '8px' }}
            src={metricDecision ? images[VERDICT_ICONS[metricDecision].secondary] : ''}
            alt='verdict'
          />
        )}
        <Typography variant='paragraph'>{name}</Typography>
      </AccordionSummary>

      <AccordionDetails sx={{
        backgroundColor: metricDecision ? COLOR_BY_VERDICT[metricDecision].secondary : '#F3F4F6',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '8px',
        padding: '12px',
      }}>
        <Typography variant='paragraph'>{description}</Typography>
        <Typography variant='paragraph' sx={{ color: '#898A8D', textAlign: 'right', fontSize: '13px', margin: '8px' }}>
          {Math.round(value * 100)}%
        </Typography>
        <LinearProgress
          color={metricDecision ? COLOR_BY_VERDICT[metricDecision].text : 'primary'}
          variant='determinate'
          value={Math.round(value * 100)}
        />
      </AccordionDetails>
    </Accordion>
  )
}

const MetricItems = ({ items = [] }) => <div>{items.map(item => <MetricItem key={item.code} {...item} />)}</div>

const Images = ({ list = [], activeImageId, onClick }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '16px', pb: '16px' }}>
      {list.map(item => (
        <Box
          key={item.id}
          sx={{
            position: 'relative',
            cursor: 'pointer',
            borderRadius: '8px',
            width: '40px',
            height: '40px',
            overflow: 'hidden',
          }}
        >
          <img
            style={{
              filter: `grayscale(${Number(item.id !== activeImageId)})`,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            src={item.imageUrl}
            alt=""
            onClick={() => onClick(item)}
          />
          { item.verdict && (
            <img
              src={images[VERDICT_ICONS[item.verdict].primary]}
              alt='verdict'
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                width: '11px',
                height: '11px',
                display: 'flex',
              }}
            />
          ) }
        </Box>
      )
      )}
    </Box>
  );
};


const AiCheckDetails = ({ metricsData, onClose }) => {
  const contentLocales = useRecoilValue(contentLocalesState);
  const primaryLocale = useRecoilValue(primaryLocaleState);
  const { detailsData } = useRecoilValue(detailsState);

  const [titleMetrics, setTitleMetrics] = useState({});
  const [textMetrics, setTextMetrics] = useState({});
  const [imagesMetrics, setImagesMetrics] = useState({});
  const [imagesVerdict, setImagesVerdict] = useState('');
  const [currentLocale, setCurrentLocale] = useState(primaryLocale || 'en');
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    setTitleMetrics(parseLocalizedItemsByFieldCategory('TITLE'));
    setTextMetrics(parseLocalizedItemsByFieldCategory('BODY'));
    setImagesMetrics(parseImageMetrics());

  }, [metricsData]);

  const parseLocalizedItemsByFieldCategory = (fieldCategory) => {
    const result = {};

    contentLocales.forEach(locale => {
      const items = metricsData.metrics.filter(
        item => (item.locale === locale) && (item.fieldCategory === fieldCategory)      ) || [];
      if (items.length) {
        result[locale] = {
          items,
          verdict: items[0].verdict
        }
      }
    });

    return result;
  }

  const galleryImageIds = () => {
    const list = [];

    metricsData.metrics.forEach(item => {
      if (item.fieldCategory === 'GALLERYIMAGE' && !list.includes(item.fieldId)) {
        list.push(item.fieldId);
      }
    })

    return list;
  }

  const getImagesVerdict = (metrics) => {
    const verdicts = metrics.map(item => item.verdict);

    if (!verdicts.length) {
      return '';
    } else if (verdicts.includes(AI_CHECK_VERDICTS.notSafety)) {
      return AI_CHECK_VERDICTS.notSafety;
    } else if (verdicts.includes(AI_CHECK_VERDICTS.warning)) {
      return AI_CHECK_VERDICTS.warning;
    } else {
      return AI_CHECK_VERDICTS.safety;
    }
  }

  const parseImageMetrics = () => {
    const { imageUrl, imageGallery } = detailsData;
    const result = [];

    const mainImageMetrics = metricsData.metrics.filter(item => item.fieldCategory === 'MAINIMAGE');
    if (mainImageMetrics.length) {
      const mainImage = {
        id: mainImageMetrics[0].fieldId,
        verdict: mainImageMetrics[0].verdict,
        imageUrl,
        items: mainImageMetrics
      }

      result.push(mainImage);
    }

    galleryImageIds().forEach(id => {
      result.push({
        id,
        verdict: metricsData.metrics.find(item => item.fieldId === id).verdict,
        imageUrl: (imageGallery.find(item => item.id === id) || {}).imageUrl || '',
        items: metricsData.metrics.filter(item => item.fieldId === id)
      })
    });

    setImagesVerdict(getImagesVerdict(result));

    return result;
  }

  return (
    <Box sx={{ width: '315px' }}>
      <Toolbar sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: '24px',
      }}>
        <Typography>Check AI Warnings</Typography>
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            color: 'black',
          }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </Toolbar>
      <Divider />

      {(!metricsData || metricsData.empty) && (
        <Typography sx={{ marginTop: '10px', textAlign: 'center', fontWeight: 'bold' }} component='p'>
          No data...
        </Typography>
      ) }

      {metricsData && !metricsData.empty && (
        <Box sx={{ padding: '16px 24px' }}>
          <LocalesTabs list={contentLocales} currentLocale={currentLocale} onChange={setCurrentLocale} />

          {titleMetrics[currentLocale] && (
            <>
              <FieldTitle name='Title' verdict={titleMetrics[currentLocale].verdict} />
              <MetricItems items={titleMetrics[currentLocale].items} />
            </>
          )}

          {textMetrics[currentLocale] && (
            <>
              <FieldTitle name='Main text' verdict={textMetrics[currentLocale].verdict} />
              <MetricItems items={textMetrics[currentLocale].items} />
            </>
          )}

          {imagesMetrics.length && (
            <>
              <FieldTitle name='Images' verdict={imagesVerdict} />
              <Images
                list={imagesMetrics}
                activeImageId={currentImage && currentImage.id}
                onClick={image => setCurrentImage(image)}
              />
              {currentImage && (
                <MetricItems items={currentImage.items}/>
              )}
            </>
          )}
        </Box>
      )}

    </Box>
  )
}


LocalesTabs.propTypes = {
  list: PropTypes.array,
  currentLocale: PropTypes.string,
  onChange: PropTypes.func,
}

FieldTitle.propTypes = {
  name: PropTypes.string,
  verdict: PropTypes.string,
}

MetricItem.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  metricDecision: PropTypes.string,
  value: PropTypes.number,
}

MetricItems.propTypes = {
  items: PropTypes.array,
}

Images.propTypes = {
  list: PropTypes.array,
  activeImageId: PropTypes.number,
  onClick: PropTypes.func,
}

AiCheckDetails.propTypes = {
  metricsData: PropTypes.object,
  onClose: PropTypes.func,
}

export default AiCheckDetails;
