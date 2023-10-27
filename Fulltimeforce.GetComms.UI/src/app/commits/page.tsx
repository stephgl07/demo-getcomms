"use client";
import { fetchCommitsDashboard } from "@/application/services/commits-api";
import { ApiResponse } from "@/common/domain/api-global-response";
import { GetCommitsRsDTO } from "@/common/domain/get-commits.interface";
import { Box, Grid, Pagination, Paper, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import TableCommits from "@/components/Commits/Section/TableCommits";

const CommitsPage = () => {
  const [page, setPage] = useState<number> (1);
  const [commits, setCommits] = useState<ApiResponse<GetCommitsRsDTO[]> | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedCommits = await fetchCommitsDashboard();
        setCommits(fetchedCommits);
      } catch (error) {
        console.error("Error while fetching API:", error);
      }
    }
    fetchData();
  }, []);

  const totalPages = Math.ceil((commits?.data.length || 0) / 10);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <Box sx={{pt: 5}}>
      <TableCommits commits={commits?.data}/>
      <Stack alignItems="center" spacing={2} sx={{pt: 5}}>
        <Pagination count={totalPages} variant="outlined" shape="rounded" size="large" page = {page} onChange={(e, value) => handleChange}/>
      </Stack>
    </Box>
  )
}

export default CommitsPage