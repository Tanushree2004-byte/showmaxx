export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.getFullYear();
};

export const formatRating = (rating) => {
  return rating ? rating.toFixed(1) : 'N/A';
};

export const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

export const getGenreNames = (genreIds) => {
  const genreMap = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
  };
  
  if (!genreIds) return [];
  return genreIds.map(id => genreMap[id] || 'Unknown');
};
