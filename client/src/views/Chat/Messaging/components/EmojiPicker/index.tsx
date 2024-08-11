// TODO: 避免Picker重新渲染
import React, { memo } from "react";

import Picker, { EmojiClickData } from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";

import style from "./emojiPicker.module.scss";

interface EmojoPickerProps {
  show: boolean;
  handleClick: () => void;
  handleSelected: (emoji: EmojiClickData) => void;
}

const PickerCard: React.FC<{
  handleSelected: (emoji: EmojiClickData) => void;
}> = memo(({ handleSelected }) => (
  <Picker className={style["emojo-picker"]} onEmojiClick={handleSelected} />
));

export const EmojiPicker: React.FC<EmojoPickerProps> = ({
  show,
  handleClick,
  handleSelected,
}) => {
  return (
    <div className={style["emojo"]}>
      <BsEmojiSmileFill className={style["smile-svg"]} onClick={handleClick} />
      {show && <PickerCard handleSelected={handleSelected} />}
    </div>
  );
};
