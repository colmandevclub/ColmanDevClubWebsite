import { Button, Stack } from '@mui/material';
import User from 'src/classes/User.class';
import Week from 'src/classes/Week.class';
import { roles } from 'src/constants/roles';
import { useGetUsers } from 'src/hooks/firebase.hooks';
import { UserService } from 'src/services/user.service';
import { weekService } from 'src/services/week.service';

const First = () => {
  const users = useGetUsers();

  if (users.isLoading) {
    return <div>Loading...</div>;
  }

  const handleCreateNewUser = async () => {
    const newUser = new User({
      email: 'barshoshani274@gmail.com',
      password: 'B123456789',
      profile_photo:
        'https://scontent.ftlv19-1.fna.fbcdn.net/v/t39.30808-6/311502532_10221786955532199_7393794687333100371_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=4_7VGwDV9ZoQ7kNvgE0RucO&_nc_zt=23&_nc_ht=scontent.ftlv19-1.fna&_nc_gid=AUac4KhvxmPVsJliGVoy--V&oh=00_AYATs753t1-5mW6lsQROhErU4q-pEGKvzJrXSo60zPhPBA&oe=671C00E6',
      first_name: 'foo',
      last_name: 'foo',
      phone_number: '0541234567',
      role: roles.applicant,
      card_id: '207043340',
      appliciant_data: {
        field_of_study: 'Computer Science',
        school_year: '3',
        program: 'Full Stack',
        experience: 'Yes',
        experience_details: 'I have experience in React, Node.js, and MongoDB',
        test_day: new Date(),
      },
    });
    await UserService.create(newUser);
  };

  const handleCreateNewWeek = async () => {
    const week = new Week({
      title: 1,
      subject: 'Introduction to Full Stack',
      programRef: '1',
      is_visible: true,
      exercise_link: [],
      presantaion_links: [],
      project_link: [],
      youtube_links: [],
      other_links: [],
      created_at: new Date(),
    });

    await weekService.create({ ...week });
  };

  return (
    <Stack justifyContent="center" alignItems="center" width="100%" height="100%">
      <Button onClick={handleCreateNewUser}>Create New User</Button>
      <Button onClick={handleCreateNewWeek}>Create New Week</Button>
    </Stack>
  );
};

export default First;
