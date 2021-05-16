import {useState} from 'react';
import type {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {useSnackbar} from 'notistack';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    FormControlLabel,
    FormHelperText,
    Grid,
    TextField,
    Typography
} from '@material-ui/core';
import FileDropzone from '../../FileDropzone';
import {useWorkspaceModule} from './zustand';

const WorkspacesUploadImage: FC = (props) => {

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
            <CardHeader title="Upload Images"/>
            <CardContent>
                <FileDropzone
                    accept="image/*"
                    files={files}
                    onDrop={handleDrop}
                    onRemove={handleRemove}
                    onRemoveAll={handleRemoveAll}
                />
            </CardContent>
        </Card>
    </>)
};

export default WorkspacesUploadImage;

