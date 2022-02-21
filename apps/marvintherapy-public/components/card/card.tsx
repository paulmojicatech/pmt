import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typeography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

export const PmtCard = ({ cardTitle, cardDescription, isPartial }) => {
  if (isPartial) {
    return (
      <Card sx={{ width: '30%' }}>
        <CardContent>
          <Typeography
            gutterBottom
            sx={[{ fontSize: 18 }, { fontWeight: 600 }]}
          >
            {cardTitle}
          </Typeography>
          <Typeography>{cardDescription.substring(0, 250)}...</Typeography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  } else {
    return (
      <Card sx={{ width: '30%' }}>
        <CardContent>
          <Typeography
            gutterBottom
            sx={[{ fontSize: 18 }, { fontWeight: 600 }]}
          >
            {cardTitle}
          </Typeography>
          <Typeography>{cardDescription}</Typeography>
        </CardContent>
      </Card>
    );
  }
};

export default PmtCard;
