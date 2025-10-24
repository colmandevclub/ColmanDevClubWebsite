export const checkImagePermission = async (profileImage) => {
  return fetch(profileImage)
    .then((response) => {
      return response.ok;
    })
    .catch((error) => {
      console.error('Error while checking image permission:', error);
    });
};
