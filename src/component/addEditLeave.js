import React, { useEffect, useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Box, Snackbar } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';
import { add, set } from 'date-fns';
import { SimpleSnackbar } from './tooltip';

const AddEditLeave = () => {
    const [walker, setWalker] = useState('');
    const [reason, setReason] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [slotType, setSlotType] = useState('');
    const [removePenalty, setRemovePenalty] = useState(false);
    const [parterns, setPartners] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');
    // const [setWalkerId, setWalkerId] = useState('')
    const timeSlots = [
        '6:00 - 7:00',
        '7:00 - 8:00', '8:00 - 9:00', '9:00 - 10:00',
        '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00',
        '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00',
        '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00',
        '19:00 - 20:00', '20:00 - 21:00', '21:00 - 22:00',
    ];
    const isSingleDay = startDate && endDate && startDate.toDateString() === endDate.toDateString();
    console.log('isSingleDay:', isSingleDay);
    const addLeave = async () => {
        const newStartDate = startDate ? add(startDate, { hours: 5, minutes: 30 }) : null;
        const newEndDate = endDate ? add(endDate, { hours: 5, minutes: 30 }) : null;

        const leaveData = {
            partnerId: walker,  // Assuming walker corresponds to partnerId
            startDate: newStartDate.toISOString(),// add 5:30 hours to the date
            endDate: newEndDate.toISOString(),
            slots: (newStartDate).toISOString() === newEndDate.toISOString() ? [{ start: slotType.split(' - ')[0], end: slotType.split(' - ')[1] }] : [{ start: "", end: "" }],
        };
        console.log(leaveData, "leaveData", newStartDate === newEndDate, newStartDate, newEndDate)
        try {
            const response = await axios.post('http://localhost:3001/api/leave/createleave', leaveData);
            if (response.data.statusCode == 201) {
                setShowToast(true)
                setMessage('Leave created successfully')
            }
            else {
                setShowToast(true)
                setMessage('Failed to create leave')
            }
            console.log('Leave created:', response.data);
        } catch (error) {
            console.error('Error creating leave:', error);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = { walker, reason, startDate, endDate, slotType, removePenalty };
        addLeave()
    };
    const getPartners = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/partner/getallpartners');
            console.log('partners:', response.data.data);
            setPartners(response.data.data);
        } catch (error) {
            console.error('Error fetching leaves:', error);
        }
    }

    useEffect(() => {
        getPartners();
    }, [])
    return (
        <>
            <div>
                <SimpleSnackbar message={message} showToast={showToast} setShowToast={setShowToast}
                />
            </div>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: 400,
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
            >
                <h2 style={{ backgroundColor: '#FF6F00', color: 'white', padding: '10px', borderRadius: '8px 8px 0 0', textAlign: 'center' }}>
                    Add/Edit Leave
                </h2>

                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel>Select Walker *</InputLabel>
                    <Select
                        value={walker}
                        onChange={(e) => {
                            setWalker(e.target.value)
                        }}
                        required
                    >
                        {parterns.map((partner, index) => (
                            <MenuItem key={index} value={partner?._id} id={partner?._id}>{partner ? partner?.name : ""}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Add Reason"
                    variant="outlined"
                    fullWidth
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={(newValue) => {
                            console.log('Start Date:', newValue);
                            setStartDate(newValue)
                        }}
                        renderInput={(params) => <TextField {...params} fullWidth sx={{ marginBottom: 2 }} />}
                    />
                    <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                        renderInput={(params) => <TextField {...params} fullWidth sx={{ marginBottom: 2 }} />}
                    />
                </LocalizationProvider>
                {isSingleDay && (
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel>Select Slot</InputLabel>
                        <Select
                            value={slotType}
                            onChange={(e) => setSlotType(e.target.value)}
                            required
                        >
                            {timeSlots.map((slot, index) => (
                                <MenuItem key={index} value={slot}>{slot}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={removePenalty}
                            onChange={(e) => setRemovePenalty(e.target.checked)}
                        />
                    }
                    label="Want to Remove Penalty?"
                    sx={{ marginBottom: 2 }}
                />

                <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    sx={{ backgroundColor: '#FF6F00', color: 'white', fontWeight: 'bold' }}
                >
                    Create
                </Button>
            </Box>
        </>
    );
};

export default AddEditLeave;
