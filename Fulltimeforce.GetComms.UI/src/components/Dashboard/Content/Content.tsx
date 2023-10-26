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
        const fetchedBranches = await fetchBranchesDashboard("backend-onlinestore", 1,5);
        setBranches(fetchedBranches);
        const fetchedCommits = await fetchCommitsDashboard("backend-onlinestore", 1, 5);
        setCommits(fetchedCommits);
        const fetchedWorkflows = await fetchWorkflowsDashboard("backend-onlinestore", 1,5);
        setWorkflows(fetchedWorkflows);
      } catch (error) {
        console.error("Error while fetching APIs:", error);
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
            <CardBranches branches={branches?.data}/>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Paper className={scss.dataCard}>
            <CardCommits commits={commits?.data}/>
          </Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} marginY={2}>
          <Paper className={scss.dataCard}>
            <CardWorkflowsRuns workflows={workflows?.data}/>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Content