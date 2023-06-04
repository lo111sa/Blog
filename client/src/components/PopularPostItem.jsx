import React from "react";
import { Link } from "react-router-dom";

const PopularPostItem = ({ _id, title }) => {
  return (
    <Link to={`/${_id}`} className="bg-primary mb-3 w-75 py-2 rounded">
      <div>{title}</div>
    </Link>
  );
};

export default PopularPostItem;
