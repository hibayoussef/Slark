import React, {useState} from 'react';
import type {FC} from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
} from '@material-ui/core';
import FileDropzone from '../../../components/FileDropzone';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        dot: {
            height: '25px',
            width: '25px',
            borderRadius: '50%',
            display: 'inline-block',
            transition: 'all .2s cubic-bezier(.785,.135,.15,.86) 0s'
        },
        dotBig: {
            height: '10rem',
            width: '10rem',
            borderRadius: '50%',
            display: 'inline-block',
            transition: 'all .2s cubic-bezier(.785,.135,.15,.86) 0s'
        },

    }),
);


const WorkspacesUploadImage = ({onImageUploaded}: any) => {

    // onImageUploaded we invoke it with uploaded file so parent detect it
    const classes = useStyles();

    const [files, setFiles] = useState<any[]>([]);


    const handleDrop = (newFiles: any): void => {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleRemove = (file): void => {
        setFiles((prevFiles) => prevFiles.filter((_file) => _file.path
            !== file.path));
    };

    const handleRemoveAll = (): void => {
        setFiles([]);
    };


    return (<>
        <Card>
            <CardHeader title="Customize your Workspaces avatar"/>
            <CardContent>
                <FileDropzone
                    accept="image/*"
                    files={files}
                    onDrop={handleDrop}
                    onRemove={handleRemove}
                    onRemoveAll={handleRemoveAll}
                    onUpload={onImageUploaded} // We inject it here as well so FileDropzone will invoke it
                />

            </CardContent>
        </Card>
    </>)
};

export default WorkspacesUploadImage;

