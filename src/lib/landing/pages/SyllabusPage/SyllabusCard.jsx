import { Box, Grid, Stack, Typography } from "@mui/material";
import { YouTubeVideo } from "src/ui/YouTubeVideo";
import { Carousel } from "../../components";
import { ArrowButton } from "src/ui";
import { StyledCard } from "./SyllbusPage.styles";
import "./Carousel.css";

import htmlCssImg from "../../../../assets/html-css.png";
import expressImg from "../../../../assets/express.png";
import gitImg from "../../../../assets/git-github.png";
import jsImg from "../../../../assets/js.png";
import reactImg from "../../../../assets/react.png";

const imageMap = {
  "/assets/html-css.png": htmlCssImg,
  "/assets/express.png": expressImg,
  "/assets/git-github.png": gitImg,
  "/assets/js.png": jsImg,
  "/assets/react.png": reactImg,
};

const carouselSettings = {
  slidesToScroll: 1,
  slidesToShow: 1,
  infinite: false,
  style: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
};

export const SyllabusCard = ({
  youtubeVideoIDs,
  exercise,
  subject,
  index,
  image,
}) => {
  return (
    <Grid
      item
      xs={12}
      sm={10}
      md={6}
      lg={4}
      display={"flex"}
      alignItems={"center"}
    >
      <StyledCard key={index}>
        <Typography p={2} fontWeight={900} variant="h4">
          Week {index + 1}
        </Typography>

        <div
          style={{
            width: youtubeVideoIDs.length > 1 ? "100%" : "80%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Carousel settings={carouselSettings}>
            <Box key="placeholder" style={{ width: "100%" }}>
              <Box
                component="img"
                src={imageMap[image?.trim()]}
                alt={`${subject} placeholder`}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </Box>
            {youtubeVideoIDs?.map((videoId, idx) => (
              <Box key={idx} style={{ width: "100%" }}>
                <YouTubeVideo
                  videoId={videoId}
                  width={"100%"}
                  height={"300px"}
                />
              </Box>
            ))}
          </Carousel>
        </div>
        <Stack p={2} display={"flex"} alignItems={"center"}>
          <h2>{subject}</h2>
          <ArrowButton
            href={exercise}
            target="_blank"
            sx={{ whiteSpace: "nowrap" }}
          >
            <Typography fontWeight={900} variant="body1">
              Start Challenge
            </Typography>
          </ArrowButton>
        </Stack>
      </StyledCard>
    </Grid>
  );
};
