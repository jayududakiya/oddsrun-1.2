import React,{useState} from 'react'
import RichTextEditor from 'react-rte';


const Editor = (props) => {

    const { property, record, onChange } = props;

    console.log('recordXXXXX',record)

    const [value, setValue] = useState(RichTextEditor.createEmptyValue());

    const onChangeRich = (value) => {
        setValue(value);
        // If you want to do something with the HTML output
        console.log(value.toString('html'));
        const newRecord = { ...record }

        if(value != ''){
            onChange({
                ...newRecord,
                params: {
                  ...newRecord.params,
                  [property.name]: value.toString('html'),
                }
              });
        }

       

    };

    return (
       <div style={{marginBottom : '20px'}}>
         <RichTextEditor
            value={value}
            onChange={onChangeRich}
        />
       </div>
    )
}

export default Editor