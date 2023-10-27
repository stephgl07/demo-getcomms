"use client";
import { Box, Grid, Paper } from '@mui/material'
import React, { useEffect, useState } from "react";
import scss from "./Content.module.scss";
import CardBranches from './CardBranches/CardBranches';
import CardCommits from './CardCommits/CardCommits';
import CardWorkflowsRuns from './CardWorkflowsRuns/CardWorkflowsRuns';
import { GetBranchesRsDTO } from "@/common/domain/get-branches.interface";
import { ApiResponse } from "@/common/domain/api-global-response";
import { fetchBranchesDashboard } from "@/application/services/branches-api";
import { fetchCommitsDashboard } from '@/application/services/commits-api';
import { fetchWorkflowsDashboard } from '@/application/services/workflows-api';
import { GetCommitsRsDTO } from '@/common/domain/get-commits.interface';
import { GetWorkflowsRunsRsDTO } from '@/common/domain/get-workflowsruns.interface';

const Content = () => {
  const [branches, setBranches] = useState<ApiResponse<GetBranchesRsDTO[]> | null>(null);
  const [commits, setCommits] = useState<ApiResponse<GetCommitsRsDTO[]> | null>(null);
  const [workflows, setWorkflows] = useState<ApiResponse<GetWorkflowsRunsRsDTO[]> | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const [fetchedBranches, fetchedCommits, fetchedWorkflows] = await Promise.all([
          fetchBranchesDashboard(1, 5),
          fetchCommitsDashboard( 1, 5),
          fetchWorkflowsDashboard(1, 5)
        ]);
  
        setBranches(fetchedBranches);
        setCommits(fetchedCommits);
        setWorkflows(fetchedWorkflows);
      } catch (error) {
        console.error("Error while fetching APIs:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={7}>
          <Paper className={scss.dataCard} elevation={6}>
            <CardCommits commits={commits?.data}/>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <Paper className={scss.dataCard} elevation={6}>
            <CardBranches branches={branches?.data}/>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={scss.dataCard} elevation={6}>
            <CardWorkflowsRuns workflows={workflows?.data}/>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Content