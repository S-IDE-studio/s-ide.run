export const DISTRIBUTION = {
  ios: {
    testflightUrl:
      (import.meta.env.PUBLIC_IOS_TESTFLIGHT_URL as string | undefined) ??
      "https://testflight.apple.com/",
  },
  android: {
    playStoreUrl:
      (import.meta.env.PUBLIC_ANDROID_PLAY_URL as string | undefined) ??
      "https://play.google.com/store",
  },
} as const;

