"use client";
import { fetchCommitsDashboard, fetchCommitsPerBranch } from "@/application/services/commits-api";
import { ApiResponse } from "@/common/domain/api-global-response";
import { GetCommitsRsDTO } from "@/common/domain/get-commits.interface";
import { Box, Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import TableCommits from "@/components/Commits/Section/TableCommits";
import { GetBranchesRsDTO } from "@/common/domain/get-branches.interface";
import { fetchBranchesDashboard } from "@/application/services/branches-api";
import FormTableFilter from "@/components/Commits/FormFilters/FormTableFilter";

const CommitsPage = () => {
  const [page, setPage] = useState<number> (1);
  const [commits, setCommits] = useState<ApiResponse<GetCommitsRsDTO[]> | null>(null);
  const [branches, setBranches] = useState<ApiResponse<GetBranchesRsDTO[]> | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);


  useEffect(() => {
    async function fetchData() {
      try {
        const [fetchedBranches, fetchedCommits] = await Promise.all([
          fetchBranchesDashboard(),
          fetchCommitsDashboard(1, 5),
        ]);
  
        setBranches(fetchedBranches);
        setCommits(fetchedCommits);
      } catch (error) {
        console.error("Error while fetching API:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedBranch) {
      fetchCommitsPerBranch(selectedBranch, 1, 6).then(newCommits => {
        setCommits(newCommits);
      }).catch(error => {
        console.error("Error fetching commits for branch:", error);
      });
    }
  }, [selectedBranch]);

  useEffect(() => {
    const valBranch = selectedBranch ? selectedBranch : "main";
    fetchCommitsPerBranch(valBranch, page, 6).then(newCommits => {
      const newerCommits: ApiResponse<GetCommitsRsDTO[]> = {
        statusCode: newCommits?.statusCode ?? 0,
        data: (newCommits?.data && commits?.data) ? commits.data.concat(newCommits.data) : newCommits.data
      }
      setCommits(newerCommits); 
    }).catch(error => {
      console.error("Error fetching commits for branch:", error);
    });
  }, [page]);

  const handlePageChange = (value: number) => {
    setPage(value+1);
  }

  return (
    <Box sx={{pt: 5}}>
      <FormTableFilter branches={branches?.data} onBranchChange={setSelectedBranch}/>
      <TableCommits commits={commits?.data}/>
      <Stack alignItems="center" spacing={2} sx={{pt: 5}}>
        <Button color="secondary" variant="contained" onClick={()=>handlePageChange(page)}>View more</Button>
      </Stack>
    </Box>
  )
}

export default CommitsPage