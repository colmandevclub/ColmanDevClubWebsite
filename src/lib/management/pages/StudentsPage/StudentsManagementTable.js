import React, { useState, useEffect } from 'react';
import ControlTable from '../../../../ui/ControlTable/ControlTable';
import { Box, Stack, Typography } from '@mui/material';
import { userStatusService } from 'src/services/userStatusData.service';
import { userWeekStatsService } from 'src/services/userWeekStats.service';
import { ProgramService } from 'src/services/program.service';
import { weekService } from 'src/services/week.service';
import { toast } from 'react-toastify';
import EditWeekDialog from './EditWeekDialog';
import AddMemberDialog from './AddMemberDialog';
import ControlPanel from './ControlPanel';
import { defaultProgram, columnColorsMap, totalColCriteria, totalRowCriteria, titlesMap, newWeekJson } from 'src/constants/studentsTable';
import { convertToControlTableStructure } from '../../../../utils/studentsTable';

const StudentsManagementTable = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [openWeekModal, setOpenWeekModal] = useState(false);
  const [editingWeekId, setEditingWeekId] = useState(null);
  const [openMemberModal, setOpenMemberModal] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(defaultProgram);
  const [newWeek, setNewWeek] = useState(newWeekJson);

  const fetchData = async (programRef) => {
    const data = await userStatusService.getAllByProgram(programRef);
    const formattedData = convertToControlTableStructure(data);
    setStudentsData(formattedData);
  };

  const fetchPrograms = async () => {
    const programsData = await ProgramService.getAll();
    setPrograms(programsData);
  };

  const fetchWeeks = async () => {
    const weeksData = await weekService.getAllByProgram(selectedProgram);
    setWeeks(weeksData);
  };

  useEffect(() => {
    fetchPrograms();
    fetchData(selectedProgram);
    fetchWeeks();
  }, [selectedProgram]);

  const updateStudentData = (statsId, statusKey, statusValue, prevData) => {
    return prevData.map((member) => {
      const updatedMember = { ...member };
      Object.keys(updatedMember).forEach((key) => {
        if (key !== 'person') {
          const weekData = updatedMember[key];
          if (weekData && weekData.id === statsId) {
            updatedMember[key] = {
              ...weekData,
              [statusKey]: statusValue,
            };
          }
        }
      });
      return updatedMember;
    });
  };

  const onChangeHandler = async (statsId, statusKey, statusValue) => {
    try {
      const updatedStats = {
        [titlesMap[statusKey]]: statusValue,
      };
      await userWeekStatsService.update(statsId, updatedStats);

      setStudentsData((prevData) => updateStudentData(statsId, statusKey, statusValue, prevData));
    } catch (error) {
      console.error('Error updating stats:', error);
      toast.error('Failed to update stats');
    }
  };

  const handleCloseWeekModal = () => {
    setOpenWeekModal(false);
    setNewWeek(newWeekJson);
  };

  const handleOpenMemberModal = () => {
    setOpenMemberModal(true);
  };

  const handleCloseMemberModal = (hasChanges) => {
    setOpenMemberModal(false);
    if (hasChanges) fetchData(selectedProgram);
  };

  const handleEditWeek = async (weekId) => {
    const weekData = await weekService.get(weekId);
    const weekDataWithId = { ...weekData, id: weekId };
    setNewWeek(weekDataWithId);
    setEditingWeekId(weekId);
    setOpenWeekModal(true);
  };

  const handleAddWeek = async () => {
    const weekObj = {
      ...newWeek,
      programRef: selectedProgram,
      created_at: new Date(),
    };

    try {
      await weekService.createByProgram(weekObj, selectedProgram);
      toast.success('Week added successfully!');
      fetchData(selectedProgram);
      handleCloseWeekModal();
    } catch (error) {
      toast.error('Failed to add week');
    }
  };

  const handleUpdateWeek = async () => {
    const { id, ...weekObj } = {
      ...newWeek,
      programRef: selectedProgram,
      created_at: new Date(),
    };

    try {
      await weekService.update(editingWeekId, weekObj);
      toast.success('Week updated successfully!');
      fetchData(selectedProgram);
      handleCloseWeekModal();
      setEditingWeekId(null);
    } catch (error) {
      toast.error('Failed to update week');
    }
  };

  const handleDeleteWeek = async (weekId) => {
    try {
      await weekService.remove(weekId);
      toast.success('Week deleted successfully!');
      fetchData(selectedProgram);
    } catch (error) {
      toast.error('Failed to delete week');
    }
  };

  const onClickAddWeek = () => {
    console.log('newWeekJson', newWeekJson);
    setNewWeek(newWeekJson);
    setOpenWeekModal(true);
  };

  const onProgramChange = (value) => {
    setSelectedProgram(value);
    fetchData(value);
  };
  
  return (
    <Stack gap={2} height={'90%'}>
      <Typography variant="h4">Students Management Table</Typography>
      <ControlPanel
        selectedProgram={selectedProgram}
        programs={programs}
        onProgramChange={onProgramChange}
        onClickAddWeek={onClickAddWeek}
        onOpenMemberModal={handleOpenMemberModal}
      />

      <EditWeekDialog
        open={openWeekModal}
        onClose={handleCloseWeekModal}
        onAddWeek={handleAddWeek}
        onUpdateWeek={handleUpdateWeek}
        newWeek={newWeek}
        setNewWeek={setNewWeek}
        default_order={weeks.length + 1}
      />

      <AddMemberDialog
        open={openMemberModal}
        onClose={handleCloseMemberModal}
        programRef={selectedProgram}
      />

      <Box flex={1} overflow={'auto'}>
        <ControlTable
          data={studentsData}
          columnColorsMap={columnColorsMap}
          totalColCriteria={totalColCriteria}
          totalRowCriteria={totalRowCriteria}
          onChangeHandler={onChangeHandler}
          onEditColumnHandler={handleEditWeek}
        />
      </Box>
    </Stack>
  );
};

export default StudentsManagementTable;
