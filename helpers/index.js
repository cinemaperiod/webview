export const formatDate = (date = '') => {
  if (!date) return false;
  const formattedDate = new Date(date);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(formattedDate);
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(formattedDate);
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(formattedDate);
  return `${day} ${month}, ${year}`;
}

export const getIdFromURL = (url = '') => {
  if (!url) return false;
  if (url.includes('youtube.com')) {
    return url.split('=')[1];
  } else if (url.includes('youtu.be')) {
    return url.split('/')?.pop();
  } else {
    return url;
  }
}

export const getSocialMediaFromLink = (link = '') => {
  if (link) {
    const id = link?.split('/')?.pop();
    let media = '';
    if (link.includes('twitter')) {
      media = 'twitter';
    } else if (link.includes('instagram')) {
      media = 'instagram';
    } else if (link.includes('facebook')) {
      media = 'facebook';
    } else if (link.includes('youtube')) {
      media = 'youtube';
    } else if (link.includes('pinterest')) {
      media = 'pinterest';
    }
    return {
      media,
      id,
      link,
    };
  }
}

export const sortByDate = (data = [], key = 'releasedate') => {
  if (!data.length) return false;
  let filteredData = [];
  if (key === 'releasedate') {
    filteredData = data?.filter((movie) => new Date(movie[key]) > new Date());
    return filteredData?.sort((a, b) => (new Date(a[key]) > new Date(b[key])) ? 1 : ((new Date(b[key]) > new Date(a[key])) ? -1 : 0));
  } else {
    filteredData = data;
    return filteredData?.sort((a, b) => (new Date(a[key]) < new Date(b[key])) ? 1 : ((new Date(b[key]) < new Date(a[key])) ? -1 : 0));
  }
}