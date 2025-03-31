import { Button, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { isOpenModalCanselOrResume } from 'store/invitationStore';
import { useSetRecoilState } from 'recoil';

export const CancelResumeForm = ({
  cancelOrResume,
  cancelHandler,
  resumeHandler,
}) => {
  const setOpenModal = useSetRecoilState(isOpenModalCanselOrResume);

  const successHandler = () => {
    setOpenModal(false);
    cancelOrResume ? cancelHandler() : resumeHandler();
  };

  return (
    <Box
      style={{
        display: 'grid',
        gridRowGap: '20px',
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

CancelResumeForm.propTypes = {
  cancelHandler: PropTypes.func,
  resumeHandler: PropTypes.func,
  cancelOrResume: PropTypes.bool,
};
