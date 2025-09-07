
export interface PanelContent {
  step: number;
  title: string;
  explanation: string;
  image_prompt: string;
}

export interface PanelData extends PanelContent {
  imageSrc?: string;
}

export interface TextGuideResponse {
  panels: PanelContent[];
}
