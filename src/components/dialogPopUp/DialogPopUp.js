import { Fragment, forwardRef, useState } from 'react';
import {
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { setShowPopupGetPokeball } from '../../redux/slices/actionSlice';
import DOMPurify from 'dompurify';

const Transition = forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogPopUp = (props) => {
  const { isShowPopupGetPokeball, dialogDetail } = props;
  const { image, title, desc, btnText1, btnText2 } = dialogDetail;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(isShowPopupGetPokeball);

  const generateImage = () => {
    let componentImage = null;
    if (image) {
      componentImage = (
        <CardMedia
          component="img"
          sx={{ width: 180, height: 180, alignSelf: 'center', marginTop: '20px' }}
          image={image}
          alt={'poke-image'}
        />
      );
    }

    return componentImage;
  };

  const generateDesc = () => {
    let componentDesc = null;
    if (desc) {
      const sanitizedDesc = DOMPurify.sanitize(desc);
      componentDesc = (
        <DialogContent sx={{ textAlign: 'center' }}>
          <DialogContentText dangerouslySetInnerHTML={{ __html: sanitizedDesc }} />
        </DialogContent>
      );
    }

    return componentDesc;
  };

  const generateButton1 = () => {
    let componentButton = null;
    if (btnText1) {
      componentButton = (
        <Button variant="contained" value={open} onClick={handleClose}>
          {btnText1}
        </Button>
      );
    }

    return componentButton;
  };

  const generateButton2 = () => {
    let componentButton = null;
    if (btnText2) {
      componentButton = (
        <Button variant="outlined" value={open} onClick={handleClose}>
          {btnText2}
        </Button>
      );
    }

    return componentButton;
  };

  const handleClose = () => {
    setOpen(false);
    // Trigger close popup animation using timeout
    setTimeout(() => {
      dispatch(setShowPopupGetPokeball(false));
    }, 300);
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ minWidth: '500px' }}
        PaperProps={{ sx: { minWidth: '475px', borderRadius: '20px' } }}
      >
        {generateImage()}
        <DialogTitle sx={{ alignSelf: 'center' }}>{title}</DialogTitle>
        {generateDesc()}
        <DialogActions sx={{ justifyContent: 'center', paddingBottom: '20px' }}>
          {generateButton1()}
          {generateButton2()}
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DialogPopUp;
