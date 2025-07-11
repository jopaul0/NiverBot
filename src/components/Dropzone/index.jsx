import { useCallback, useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import '@/components/Dropzone/Dropzone.css';

const truncateFileName = (name, maxLength = 30) => {
    if (name.length <= maxLength) return name;
    const ext = name.split('.').pop();
    const base = name.substring(0, maxLength - ext.length - 5);
    return `${base}...${ext}`;
};

export default function Dropzone({ onFileRead, resetTrigger, accept }) {
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
            if (file.type.startsWith("image/")) {
                // Retorna imagem base64
                onFileRead(reader.result);
            } else {
                try {
                    const json = JSON.parse(reader.result);
                    console.log('Arquivo JSON lido com sucesso:', json);
                    onFileRead(json);
                } catch (error) {
                    console.error('Erro ao ler o JSON:', error);
                    onFileRead(null);
                }
            }
        };

        // CHAMA SOMENTE UMA das duas opções:
        if (file.type.startsWith("image/")) {
            reader.readAsDataURL(file); // imagem em base64
        } else {
            reader.readAsText(file); // texto para JSON
        }
    }, [onFileRead]);


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
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
