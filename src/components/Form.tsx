import React, { useState } from "react";

interface Props {
  handleSubmit: (text: string) => void;
}

export const InputForm = ({ handleSubmit }: Props) => {
  const [comment, setComment] = useState("");
  return (
    <div>
      (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(comment);
          setComment("");
        }}
        className="CommentForm"
      >
        <textarea
          placeholder="Enter your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          name="comment"
        />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      )
    </div>
  );
};

export default InputForm;
