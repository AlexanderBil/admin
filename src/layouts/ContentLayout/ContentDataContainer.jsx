import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  allUsersFiltersState,
  contentFiltersState,
  contentState,
  idNft,
  isTilesState,
  authorNameState,
  bulkPublicationState,
} from 'store/contentStore';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  OutlinedInput,
  TablePagination,
  Typography,
} from '@mui/material';
import CardItem from './CardItem';
import { Search } from '@mui/icons-material';
import { useDebounce } from 'hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
import ContentTableContainer from './ContentTableContainer';
import GridViewIcon from '@mui/icons-material/GridView';
import ReorderIcon from '@mui/icons-material/Reorder';
import { styled } from '@mui/material/styles';
import { globalDetails } from 'store/invitationStore';
import ContentPublishModal from './ContentPublishModal';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const useStyles = makeStyles((theme) => ({
  searchBox: {
    display: 'flex',
    marginBottom: '20px',
    marginLeft: '15px',
    [theme.breakpoints.down('tablet')]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      marginRight: '15px'
    },
  },
  switcherBox: {
    display: 'flex',
    width: '300px',
    marginLeft: '40px',
    [theme.breakpoints.down('tablet')]: {
      marginLeft: '0px',
      order: '-1',
      width: '170px',
      position: 'absolute',
      top: '72px',
      right: '20px',
    },
  },
  filtersButton: {
    display: 'none',
    [theme.breakpoints.down('laptop')]: {
      display: 'flex',
      marginBottom: '15px',
      position: 'relative',
      top: '10px',
      left: '10px'
      
    },
  },
  contentTableBox: {
    paddingLeft: '15px',
    [theme.breakpoints.down('laptop')]: {
      paddingLeft: 0,
    },
  },
  paginationBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('laptop')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  tablePagination: {
    marginTop: 1,
    display: 'flex',
    [theme.breakpoints.down('laptop')]: {
      '& .css-168a8eu-MuiToolbar-root-MuiTablePagination-toolbar': {
        paddingLeft: '5px',
        paddingRight: '20px',

      },
      '& .MuiTablePagination-actions': {
        marginLeft: '0px',
        
      },
      '& .css-16c50h-MuiInputBase-root-MuiTablePagination-select': {
        marginRight: '10px',

      },
    },  
  },
}));

const CustomTabsButton = styled(Button)(({ theme }) => ({
  color: '#000',
  border: 'none',
  borderRadius: '0',
}));

const CustomButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: 16,
  border: '1px solid #bdbdbd',
  padding: '3px 20px 3px 20px',
  color: '#000',
  fontWeight: 400,
  '&:hover': {
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
}));

