import React from "react";

export const renderMessageWithLineBreaks = (message: string) =>
  message.split("\n").map((line, i) => (
    <React.Fragment key={i}>
      {line}
      <br />
    </React.Fragment>
  ));
