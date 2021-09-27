export interface ImportMapItem {
  moduleName: string;
  moduleUrl: string;
}

export interface InputData {
  data: Array<{
    type: 'UPDATE';
    key: string;
    importMapItem: ImportMapItem;
  }>;
}

export interface RawData {
  [key: string]: ImportMapItem;
}

export interface QueueItem {
  timestamp: number;
  input: InputData;
}
