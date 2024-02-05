import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{
              background: "none",
              borderRadius: 0,
              ":hover": {
                background: "none",
              },
            }}
          >
            {open ? (
              <>
                {" "}
                <KeyboardArrowUpIcon />{" "}
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  Chunks
                </span>
              </>
            ) : (
              <>
                {" "}
                <KeyboardArrowDownIcon />
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                  Chunks
                </span>
              </>
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.query}
        </TableCell>
        <TableCell align="left">
          <div
            style={{
              display: "flex",
              height: "100px",
              minHeight: "100px",
              maxHeight: "100px",
              overflow: "auto",
            }}
          >
            {row.condensed_question}
          </div>
        </TableCell>
        <TableCell align="left">
          <div
            style={{
              display: "flex",
              height: "100px",
              minHeight: "100px",
              maxHeight: "100px",
              overflow: "auto",
            }}
          >
            {row.query_response}
          </div>
        </TableCell>
        <TableCell className="feedback_system" align="left">
          {row.feedback === "Liked" ? (
            <ThumbUpIcon className="thumbs_up" />
          ) : row.feedback === "Disliked" ? (
            <ThumbDownIcon color="error" className="thumbs_down" />
          ) : (
            "Not Available"
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Retrieved Chunks
              </Typography>
              {row.retrieved_chunks?.length > 0 ? (
                <Table size="small" aria-label="retrieved data">
                  <TableHead>
                    <TableRow>
                      <TableCell>Chunk Content</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.retrieved_chunks.map((chunk, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {chunk}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                "There are no chunks"
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function RetrievalTable({ data }) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
      <Table
        stickyHeader
        className="retrieval_table"
        aria-label="collapsible table"
      >
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "10%" }} />
            <TableCell
              style={{ width: "20%", maxHeight: "100px", overflow: "auto" }}
            >
              {"Query"}
            </TableCell>
            <TableCell
              align="left"
              style={{ width: "20%", maxHeight: "100px", overflow: "auto" }}
            >
              {"Condensed Query"}
            </TableCell>
            <TableCell
              align="left"
              style={{ width: "30%", maxHeight: "100px", overflow: "auto" }}
            >
              {"Query Response"}
            </TableCell>
            <TableCell
              align="left"
              style={{ width: "20%", maxHeight: "100px", overflow: "auto" }}
            >
              {"Feedback"}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
