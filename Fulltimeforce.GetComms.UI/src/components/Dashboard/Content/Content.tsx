"use client";
import { Box, Grid, Paper } from '@mui/material'
import { Get } from "@/common/infrastructure/handlers/api-requests";
import React, { useEffect, useState } from "react";
import scss from "./Content.module.scss";
import CardRepos from './CardRepos/CardRepos';
import CardBranches from './CardBranches/CardBranches';
import CardCommits from './CardCommits/CardCommits';
import CardWorkflowsRuns from './CardWorkflowsRuns/CardWorkflowsRuns';
import { GetBranchesRsDTO } from "@/common/domain/get-branches.interface";
import { ApiResponse } from "@/common/domain/api-global-response";
import { fetchBranches } from "@/application/services/branches-api";

const Content = () => {
  const [branchesApiResponse, setBranchesApiResponse] = useState<ApiResponse<GetBranchesRsDTO[]> | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchBranches("backend-onlinestore");
        setBranchesApiResponse(data);
      } catch (error) {
        console.error("Error while fetching Branches API:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          <Paper className={scss.dataCard}>
            <CardRepos/>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper className={scss.dataCard}>
            <CardBranches branches={branchesApiResponse?.data}/>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Paper className={scss.dataCard}>
            <CardCommits/>
          </Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} marginY={2}>
          <Paper className={scss.dataCard}>
            <CardWorkflowsRuns/>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Content