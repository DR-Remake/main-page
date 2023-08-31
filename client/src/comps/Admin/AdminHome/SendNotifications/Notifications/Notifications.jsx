import News from "../News/News";

function Notifications(props) {
  const { contactInputs, setContactInputs, buttons } = props;
  
  return (
    <News
      buttons={buttons}
      adminsInfo={props.adminsInfo}
      contactInputs={contactInputs}
      setContactInputs={setContactInputs}
    />
  );
}

export default Notifications;
