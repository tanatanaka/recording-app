import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const ContentsCard = ({ image, children }: any) => {
  return (
    <Card
      sx={{
        width: "29%",
        minWidth: "300px",
        height: "auto",
        borderRadius: "5px",
      }}
    >
      <div style={{ width: "95%", display: "flex", margin: "0 auto" }}>
        <CardMedia
          component="img"
          height="auto"
          image={image}
          alt="contents image"
        />
      </div>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default ContentsCard;
