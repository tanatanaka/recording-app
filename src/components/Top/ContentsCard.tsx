import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const ContentsCard = ({ sx, image, children }: any) => {
  return (
    <Card sx={{ width: 390, height: 370, borderRadius: "5px" }}>
      <CardMedia
        component="img"
        sx={sx}
        height="240"
        image={image}
        alt="contents image"
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default ContentsCard;
