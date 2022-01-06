import { Gender } from "../models/enum/gender.enum";
import { femaleIcon, maleIcon, transIcon } from "./icons";

export default function GenderComponent(props: {
  gender?: Gender;
}): JSX.Element {
  switch (props.gender) {
    case Gender.male:
      return maleIcon;
    case Gender.female:
      return femaleIcon;
    case Gender.other:
    default:
      return transIcon;
  }
}
