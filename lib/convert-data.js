export const getSlug = (title) => {
  if (!title) return null;

  const slug = title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") 
    .replace(/[^a-z0-9-_]/g, ""); 

  return slug;
};
