import { useId, useRef, useState } from "react";
import { GitHub, LinkedIn } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";

import {
  TeamMemberCardContainer,
  CardToggle,
  CardFlip,
  CardFace,
  MemberAvatar,
} from "./TeamMemberCard.style";

const TeamMemberCard = ({
  profileImage,
  name,
  role,
  title,
  about,
  linkedin,
  gitHub,
  legacy = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const toggleRef = useRef(null);
  const detailsId = useId();

  const memberRole = role || title || about || "Mentor";

  const socialLinks = [
    { label: "LinkedIn", href: linkedin, Icon: LinkedIn },
    { label: "GitHub", href: gitHub, Icon: GitHub },
  ].filter(({ href }) => href);

  const initials = name
    ?.split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <TeamMemberCardContainer
      component="article"
      aria-label={name}
      data-legacy={legacy ? "true" : undefined}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setIsFlipped(true);
      }}
      onPointerLeave={() => {
        setIsFlipped(false);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsFlipped(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setIsFlipped(false);
          toggleRef.current.focus();
        }
      }}
    >
      <CardToggle
        ref={toggleRef}
        type="button"
        aria-label={`${isFlipped ? "Hide" : "Show"} details for ${name}`}
        aria-expanded={isFlipped}
        aria-controls={detailsId}
        onClick={() => setIsFlipped((prev) => !prev)}
      />

      <CardFlip data-flipped={isFlipped}>
        <CardFace className="card-face" aria-hidden={isFlipped}>
          <MemberAvatar src={profileImage} alt="">
            {initials}
          </MemberAvatar>

          <Typography
            component="h3"
            variant="h5"
            fontWeight={900}
            color="primary"
          >
            {name}
          </Typography>
        </CardFace>

        <CardFace
          className="card-face card-back"
          id={detailsId}
          aria-hidden={!isFlipped}
        >
          <Typography component="p" variant="subtitle1" fontWeight={600}>
            {legacy ? "Legacy Mentor" : memberRole}
          </Typography>

          <Stack direction="row" justifyContent="center" spacing={2}>
            {socialLinks.map(({ label, href, Icon }) => (
              <IconButton
                key={label}
                component="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} on ${label} (opens in a new tab)`}
                tabIndex={isFlipped ? 0 : -1}
                color="primary"
              >
                <Icon fontSize="large" />
              </IconButton>
            ))}
          </Stack>
        </CardFace>
      </CardFlip>
    </TeamMemberCardContainer>
  );
};

export default TeamMemberCard;
