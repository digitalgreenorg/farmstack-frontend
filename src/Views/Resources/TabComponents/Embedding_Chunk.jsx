import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import CodeIcon from "@mui/icons-material/Code";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import style from "../resources.module.css";

const Embedding_Chunk = ({ collections }) => {
  return (
    <Box>
      <TableContainer
        className="mt-30"
        sx={{
          borderRadius: "12px",
        }}
        component={Paper}
      >
        <Box className={style.tableWrapper}>
          <Table sx={{}} stickyHeader aria-label="simple table">
            <TableHead
              sx={{
                "& .MuiTableCell-head": {
                  backgroundColor: "#F6F6F6",
                },
              }}
            >
              <TableRow>
                <TableCell align="left" sx={{ width: "77px" }}>
                  <span>
                    <Grid3x3Icon sx={{ margin: "0px 7px 3px 0px" }} />
                    Id
                  </span>
                </TableCell>
                <TableCell align="left">
                  <span>
                    <CodeIcon sx={{ margin: "0px 7px 3px 0px" }} />
                    Embeddings
                  </span>
                </TableCell>
                <TableCell align="left">
                  <span>
                    <TextSnippetIcon sx={{ margin: "0px 7px 4px 0px" }} />
                    Chunks
                  </span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {collections?.length > 0 ? (
                collections.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": {
                        backgroundColor: "#DEFFF1",
                      },
                    }}
                  >
                    <TableCell align="left" sx={{ verticalAlign: "top" }}>
                      {index + 1}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        maxWidth: "200px",
                        verticalAlign: "top",
                      }}
                    >
                      {row.embedding.join(", ").length > 300
                        ? `${row.embedding.join(", ").substr(0, 300)}...`
                        : row.embedding.join(", ")}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        maxWidth: "200px",
                        verticalAlign: "top",
                      }}
                    >
                      {row.document.length > 300
                        ? `${row.document.substr(0, 300)}...`
                        : row.document}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "18px",
                      fontWeight: "400",
                      lineHeight: 3,
                    }}
                    colSpan={12}
                  >
                    As of now, there are no embeddings available or you don't
                    have permission.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default Embedding_Chunk;
