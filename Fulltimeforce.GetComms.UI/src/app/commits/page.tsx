"use client";
import { fetchCommitsDashboard } from "@/application/services/commits-api";
import { ApiResponse } from "@/common/domain/api-global-response";
import { GetCommitsRsDTO } from "@/common/domain/get-commits.interface";
import { Box, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import TableCommits from "@/components/Commits/Section/TableCommits";

const CommitsPage = () => {
  const [commits, setCommits] = useState<ApiResponse<GetCommitsRsDTO[]> | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedCommits = await fetchCommitsDashboard( 1, 5);
        setCommits(fetchedCommits);
      } catch (error) {
        console.error("Error while fetching API:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TableCommits commits={commits?.data}/>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CommitsPage