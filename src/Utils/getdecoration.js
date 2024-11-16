export const getIconDecor = (questionData, author, setDecoration) => {
  const isUserLiked = questionData?.likes?.some(
    (user) => user.stringValue === author.uid
  );

  // Conditionally set Decoration based on `isUserLiked`
  const Decorate = isUserLiked
    ? questionData
      ? "bg-btn-red"
      : "bg-btn-green"
    : "bg-btn-inactive";

  setDecoration(Decorate);
  // console.log("Decoration class:", Decorate, "Is user liked :", isUserLiked);
};

export const postDecorMap = {
  related: "bg-box-related shadow-sm hover:shadow-md transition-shadow",
  opened: "bg-box-background",
  reply: "bg-box-reply",
  normal: "bg-box-question shadow-sm hover:shadow-md transition-shadow",
  active: "bg-box-question shadow-sm hover:shadow-md transition-shadow",
};

// Function to get post decoration based on the type
export const getPostDecor = (type) => postDecorMap[type] || postDecorMap.normal;
