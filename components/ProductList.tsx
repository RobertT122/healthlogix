import { Typography, Grid, Card, CardMedia} from "@mui/material";

export default function ProductList({products}) {
  return (
    <Card sx={{m: 2, py: 2, px: 1}}>
      <Grid container spacing={2}  justifyContent="center">
      {products.map( (product) => {
        return(
          <ProductListItem product={product}/>
        )
      })}
      </Grid>
    </Card>

  )
}

function ProductListItem({ product: { name, imageURL } }){
  return (
    <Grid item >
      <Card>

        <Typography 
          variant='h5'
          align="center"
          sx={{m:1}}
        >
          {name}
        </Typography>

        <CardMedia 
          component="img" 
          image={imageURL}
          sx={{
            objectFit: "cover",
            height: 200,
            width: 200,
            aspectRatio: 1,
            m: 1,
            borderRadius: 2,
          }}
        />
      </Card>
    </Grid>
  )
}