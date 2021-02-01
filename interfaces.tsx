export interface Station {
  changeuuid: string | undefined;
  stationuuid: string | undefined;
  name: string | undefined;
  url: string | undefined;
  url_resolved: string | undefined;
  homepage: string | undefined;
  favicon: string | undefined;
  tags: string | undefined;
  country: string | undefined;
  countrycode: string | undefined;
  state: string | undefined;
  language: string | undefined;
  votes: number | undefined;
  lastchangetime: string | undefined;
  codec: string | undefined;
  bitrate: number | undefined;
  hls: number | undefined;
  lastcheckok: number | undefined;
  lastchecktime: string | undefined;
  lastcheckoktime: string | undefined;
  lastlocalchecktime: string | undefined;
  clicktimestamp: string | undefined;
  clickcount: number | undefined;
  clicktrend: number | undefined;
}

export interface Navigation {
  navigate: Function;
  goBack: Function;
}

export interface JumpTo {
  jumpTo: Function;
}
