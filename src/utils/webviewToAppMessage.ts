declare global {
  interface Window {
    ReactNativeWebView?: any;
  }
}

export const webviewToAppMessage = (
  type: "APP_CLOSE" | "PERMISSION_CAMERA" | "PERMISSION_PHOTO_LIBRARY"
) => {
  const requestMessage = JSON.stringify({ type });
  window.ReactNativeWebView.postMessage(requestMessage);
};
