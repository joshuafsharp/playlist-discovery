import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";

export interface Props {
  token: string;
  children: React.ReactNode;
}

export const PlaybackProvider = ({ token, children }: Props) => {
  return (
    // TODO: Replace Basement FM device name with a central config value
    <WebPlaybackSDK connectOnInitialized deviceName="Basement FM" getOAuthToken={() => token}>
      {children}
    </WebPlaybackSDK>
  );
};
