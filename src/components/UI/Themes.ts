import "styled-components";

export interface AppTheme {
  body: string;
  text: string;
  bg1: string;
  bg2: string;
  color1: string;
  box_shadow: string;
  post_container: string;
  modal_border: string;
}

declare module "styled-components" {
  export interface DefaultTheme extends AppTheme {}
}

export const lightTheme: AppTheme = {
  body: "#fbfaf9",
  text: "#212529",
  bg1: "#f3f1e6",
  bg2: "#b4136b0a",
  color1: "#b4134c",
  box_shadow: "#f1e3ec",
  post_container: "#fff",
  modal_border: "1px solid #dee2e6",
};

export const darkTheme: AppTheme = {
  body: "#1c151b",
  text: "#fff",
  bg1: "#2c252b",
  bg2: "#41323f",
  color1: "#c57e8a",
  box_shadow: "#000000",
  post_container: "#2c252b",
  modal_border: "1px solid #302a2f",
};
