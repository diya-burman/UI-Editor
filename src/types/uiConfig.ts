export interface TypographyConfig {
  fontFamily: string;
  fontWeight: number;
  fontSize: number;
}

export interface ButtonConfig {
  borderRadius: number;
  shadow: 'none' | 'small' | 'medium' | 'large';
  alignment: 'left' | 'center' | 'right';
  backgroundColor: string;
  textColor: string;
}

export interface GalleryConfig {
  alignment: 'grid-left' | 'grid-center' | 'grid-right';
  spacing: number;
  imageBorderRadius: number;
}

export interface LayoutConfig {
  cardCornerRadius: number;
  containerPadding: number;
  sectionBackgroundColor: string;
}

export interface StrokeConfig {
  strokeColor: string;
  strokeWeight: number;
}

export interface UIConfig {
  typography: TypographyConfig;
  button: ButtonConfig;
  gallery: GalleryConfig;
  layout: LayoutConfig;
  stroke: StrokeConfig;
  layoutType: 'desktop' | 'mobile';
}

export const defaultUIConfig: UIConfig = {
  typography: {
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: 16,
  },
  button: {
    borderRadius: 8,
    shadow: 'medium',
    alignment: 'center',
    backgroundColor: '#C85A45',
    textColor: '#FFFFFF',
  },
  gallery: {
    alignment: 'grid-left',
    spacing: 12,
    imageBorderRadius: 8,
  },
  layout: {
    cardCornerRadius: 16,
    containerPadding: 24,
    sectionBackgroundColor: '#FFFFFF',
  },
  stroke: {
    strokeColor: '#E5E7EB',
    strokeWeight: 1,
  },
  layoutType: 'desktop',
};
