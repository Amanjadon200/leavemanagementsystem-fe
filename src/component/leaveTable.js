import React, { useState, useEffect } from 'react';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import axios from 'axios'; // Add axios import

const LeaveTable = () => {
    const [leaves, setLeaves] = useState([]);
    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/leave/getallleaves');
                console.log('Leaves:', response.data.data);
                setLeaves(response.data.data);
            } catch (error) {
                console.error('Error fetching leaves:', error);
            }
        };

        fetchLeaves();
    }, []);
    const renderStatus = (status) => {
        if (status === 'APPROVED') {
            return (
                <span style={{ color: 'green', fontWeight: 'bold' }}>
                    <DoneIcon /> {status}
                </span>
            );
        } else if (status === 'PENDING') {
            return (
                <span style={{ color: 'orange', fontWeight: 'bold' }}>
                    <HourglassEmptyIcon /> {status}
                </span>
            );
        }
    };
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead style={{ backgroundColor: '#212121', color: 'white' }}>
                    <TableRow>
                        <TableCell style={{ color: 'white' }}>Name</TableCell>
                        <TableCell style={{ color: 'white' }}>City</TableCell>
                        <TableCell style={{ color: 'white' }}>Applied Date</TableCell>
                        <TableCell style={{ color: 'white' }}>Start Date</TableCell>
                        <TableCell style={{ color: 'white' }}>End Date</TableCell>
                        <TableCell style={{ color: 'white' }}>Status</TableCell>
                        <TableCell style={{ color: 'white' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {leaves.map((leave, index) => (
                        <TableRow key={index}>
                            <TableCell>{leave.partnerId.name}</TableCell>
                            <TableCell>{leave.partnerId.city}</TableCell>
                            <TableCell>{leave.appliedDate}</TableCell>
                            <TableCell>{leave.startDate}</TableCell>
                            <TableCell>{leave.endDate}</TableCell>
                            <TableCell>{renderStatus(leave.status)}</TableCell>
                            <TableCell>
                                <IconButton>
                                    <EditIcon color="primary" />
                                </IconButton>
                                <IconButton>
                                    <DeleteIcon color="error" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LeaveTable;

