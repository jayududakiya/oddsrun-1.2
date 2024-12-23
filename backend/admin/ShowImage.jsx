const APP_URL = window.location.origin;

const ShowImage = (props) => {
  const { property } = props;

  var image = props.record.params[property.name];

  if (image.match("http") == null) {
    image = APP_URL + "/" + image;
  }

  return (
    <div>
      <img
        style={{ height: "auto", width: 100 }}
        src={image}
        alt=" Image"
        loading="lazy"
        height={'auto'}
        width={100}
      />
    </div>
  );
};
export default ShowImage;
