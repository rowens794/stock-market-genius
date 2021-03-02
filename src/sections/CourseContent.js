/** @jsxRuntime classic */
/** @jsx jsx */
import { useRef, useState, useEffect } from "react";
import { jsx, Box, Container, Image } from "theme-ui";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionHeading from "components/section-heading";
import TeamMember from "components/cards/team-member";

import screenshot1 from "assets/images/video.jpg";
import screenshot2 from "assets/images/Docs.jpg";
import screenshot3 from "assets/images/Tips.jpg";
import screenshot4 from "assets/images/software.jpg";
import arrowRight from "assets/images/icons/arrow-right.png";

SwiperCore.use([Navigation, Pagination]);

const data = [
  {
    id: 1,
    avatar: screenshot1,
    name: "75 Minutes of Video Content",
    designation: "Each lesson contains 3 short (5-7 minutes) and entertaining videos explaining the core concepts.",
  },
  {
    id: 2,
    avatar: screenshot2,
    name: "Engaging Stories",
    designation:
      "Following the video content for each lesson you and your child will be presented with a case study and worksheet to cement the ideas that were learned in the videos.",
  },
  {
    id: 3,
    avatar: screenshot3,
    name: "Tips From a Real Market Pro",
    designation:
      "In addition to the case studies, I provide real world data sources I used as an institutional investment advisor managing over $2 billion in client assets.",
  },
  {
    id: 4,
    avatar: screenshot4,
    name: "Real World Trading Simulation",
    designation:
      "The course is capstoned with a trading simulation that incorporates real world data and decision points into a multi-day exercies that will give your child a taste or real world trading.",
  },
];

const OurTeam = () => {
  const swiperRef = useRef(null);
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerOffset, setContainerOffset] = useState({
    left: null,
    top: null,
  });

  const isEnd = swiperRef?.current?.swiper?.isEnd;

  const handlePrev = () => {
    swiperRef?.current?.swiper?.slidePrev();
    setInterval(() => {
      setCurrentIndex(swiperRef?.current?.swiper?.activeIndex);
    }, 100);

    clearInterval();
  };
  const handleNext = () => {
    swiperRef?.current?.swiper?.slideNext();
    setInterval(() => {
      setCurrentIndex(swiperRef?.current?.swiper?.activeIndex);
    }, 100);

    clearInterval();
  };

  useEffect(() => {
    setContainerOffset({
      left: containerRef.current.offsetLeft,
      top: containerRef.current.offsetTop,
    });
  }, [containerRef]);

  const breakpoints = {
    0: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1601: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  };

  return (
    <Box as="section" id="structure" sx={styles.section}>
      <Container ref={containerRef}>
        <SectionHeading
          sx={styles.heading}
          title="Lesson Structure"
          description="Each of the four lessons is structured in a way that easily digestable and fun to complete."
        />
      </Container>
      <Box
        sx={{
          ml: currentIndex === 0 ? containerOffset?.left : 0,
          ...styles.teamWrapper,
        }}
      >
        {currentIndex !== 0 && (
          <button onClick={handlePrev} className="swiper-arrow swiper-arrow-left button">
            <Image src={arrowRight} alt="arrow left" />
          </button>
        )}
        {!isEnd && (
          <button className="swiper-arrow swiper-arrow-right button" onClick={handleNext}>
            <Image src={arrowRight} alt="arrow right" />
          </button>
        )}

        <Swiper ref={swiperRef} spaceBetween={30} watchSlidesVisibility={true} slidesPerView={2} breakpoints={breakpoints}>
          {data?.map((item) => (
            <SwiperSlide key={item.id}>
              <TeamMember member={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default OurTeam;

const styles = {
  section: {
    pt: [11],
    pb: [11, null, null, 12, null, 14],
  },
  heading: {
    p: {
      maxWidth: 500,
      m: "10px auto 0",
    },
  },
  teamWrapper: {
    position: "relative",
    pl: [6],
    pr: [6, null, null, 0],
    transition: "0.3s ease-in-out 0s",
    ".swiper-arrow": {
      backgroundColor: "#F3F4F5",
      border: 0,
      cursor: "pointer",
      padding: 0,
      display: "flex",
      width: [30, null, null, null, 40, 60],
      height: [30, null, null, null, 40, 60],
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0px 7px 14px rgba(25, 60, 101, 0.06)",
      borderRadius: "50%",
      position: "absolute",
      zIndex: 2,
      top: "calc(50% - 40px)",
      transform: "translateY(-50%)",
      outline: 0,
      img: {
        maxWidth: [8, 10, null, null, "100%"],
      },
    },
    ".swiper-arrow-left": {
      left: [3, null, null, null, 20, 50],
      img: {
        transform: "rotate(180deg)",
        marginLeft: "-4px",
      },
    },
    ".swiper-arrow-right": {
      right: [3, null, null, null, 20, 50],
      img: {
        marginRight: "-4px",
      },
    },
    ".button": {
      WebkitBoxShadow: "5px 5px 10px -3px rgba(0,0,0,0.6)",
      boxShadow: "5px 5px 10px -3px rgba(0,0,0,0.6)",
      filter: "brightness(90%) grayscale(0%)",
    },
  },
};
