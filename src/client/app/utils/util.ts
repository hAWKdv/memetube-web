export const imageToBase64 = (file: any, callback: any) => {
  const reader = new FileReader();

  reader.onload = function(e: any) {
    callback(e.target.result);
  };

  reader.onerror = function(e) {
    callback(null);
  };

  reader.readAsDataURL(file);
};
