export const getStyle = () =>
  fetch(
    "https://api.geolonia.com/dev/styles/geolonia-basic-3d?key=YOUR-API-KEY"
  ).then(res => res.json());

export default getStyle;
