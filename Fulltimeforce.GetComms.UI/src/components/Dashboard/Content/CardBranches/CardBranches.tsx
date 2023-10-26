import { GetBranchesRsDTO } from "@/common/domain/get-branches.interface";
import { Chip, List, ListItem, ListItemIcon, ListItemText, Skeleton, Typography } from "@mui/material";
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

  return (
    <>
      {
        branches ? (
          <Typography variant="h6" sx={{ pl: 1 }}>
            Branches
          </Typography>
        ) : (
          <Skeleton variant="text" height={30} />
        )
      }
      <Demo>
        <List dense={false}>
          {branches ? (
            branches.map((branch, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <AccountTreeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={branch.name}
                  />
                  <Chip label={branch.protected ? "Protected" : "Unprotected"} variant="outlined" color={branch.protected ? "success" : "error"} />
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
