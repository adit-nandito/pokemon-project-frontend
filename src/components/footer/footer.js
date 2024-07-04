import { Paper, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Paper
      id="Footer"
      sx={{
        display: 'flex',
        height: '35px',
        width: '100%',
        position: 'fixed',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px 6px 0px 0px'
      }}
      component="footer"
      square
      variant="outlined"
    >
      <Typography variant="caption">©SummerCry Project</Typography>
    </Paper>
  );
};

export default Footer;
