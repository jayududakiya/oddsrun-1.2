const APP_URL = window.location.origin;

const ShowImage = props => {

    const { property, record, onChange } = props

    var image = props.record.params[property.name];

    if (image.match('http') == null) {
        image = APP_URL + '/' + image;
    }

    return (
        <div>
            <img style={{ height: 'auto', width: 100 }} src={image} alt=" Image" />
        </div>

    );
}
export default ShowImage;