import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import { subjectData } from "../../../mock/mock-data";
import Style from "./ListSubject.module.scss";

const ListSubject = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortData] = useState([]);
  const [sortBy, setSortBy] = useState(""); // State to track the sorting field
  const [sortDirection, setSortDirection] = useState("asc"); // State to track the sorting direction

  useEffect(() => {
    // Filter subjects based on whether they have an id in the accounts array
    const user = JSON.parse(Cookies.get("user"));
    const filteredData = subjectData.filter(
      (subject) =>
        subject.accounts &&
        subject.accounts.some((account) => account.id == user?.id)
    );
    setData(filteredData);
  }, []);

  useEffect(() => {
    if (data !== null) {
      const sortedData = [...data].sort((a, b) => {
        const aValue = a[sortBy] || ""; // Use an empty string if the field is undefined
        const bValue = b[sortBy] || "";

        if (sortDirection === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
      setSortData(sortedData);
    }
  }, [data, sortBy, sortDirection]);

  const handleSort = (field) => {
    if (sortBy === field) {
      // Toggle sorting direction if clicking the same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set a new field to sort by and reset the direction to ascending
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  return (
    data !== null &&
    data.length > 0 && (
      <div className="container text-center">
        <h2 className="my-4">Danh sách môn học</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "20%" }}>
                  <TableSortLabel
                    active={sortBy === "name"}
                    direction={sortDirection}
                    onClick={() => handleSort("name")}
                  >
                    Subject Name
                  </TableSortLabel>
                </TableCell>
                <TableCell style={{ width: "35%" }}>Description</TableCell>
                <TableCell style={{ width: "15%" }}>
                  <TableSortLabel
                    active={sortBy === "minPrice"}
                    direction={sortDirection}
                    onClick={() => handleSort("minPrice")}
                  >
                    Minimum Price
                  </TableSortLabel>
                </TableCell>
                <TableCell style={{ width: "10%" }}>Status</TableCell>
                <TableCell style={{ width: "20%" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>{subject.description}</TableCell>
                  <TableCell>{subject.minPrice}</TableCell>
                  <TableCell>
                    {subject.status ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/subjects/${subject.id}/courses`}
                      className="buttonLink"
                    >
                      Q.lý khóa học
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  );
};

export default ListSubject;
