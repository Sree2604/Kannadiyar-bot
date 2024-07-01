import React, { useEffect } from "react";

export default function Guest() {
  useEffect(() => {
    window.location.href = "#/0";
  }, []);
  return <>Loading...</>;
}
