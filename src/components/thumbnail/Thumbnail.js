import { Card, CardActionArea, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

const Thumbnail = (props) => {
  const { index, id, image } = props;
  return (
    <Card key={index} sx={{ display: 'inline-grid', margin: 10 / 8, width: 180 }}>
      <Link to={`/detail/${id}`}>
        <CardActionArea>
          <CardMedia component="img" height="180" image={image} alt={id} />
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default Thumbnail;
