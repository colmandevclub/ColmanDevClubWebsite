export const convertToControlTableStructure = (data) => {
  return data.map(d => {
    const member = {
      title: `${d.user.first_name} ${d.user.last_name}`,
      subtitle: 'Student', 
      details: 'Student details can be added here.',
      img: d.user.profile_photo || '',
    };

    const weekData = {};
    d.weeks.forEach((week) => {
      weekData[`${week.title}`] = {
        tasks: week.project_status,
        presence: week.presnce_status,
        id: week.id,
        column_id: week.weekRef,
      };
    });

    return {
      member,
      ...weekData,
    };
  });
};
