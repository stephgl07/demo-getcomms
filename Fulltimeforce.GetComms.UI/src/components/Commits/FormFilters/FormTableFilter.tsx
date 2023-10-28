import { Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { GetBranchesRsDTO } from "@/common/domain/get-branches.interface";


export type FormTableFilterProps = {
  branches?: GetBranchesRsDTO[] | null;
  onBranchChange: (branch: string) => void;
};

const FormTableFilter = (props: FormTableFilterProps) => {
  const { branches } = props;
  const [branch, setBranch] = React.useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    //const selectedValue = event.target.value as string;
    const indexSelectedBranch: number = +(event.target.value as string);
    const actualSelectedBranch: number = +(branch);
    console.log("index", indexSelectedBranch)
    if(branches){
      if(branches[indexSelectedBranch].commit_sha !== branches[actualSelectedBranch].commit_sha){
        console.log("value changed, make request");
        const sha: GetBranchesRsDTO = branches[indexSelectedBranch];
        props.onBranchChange(sha.commit_sha);
      }
      setBranch(indexSelectedBranch.toString());
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <FormControl variant="filled" fullWidth sx={{pb: 5}}>
          <InputLabel id="demo-simple-select-label">Branch</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={branch}
            label="Branch"
            onChange={handleChange}
          >
            {branches?.map((branch, index) => (
                <MenuItem key={branch.name} value={index}>
                  {branch.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default FormTableFilter;
