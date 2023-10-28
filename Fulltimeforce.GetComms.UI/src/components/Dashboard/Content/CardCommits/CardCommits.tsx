import {
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { GetCommitsRsDTO } from "@/common/domain/get-commits.interface";
import shortcodeToEmoji from "@/application/utils/emojis/gitmojis.handler";

export type CardCommitsProps = {
  commits?: GetCommitsRsDTO[] | null;
};

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const CardCommits = (props: CardCommitsProps) => {
  const { commits } = props;

  return (
    <>
      {
        commits ? (
          <Typography variant="h6" sx={{ pl: 1 }}>
            Commits
          </Typography>
        ) : (
          <Skeleton variant="text" height={30} />
        )
      }
      <Demo>
        <List dense={false}>
          {commits ? (
            commits.map((commit, index) => (
              <React.Fragment key={index}>
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar alt={commit.commit.author.name} src={commit.commit.author.avatar_url}>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={shortcodeToEmoji(commit.commit.message)} secondary={
                    <span>
                      <Chip component="span" size="small" label={commit.commit.author.user_name} />
                      <Typography variant="body2" sx={{pl:1}} component="span">{commit.commit.author.date}</Typography>
                    </span>
                  }  />
                </ListItem>
                <Divider variant="fullWidth" component="li" />
              </React.Fragment>
            ))
          ) : (
            <Skeleton variant="rounded" height={150} />
          )}
        </List>
      </Demo>
    </>
  );
};

export default CardCommits;
