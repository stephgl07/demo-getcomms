import { GetWorkflowsRunsRsDTO } from "@/common/domain/get-workflowsruns.interface";
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
  Chip,
  Grid,
  styled,
  Skeleton,
} from "@mui/material";
import * as React from "react";
import { Typography } from "@mui/material";
import { capitalize } from "@/application/utils/stringUtils";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DateRangeIcon from "@mui/icons-material/DateRange";
import TimerIcon from '@mui/icons-material/Timer';
import shortcodeToEmoji from "@/application/utils/emojis/gitmojis.handler";

export type CardWorkflowsRunsProps = {
  workflows?: GetWorkflowsRunsRsDTO[] | null;
};

const Item = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const CardWorkflowsRuns = (props: CardWorkflowsRunsProps) => {
  const { workflows } = props;
  return (
    <>
      {workflows ? (
        <Box>
          <Typography variant="h6" sx={{ pl: 1 }}>
            Workflows
          </Typography>
          <TableContainer component={Box}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Runs</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Conclusion</TableCell>
                  <TableCell>Attemps</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workflows &&
                  workflows.map((workflow) =>
                    workflow.runs.map((run) => (
                      <TableRow key={run.head_sha}>
                        <TableCell>
                          <Grid container sx={{alignItems: "center"}}>
                            <Grid item xs={8}>
                              <Box>
                                <Typography
                                  sx={{ fontWeight: 900, fontSize: "1.10rem" }}
                                >
                                  {shortcodeToEmoji(run.display_title)}
                                </Typography>
                                <Typography variant="body2">
                                  {workflow.name}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Chip
                                icon={<AccountTreeIcon />}
                                label={run.head_branch}
                                variant="outlined"
                              />
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={capitalize(run.status)}
                            variant="outlined"
                            color={
                              run.status == "completed" ? "success" : "info"
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={capitalize(run.conclusion ?? "pending")}
                            color={
                              (()=>{
                                if(!run.conclusion ) return "info"
                                if(run.conclusion == "success") return "success"
                                else{
                                  return "error"
                                }
                              })()
                            }
                          />
                        </TableCell>
                        <TableCell>{run.run_attempt}</TableCell>
                        <TableCell>
                          <Grid sx={{alignItems: "center"}} spacing={1} container>
                            <Grid item xs={2}>
                              <DateRangeIcon />
                            </Grid>
                            <Grid item xs={10}>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontWeight: 900,
                                    display: "center",
                                  }}
                                >
                                  {run.date_created}
                                </Typography>

                            </Grid>
                          </Grid>
                          <Grid sx={{alignItems: "center"}} spacing={1} container>
                            <Grid item xs={2}>
                              <TimerIcon />
                            </Grid>
                            <Grid item xs={10}>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontWeight: 900,
                                    display: "center",
                                  }}
                                >
                                  {run.duration}
                                </Typography>

                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box>
          <Skeleton variant="text" height={30} />
          <Box sx={{ pt: 1, pb: 1 }}>
            <Skeleton variant="rounded" height={150} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default CardWorkflowsRuns;
