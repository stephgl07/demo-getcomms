import { GetBranchesRsDTO } from "@/common/domain/get-branches.interface";
import { List, ListItem, ListItemIcon, ListItemText, Skeleton, Typography } from "@mui/material";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { styled } from "@mui/material/styles";
import React from "react";

export type CardBranchesProps = {
  branches?: GetBranchesRsDTO[] | null;
};

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const CardBranches = (props: CardBranchesProps) => {
  const { branches } = props;
  const [dense] = React.useState(false);
  const [secondary] = React.useState(false);

  return (
    <>
      <Typography variant="h6" sx={{pl: 1}}>Branches</Typography>
      <Demo>
        <List dense={dense}>
          {branches ? (
            branches.map((branch, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <AccountTreeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={branch.name}
                    secondary={secondary ? branch.commit_sha : null}
                  />
                </ListItem>
              ))
          ) : (
            <Skeleton variant="rounded" height={150} />
          )}
        </List>
      </Demo>
    </>
  );
};

export default CardBranches;
