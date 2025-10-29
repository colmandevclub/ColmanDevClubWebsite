export const syllabusCsvDataParser = (data) => {
  const splicedData = data?.slice(1, data?.length);
  const visibleData = splicedData?.filter(
    (row) => strip(row[csvMap.show]) === "TRUE"
  );
  const csvData = visibleData?.map((row) => {
    const rawData = strip(row[csvMap.youtube]);
    const videosList = rawData.split(",");
    const videosIds = videosList?.map((videoUrl) => getVideoId(videoUrl));

    return {
      id: strip(row[csvMap.id]),
      subject: strip(row[csvMap.subject]),
      presentation: strip(row[csvMap.presentation]),
      youtube: videosIds,
      git: strip(row[csvMap.git]),
      exercise: strip(row[csvMap.exercise]),
      time: strip(row[csvMap.time]),
      placeholder: strip(row[csvMap.placeholder]),
    };
  });
  return csvData;
};

const strip = (str) => {
  return str?.replace(/^\s+|\s+$|"|'/g, "");
};

const getVideoId = (youtubeUrl) => {
  return youtubeUrl?.split("v=")[1]?.split("&")[0];
};

const csvMap = {
  id: 0,
  subject: 1,
  presentation: 2,
  youtube: 3,
  links: 4,
  git: 5,
  exercise: 6,
  placeholder: 7,
  time: 8,
  show: 9,
};