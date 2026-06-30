export const homePageHandler = async (req, res, next) => {
  req.session.name = "ipin";

  return res.render("index", {
    layout: "layouts/main-layout",
    title: "Home"
  });
};
