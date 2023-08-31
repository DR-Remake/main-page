import "./TopNavAdmin.scss";

function TopNavAdmin() {
  const topNavList = ["Good day, YosefTheAdmin", "14:50"];

  return (
    <div className="topNavAdmin flex combineW">
      {topNavList.map((top, index) => {
        return <p key={index}>{top}</p>;
      })}
    </div>
  );
}

export default TopNavAdmin;
