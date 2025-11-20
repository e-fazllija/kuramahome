export type ExportFieldType =
  | "text"
  | "number"
  | "select"
  | "multiselect"
  | "range"
  | "checkbox";

export interface ExportFieldOption {
  label: string;
  value: string | number;
}

export interface ExportFieldDefinition {
  key?: string;
  label: string;
  type: ExportFieldType;
  placeholder?: string;
  tooltip?: string;
  options?: ExportFieldOption[];
  minKey?: string;
  maxKey?: string;
  minPlaceholder?: string;
  maxPlaceholder?: string;
}