const ContentDataContainer = ({ showSidebarFilter, sidebarFilter }) => {
  const classes = useStyles();
  const [filters, setFilters] = useRecoilState(contentFiltersState);
  const { pagination, contentData } = useRecoilValue(contentState);
  const { keyword } = filters;
  const [searchInput, setSearchInput] = useState(keyword);
  const navigate = useNavigate();
  const setDetailsId = useSetRecoilState(idNft);
  const setAllUsersFilters = useSetRecoilState(allUsersFiltersState);
  const globalDetailsData = useRecoilValue(globalDetails);
  const tokenName = globalDetailsData.token?.unitName || '';
  const [isTiles, setIsTiles] = useRecoilState(isTilesState);
  const authorName = useRecoilValue(authorNameState);
  const [checkboxBulkState, setCheckboxBulkState] =
    useRecoilState(bulkPublicationState);
  const [openModal, setOpenModal] = useState(false);

  const [mainCheckbox, setMainCheckbox] = React.useState(false);
  const handleChangeCheckbox = (event) => {
    setMainCheckbox(event.target.checked);
  };

  const [singleBulkData, setSingleBulkData] = useState({});
  const [groupeBulkData, setGroupeBulkData] = useState({});
  const [singleBulkErrorData, setSingleBulkErrorData] = useState({});
  const [groupeBulkErrorData, setGroupeBulkErrorData] = useState({});
  const [switchPopapContent, setSwitchPopapContent] = useState(false);
  const [showDetails, setShowDetails] = React.useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
    setSwitchPopapContent(false);
    setMainCheckbox(false);
    setShowDetails(false);
    setCheckboxBulkState([]);
    setSingleBulkData({});
    setGroupeBulkData({});
    setSingleBulkErrorData({});
    setGroupeBulkErrorData({});
  };

  useEffect(() => {
    if (checkboxBulkState.length === 0) {
      setMainCheckbox(false);
    }
  }, [checkboxBulkState.length]);

  const handlePageChange = (e, page) =>
    setFilters((prevState) => ({ ...prevState, page }));

  const handlePageSizeChange = ({ target: { value } }) =>
    setFilters((prevState) => ({ ...prevState, page: 0, pageSize: value }));

  const handleChange = ({ target: { name, value } }) =>
    setFilters((prevState) => ({
      ...prevState,
      page: 0,
      [name]: value,
    }));

  const handleDeleteUserId = (id) => {
    const { creatorId, ...newArr } = filters;
    setFilters(newArr);
    setAllUsersFilters((prevState) => ({
      ...prevState,
      keyword: '',
    }));
  };

  const detailsHandler = (id) => {
    navigate(`/admin/content/${id}`);
    setDetailsId({ id });
  };

  const debounceSearch = useDebounce(handleChange, 500);
  const handleKeywordChange = (event) => {
    setSearchInput(event.target.value);
    debounceSearch(event);
  };

  const openModalHandler = () => {
    setOpenModal(true);
  };

  return (
    <Grid item mobileS={12} laptop={9.8}>
      <Button
        className={classes.filtersButton}
        onClick={showSidebarFilter}
        endIcon={!sidebarFilter && <KeyboardDoubleArrowRightIcon />}
        startIcon={sidebarFilter && <KeyboardDoubleArrowLeftIcon />}
      >
        Filters
      </Button>
      <Box className={classes.searchBox}>
        <OutlinedInput
          fullWidth
          sx={{ ml: 'auto', height: '45px' }}
          name='keyword'
          placeholder='Search by title'
          startAdornment={
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          }
          value={searchInput}
          onChange={handleKeywordChange}
        />
        <Box className={classes.switcherBox}>
          <CustomTabsButton
            startIcon={<GridViewIcon />}
            onClick={() =>
              setIsTiles((prev) => ({
                ...prev,
                value: true,
              }))
            }
            sx={{
              width: '50%',
              borderBottom: isTiles.value && '2px solid #1976d2',
            }}
          >
            Tiles
          </CustomTabsButton>
          <CustomTabsButton
            startIcon={<ReorderIcon />}
            onClick={() =>
              setIsTiles((prev) => ({
                ...prev,
                value: false,
              }))
            }
            sx={{
              width: '50%',
              borderBottom: !isTiles.value && '2px solid #1976d2',
            }}
          >
            List
          </CustomTabsButton>
        </Box>
      </Box>
      {filters.creatorId && (
        <Box
          onClick={() => handleDeleteUserId(contentData[0]?.id)}
          sx={{ paddingLeft: '15px', marginBottom: '20px' }}
        >
          <CustomButton endIcon={<CloseIcon />}>
            By: {authorName.first} {authorName.last}
          </CustomButton>
          {!contentData.length && (
            <Typography sx={{ marginTop: '20px' }} variant='h6'>
              No data...
            </Typography>
          )}
        </Box>
      )}
      {filters.statuses?.includes('Draft') && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            margin: '0px 0px 10px 15px',
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={mainCheckbox}
                onChange={handleChangeCheckbox}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label='Select/Unselect All'
          />
          {checkboxBulkState.length > 0 && (
            <Typography sx={{ marginRight: '10px' }}>
              (Selected: {checkboxBulkState.length})
            </Typography>
          )}

          <Button
            disabled={checkboxBulkState.length < 1 && true}
            onClick={() => openModalHandler()}
            sx={{ padding: '4px 20px' }}
            variant='contained'
          >
            Publish
          </Button>
        </Box>
      )}

      {isTiles.value ? (
        <Box sx={{ padding: '0px 15px 0px 15px' }}>
          <Grid container spacing={3}>
            {contentData.map((card) => (
              <Grid
                key={card.id}
                item
                mobileS={12}
                mobileL={6}
                tablet={4}
                laptop={3}
                laptopL={2.4}
              >
                <CardItem
                  detailsHandler={detailsHandler}
                  key={card.contentId}
                  card={card}
                  tokenName={tokenName}
                  mainCheckbox={mainCheckbox}
                />
              </Grid>
            ))}
          </Grid>
          {contentData.length !== 0 && (
            <Box className={classes.paginationBox}>
              <Typography
                sx={{
                  borderBottom: '1px solid grey',
                  marginLeft: { mobileS: '5px', tablet: '0px' },
                  marginTop: { mobileS: '10px', tablet: '0px' },
                }}
              >
                {' '}
                <span style={{ fontWeight: '500' }}>Total items:</span>{' '}
                {pagination.totalEntries}
              </Typography>
              <TablePagination
                className={classes.tablePagination}
                sx={{ marginTop: 1 }}
                component='div'
                rowsPerPageOptions={[15, 20, 25, 30]}
                count={pagination.totalEntries}
                rowsPerPage={pagination.pageSize}
                page={pagination.page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handlePageSizeChange}
              />
            </Box>
          )}
        </Box>
      ) : (
        <Box className={classes.contentTableBox}>
          <ContentTableContainer
            handlePageChange={handlePageChange}
            handlePageSizeChange={handlePageSizeChange}
            mainCheckbox={mainCheckbox}
          />
        </Box>
      )}
      <ContentPublishModal
        open={openModal}
        handleCloseModal={handleCloseModal}
        singleBulkData={singleBulkData}
        groupeBulkData={groupeBulkData}
        singleBulkErrorData={singleBulkErrorData}
        groupeBulkErrorData={groupeBulkErrorData}
        checkboxBulkState={checkboxBulkState}
        setSingleBulkData={setSingleBulkData}
        setGroupeBulkData={setGroupeBulkData}
        setSingleBulkErrorData={setSingleBulkErrorData}
        setGroupeBulkErrorData={setGroupeBulkErrorData}
        switchPopapContent={switchPopapContent}
        setSwitchPopapContent={setSwitchPopapContent}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
      />
    </Grid>
  );
};

export default ContentDataContainer;

ContentDataContainer.propTypes = {
  showSidebarFilter: PropTypes.func,
  sidebarFilter: PropTypes.bool,
};
