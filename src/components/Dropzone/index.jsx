import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './Dropzone.css';
import { truncateFileName } from '../../functions/utils/format.js'

const Dropzone = ({ onFileRead }) => {
    const [fileName, setFileName] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setFileName(file.name); // mostra o nome do arquivo

        const reader = new FileReader();
        reader.onload = () => {
            try {
                const json = JSON.parse(reader.result);
                console.log('Arquivo lido com sucesso:', json);
                onFileRead(json);
            } catch (error) {
                console.error('Erro ao ler o JSON:', error);
                onFileRead(null);
            }
        };

        reader.readAsText(file);
    }, [onFileRead]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/json': ['.json'] },
        multiple: false
    });

    return (
        <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            {fileName ? (
                <p>📄 {truncateFileName(fileName, 20)}</p>
            ) : (
                <p>{isDragActive ? 'Solte o arquivo aqui' : 'Arraste o arquivo ou clique'}</p>
            )}
        </div>
    );
};

export default Dropzone;
