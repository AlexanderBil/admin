import { Checkbox } from '@mui/material';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { bulkPublicationState, contentFiltersState } from 'store/contentStore';
import PropTypes from 'prop-types';

const CheckboxTableCell = ({ mainCheckbox, contentId }) => {
  const filters = useRecoilValue(contentFiltersState);

  const [checkedState, setCheckboxBulkState] = useRecoilState(bulkPublicationState);

  useEffect(() => {
    if (mainCheckbox) {
      if(checkedState.includes(contentId)) {
        return
      } else {
        setCheckboxBulkState((prev) => [...prev, contentId]);
      }
    }
    if (!mainCheckbox) {
      setCheckboxBulkState([]);
    }
  }, [mainCheckbox]);

  const handleChange = (event) => {
    if(checkedState.includes(contentId)) {
      setCheckboxBulkState((prev) =>
        prev.filter((item) => item !== contentId)
      );
    } else {
      setCheckboxBulkState((prev) => [...prev, contentId]);
    }
  };

  return (
    filters.statuses?.includes('Draft') && (
      <Checkbox
      sx={{ padding: 0 }}
      checked={checkedState.includes(contentId)}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
    )
  );
};

export default CheckboxTableCell;

CheckboxTableCell.propTypes = {
  mainCheckbox: PropTypes.bool,
  contentId: PropTypes.number,
};
