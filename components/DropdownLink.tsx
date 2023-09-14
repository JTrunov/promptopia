import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type Props = {
  text: string;
  link: string;
  setToggleDropdown: Dispatch<SetStateAction<boolean>>;
};

const DropdownLink = ({ link, text, setToggleDropdown }: Props) => {
  return (
    <Link
      href={link}
      className="dropdown_link"
      onClick={() => {
        setToggleDropdown(false);
      }}
    >
      {text}
    </Link>
  );
};

export default DropdownLink;
