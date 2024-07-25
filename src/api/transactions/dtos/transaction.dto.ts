export interface CSVData {
  [key: string]: string;
}

export interface ImportDataDto {
  fileName: string;
  data: CSVData[];
}
