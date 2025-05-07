import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import StarIcon from '@mui/icons-material/Star';

const BookCard = ({ book, large = false, detailed = false }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={i} sx={{ color: '#fbc02d', fontSize: large ? 22 : 18 }} />);
    }

    if (hasHalfStar) {
      stars.push(<StarIcon key="half" sx={{ color: '#fbc02d', fontSize: large ? 22 : 18, opacity: 0.5 }} />);
    }

    return stars;
  };

  return (
    <Card
      sx={{
        display: 'flex',
        width: '100%',
        height: large ? 260 : 200,
        boxShadow: '12px',
        backgroundColor: 'var(--background)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <CardMedia
        component="img"
        image={book.image}
        alt={book.title}
        sx={{
          width: large ? 200 : 150,
          height: '100%',
          objectFit: 'cover',
          // backgroundColor: 'var(--beige-100)',
        }}
      />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 2,
          width: '100%',
        }}
      >
        <div>
          <Typography gutterBottom variant={large ? 'h5' : 'h6'} component="div">
            {book.title}
          </Typography>

          <Typography
            variant="caption"
            sx={{ display: 'block', textAlign: 'right', color: 'gray', mb: 1 }}
          >
            {book.author}
          </Typography>

          <div style={{ display: 'flex', gap: 2, alignItems: 'center', marginBottom: 4 }}>
            {renderStars(book.rating)}
          </div>

          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: detailed ? 8 : 4,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: large ? '1rem' : '0.875rem',
            }}
          >
            {book.description}
          </Typography>
        </div>

        <CardActions
          sx={{
            padding: 0,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default BookCard;
