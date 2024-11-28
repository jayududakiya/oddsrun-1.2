const APP_URL = window.location.origin;
import React, { useEffect, useState } from "react";
import { DropZone, Label, Box } from "@admin-bro/design-system";
import HttpPostRequest from "./HttpPostRequest";

// import { Label, useNotice } from 'admin-bro'

function ImageUploader(props) {
  const { property, record, onChange } = props;

  // console.log('property.name',property.name)

  const [_files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const sendNotice = useNotice()

  async function getFileFromUrl(url, name, defaultType = "image/jpeg") {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], name, {
      type: data.type || defaultType,
    });
  }

  const loadImages = async (record) => {
    var imgs = [];

    var imageKay = property.name || "property_images";

    for (var key in record.params) {
      if (key.match(imageKay)) {
        // var img = await getFileFromUrl('http://localhost:8080/' + record.params[key], record.params[key])
        var img = await getFileFromUrl(
          "/" + record.params[key],
          record.params[key]
        );
        imgs.push(img);
      }
    }
    setFiles(imgs);
  };

  useEffect(() => {
    //    loadImages(record);
  }, [record]);

  const onUpload = (files) => {
    const newRecord = { ...record };

    var formData = new FormData();

    if (property.custom.multiple) {
      files.map((file) => {
        formData.append("images", file);
      });
    } else {
      const file = files.length && files[0];
      formData.append("image", file);
    }

    setIsLoading(true);
    HttpPostRequest(
      property.custom.multiple ? "/file/upload-multiple" : "/file/upload",
      formData
    )
      .then((res) => {
        // props.record.params[property.name] = res
        // sendNotice({ message: 'File selected successfully.' })
        setIsLoading(false);
        onChange({
          ...newRecord,
          params: {
            ...newRecord.params,
            [property.name]: res,
          },
        });
      })
      .catch((err) => {
        setIsLoading(false);
      });

    event.preventDefault();
  };

  return (
    <Box style={{ marginBottom: 30 }}>
      <Label>{property.label}</Label>
      <DropZone
        files={_files}
        multiple={property.custom.multiple}
        onChange={onUpload}
      />
      {isLoading && <span>Please wait...</span>}
    </Box>
  );
}

export default ImageUploader;
