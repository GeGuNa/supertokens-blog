import React from "react";

const HomePage = () => {
  // if the user visits '/' route while working on the blog project (without main-website)
  // then redirect the user to '/blog' route.
  React.useEffect(() => {
    window.location = "/blog";
  }, []);

  return (
    <p style={{ textAlign: "center" }}>Redirecting...</p>
  )
}

export default HomePage;
