import { toast } from 'react-toastify';
import UserWeekStats from 'src/classes/UserWeekStats';
import { UserService } from './user.service';
import { weekService } from './week.service';
import { userWeekStatsService } from './userWeekStats.service';
import { defaultStatsValues } from 'src/constants/studentsTable';

const createWeeksMap = (weeks) => {
  return weeks.reduce((acc, week) => {
    acc[week.id] = { title: week.title, order_num: week.order_num };
    return acc;
  }, {});
};

const processWeekForMember = async (week, member, userWeekStats, weeksMap) => {
  const userStat = userWeekStats.find((stat) => stat.weekRef === week.id);

  if (!userStat) {
    const defaultStats = new UserWeekStats({
      weekRef: week.id,
      userRef: member.id,
      project_status: defaultStatsValues.project_status,
      presnce_status: defaultStatsValues.presnce_status,
      created_at: new Date(),
      updated_at: new Date(),
      updated_by: '',
    });

    const newStatRef = await userWeekStatsService.create({ ...defaultStats });
    return {
      ...defaultStats,
      title: weeksMap[week.id].title,
      id: newStatRef.id,
      order_num: week.order_num,
    };
  }

  return {
    title: weeksMap[week.id].title,
    ...userStat,
    order_num: weeksMap[week.id].order_num,
  };
};

const processMember = async (member, weeks, weeksMap, allUserWeekStats) => {
  const userWeekStats = allUserWeekStats.filter(
    (stat) => stat.userRef === member.id
  );

  const userWeeksPromises = weeks.map((week) =>
    processWeekForMember(week, member, userWeekStats, weeksMap)
  );

  const resolvedUserWeeks = await Promise.all(userWeeksPromises);
  const sortedUserWeeks = resolvedUserWeeks
    .sort((a, b) => a.order_num - b.order_num)
    .map(({ order_num, ...rest }) => rest);

  return {
    id: member.id,
    user: member,
    weeks: sortedUserWeeks,
  };
};

const getAllByProgram = async (program = '1') => {
  try {
    const members = await UserService.getUsers(program);
    const weeks = await weekService.getAllByProgram(program);
    const allUserWeekStats = await userWeekStatsService.getAll();

    const weeksMap = createWeeksMap(weeks);

    const dataPromises = members.map((member) =>
      processMember(member, weeks, weeksMap, allUserWeekStats)
    );
    const data = await Promise.all(dataPromises);

    return data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const userStatusService = {
  getAllByProgram,
};
