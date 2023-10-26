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

const Content = () => {
  const [branchesApiResponse, setBranchesApiResponse] = useState<ApiResponse<GetBranchesRsDTO[]> | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const baseUrl = "http://localhost:4000/repository-search/branches";
        const response = await Get<ApiResponse<GetBranchesRsDTO[]>>(`${baseUrl}`, {
          params: { repoName: "backend-onlinestore", page: 1, per_page: 100 },
        }); // Usa la URL que necesites
        setBranchesApiResponse(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error("Hubo un error al obtener los datos:", error);
        // Aquí puedes manejar los errores, como mostrar un mensaje al usuario
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
        <Grid item xs={12} md={6} lg={3}>
          <Paper className={scss.dataCard}>
            <CardBranches branches={branchesApiResponse?.data}/>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
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