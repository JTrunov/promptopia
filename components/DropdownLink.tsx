"use client";
import Link from "next/link";

type Props = {
  text: string;
  link: string;
  setToggleDropdown: (arg: boolean) => void;
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
