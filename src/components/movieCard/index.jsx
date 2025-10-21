import React, { useContext  } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { Link } from "react-router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Avatar from '@mui/material/Avatar';
import img from '../../images/film-poster-placeholder.png';

export default function MovieCard({ movie, action }) { 

  const { favorites, addToFavorites } = useContext(MoviesContext);
  const date = new Date(movie.release_date);
  const month = date.toLocaleString('default', { month: 'long' }).substring(0, 3);
  const dateString = date.getDate()+' '+month+' '+date.getFullYear();
  // Month-parsing code found at ----------> https://stackoverflow.com/questions/1643320/get-month-name-from-date 
  // reference used for Date class --------> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear
  //console.log(date);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };


  return (
    <Card>
      <CardHeader
        avatar={
          movie.favorite ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {movie.title}{" "}
          </Typography>
        }
      />

      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid size={{ xs: 6 }}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {dateString}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
      
        {action(movie)}
      
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
        
      </CardActions>

    </Card>
  );
}
