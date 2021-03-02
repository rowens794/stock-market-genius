/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Flex, Box, Image, Text, Heading, Link } from "theme-ui";
import { FaTwitter, FaGithub, FaDribbble } from "react-icons/fa";

const TeamMember = ({ member }) => {
  return (
    <Box sx={styles.section}>
      <Flex as="figure" sx={styles.avatar}>
        <div>
          <Image src={member?.avatar} alt={member?.name} sx={styles.image} />
        </div>
      </Flex>
      <Box sx={styles.about}>
        <Heading as="h3">{member?.name}</Heading>
        <Text as="p">{member?.designation}</Text>
      </Box>
    </Box>
  );
};

export default TeamMember;

const styles = {
  avatar: {
    alignItems: "center",
    justifyContent: "center",
  },
  about: {
    mt: [4],
    textAlign: ["center", null, null, "left"],
    h3: {
      color: "heading",
      fontFamily: "body",
      fontSize: [3, null, 17, null, 4],
    },
    p: {
      color: "#7589A1",
      letterSpacing: "-0.2px",
      mt: [2],
    },
  },
  socialLinks: {
    display: "flex",
    alignItems: "center",
    justifyContent: ["center", null, null, "left"],
    mt: [3],
    a: {
      display: "inline-flex",
      mr: [2],
    },
  },
  image: {
    borderRadius: "10px",
    WebkitBoxShadow: "5px 5px 10px -3px rgba(0,0,0,0.4)",
    boxShadow: "5px 5px 10px -3px rgba(0,0,0,0.4)",
    filter: "brightness(95%) grayscale(10%)",
  },
};
