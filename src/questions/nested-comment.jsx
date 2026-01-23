import { Input } from "../components/ui/input";
import React, { useState } from "react";

const NestedComment = ({ commentData, setCommentData }) => {
  const [edit, showEdit] = useState({});
  const [add, showAdd] = useState({});
  const [commentText, setCommentText] = useState("");

  const editComment = (id, text) => {
    setCommentData((prevData) => {
      const updateRecusrsive = (prevData) => {
        return prevData?.map((data) => {
          if (data.id === id) {
            return { ...data, text: text };
          } else {
            return { ...data, replies: updateRecusrsive(data.replies) };
          }
        });
      };
      return updateRecusrsive(prevData);
    });
  };

  const addComment = (id) => {
    setCommentData((prevData) => {
      const updateRecusrsive = (prevData) => {
        return prevData?.map((data) => {
          if (data.id === id) {
            return {
              ...data,
              replies: [
                ...(data.replies || []),
                { id: data.replies?.length + 1 + "_nested", text: commentText },
              ],
            };
          } else {
            return { ...data, replies: updateRecusrsive(data.replies) };
          }
        });
      };
      return updateRecusrsive(prevData);
    });
  };

  return (
    <div className="ml-10 text-left flex flex-col">
      {commentData?.map((comment) => (
        <div key={comment.id}>
          <div className="flex gap-5">
            <p className="mb-4">
              {edit[comment.id] ? (
                <Input
                  value={comment.text}
                  onChange={(e) => editComment(comment.id, e.target.value)}
                />
              ) : (
                comment.text
              )}

              {add[comment.id] && (
                <Input
                  type="text"
                  onChange={(e) => setCommentText(e.target.value)}
                />
              )}
            </p>
            <div className="flex gap-2">
              <span
                className="cursor-pointer text-purple-500"
                onClick={() =>
                  showEdit((prev) => ({
                    ...prev,
                    [comment.id]: !prev[comment.id],
                  }))
                }
              >
                {edit[comment.id] ? "Hide" : "Edit"}
              </span>
              <span
                className="cursor-pointer  text-blue-500"
                onClick={() => {
                  if (add[comment.id] && commentText) {
                    addComment(comment.id);
                  }
                  showAdd((prev) => ({
                    ...prev,
                    [comment.id]: !prev[comment.id],
                  }));
                }}
              >
                Add
              </span>
            </div>
          </div>
          {comment.replies?.length > 0 && (
            <NestedComment
              key={comment.id + "_nested"}
              commentData={comment.replies}
              setCommentData={setCommentData}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default NestedComment;
