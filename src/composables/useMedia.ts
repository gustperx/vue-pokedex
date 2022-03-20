const useMedia = () => {
  let cloudinary = "/img/";
  if (import.meta.env.VITE_URL_CLOUDINATY) {
    cloudinary = <string>import.meta.env.VITE_URL_CLOUDINATY;
  }

  return {
    mediaCloudinary: (path: string): string => {
      return `${cloudinary}${path}`;
    },
  };
};

export { useMedia };
