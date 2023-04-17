import React from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';



const ContentsCard = ({image, children}: any) => {
  return (
    <Card sx={{ width: 350, height: 350 }}>
      <CardMedia
        sx={{ height: 210 }}
        image={image}
        title="contents image"
      />
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

export default ContentsCard
