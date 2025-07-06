import { useCallback, useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import '@/components/Dropzone/Dropzone.css';

const truncateFileName = (name, maxLength = 30) => {
    if (name.length <= maxLength) return name;
    const ext = name.split('.').pop();
    const base = name.substring(0, maxLength - ext.length - 5);
    return `${base}...${ext}`;
};

const Dropzone = ({ onFileRead, resetTrigger }) => {
    const [fileName, setFileName] = useState(null);
    const inputRef = useRef();

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = null;
        }
        setFileName(null);
    }, [resetTrigger]);

    const onDrop = useCallback((acceptedFiles) => {
        if (inputRef.current) {
            inputRef.current.value = null;
        }

        if (!acceptedFiles || acceptedFiles.length === 0) {
            setFileName(null);
            onFileRead(null);
            return;
        }

        const file = acceptedFiles[0];
        setFileName(file.name);

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
            <input ref={inputRef} {...getInputProps()} />
            {fileName ? (
                <p>📄 {truncateFileName(fileName, 20)}</p>
            ) : (
                <p>{isDragActive ? 'Solte o arquivo aqui' : 'Arraste o arquivo ou clique'}</p>
            )}
        </div>
    );
};

export default Dropzone;
