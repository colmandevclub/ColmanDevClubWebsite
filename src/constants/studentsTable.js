export const defaultProgram = 'F8YNTTQXhB1nUxfcFgxG';

const presenceColorsMap = {
  missed: '#FF7675',
  approved: '#FE9210',
  arrived: '#36B176',
};

const tasksColorsMap = {
  didNotSubmit: '#FF7675',
  approved: '#FE9210',
  completed: '#36B176',
  waitForPR: '#2382DB',
};

export const columnColorsMap = {
  tasks: tasksColorsMap,
  presence: presenceColorsMap,
};

export const totalColCriteria = {
  tasks: 'didNotSubmit',
  presence: 'missed',
};

export const totalRowCriteria = {
  tasks: 'completed',
  presence: 'arrived',
};

export const titlesMap = {
  tasks: 'project_status',
  presence: 'presnce_status',
};

export const defaultStatsValues = {
  project_status: 'didNotSubmit',
  presnce_status: 'missed'
}
export const newWeekJson = {
  title: '',
  subject: '',
  presantaion_links: '',
  youtube_links: '',
  project_link: '',
  exercise_link: '',
  other_links: '',
  order_num: 0,
  is_visible: true,
};