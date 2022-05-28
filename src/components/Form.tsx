import React, { useState } from "react";

export const InputForm = (onSubmit: any) => {
  const [comment, setComment] = useState("");
  return (
    <div>
      (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(comment);
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
