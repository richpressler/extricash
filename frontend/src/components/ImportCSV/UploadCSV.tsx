import React from 'react';

import { Grid, Paper, Typography, withStyles } from '@material-ui/core';
import parse from 'csv-parse';
import Dropzone from 'react-dropzone';

const UploadArea = withStyles({
  root: {
    width: '300px',
    height: '300px'
  }
})(Paper);

const UploadText = withStyles({
  root: {
    lineHeight: '300px',
    textAlign: 'center'
  }
})(Typography);

const UploadAreaGrid = withStyles({
  container: {
    height: 'calc(100% - 115px)'
  }
})(Grid);

export interface UploadCSVProps {
  onCSVUploaded: (parsedCSV: Array<string>[]) => void;
}

export const UploadCSV: React.SFC<UploadCSVProps> = props => {
  const handleDrop = acceptedFiles => {
    const reader = new FileReader();
    reader.readAsText(acceptedFiles[0], 'UTF-8');
    reader.onload = evt => {
      const rawCSV = (evt.target as any).result;
      const fields = rawCSV.split(',');
      const trimmedCsv = fields.map(field => field.trim()).join(',');
      parse(trimmedCsv, { trim: true }, (err, parsedCSV) => {
        if (err) {
          return console.log(err);
        }

        props.onCSVUploaded(parsedCSV);
      });
    };
    reader.onerror = function(evt) {
      console.log(evt);
    };
  };

  return (
    <UploadAreaGrid container alignItems="center" justify="center">
      <Grid item>
        <Dropzone onDrop={handleDrop} name="uploader">
          {({ getRootProps, getInputProps }) => {
            return (
              <UploadArea {...getRootProps()}>
                <UploadText>Click or drag a file here to upload</UploadText>
                <input name="uploader" {...getInputProps()} />
              </UploadArea>
            );
          }}
        </Dropzone>
      </Grid>
    </UploadAreaGrid>
  );
};
