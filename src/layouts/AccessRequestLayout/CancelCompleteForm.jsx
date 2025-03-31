import { Button, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { isOpenModalCanselOrComplete } from 'store/accessRequestStore';
import { useSetRecoilState } from 'recoil';

export const CancelCompleteForm = ({
  cancelOrResume,
  cancelHandler,
  resumeHandler,
}) => {
  const setOpenModal = useSetRecoilState(isOpenModalCanselOrComplete);

  const successHandler = () => {
    setOpenModal(false);
    cancelOrResume ? cancelHandler() : resumeHandler();
  };

  return (
    <Box
      style={{
        display: 'grid',
        gridRowGap: '20px',
        textAlign: 'center'
      }}
    >
      <Typography variant='h6'> Are you sure? </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '250px',
          margin: '0 auto',
        }}
      >
        <Button
          sx={{ marginTop: '20px', padding: '10px 40px 10px 40px' }}
          onClick={successHandler}
          variant={'contained'}
        >
          Yes
        </Button>

        <Button
          sx={{ marginTop: '20px', padding: '10px 40px 10px 40px' }}
          onClick={() => setOpenModal(false)}
          color='error'
          variant={'contained'}
        >
          No
        </Button>
      </Box>
    </Box>
  );
};

CancelCompleteForm.propTypes = {
  cancelHandler: PropTypes.func,
  resumeHandler: PropTypes.func,
  cancelOrResume: PropTypes.bool,
};
