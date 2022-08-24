import { Box } from '@chakra-ui/react';
import Dropzone from 'react-dropzone';
import { Control, Controller, Path } from 'react-hook-form';

interface CustomDropzone2Props<T> {
  c: Control<T>;
  name: Path<T>;
}

export function CustomDropzone2<T>({ c, name }: CustomDropzone2Props<T>) {
  return (
    <Controller
      control={c}
      name={name}
      rules={{
        required: { value: true, message: 'This field is required' },
      }}
      render={({ field: { onChange, onBlur, ref }, fieldState }) => (
        <Box
          w="full"
          borderWidth="1px"
          borderColor="gray"
          borderStyle="dashed"
          backgroundColor="white"
          p="4"
          textAlign="center"
        >
          <Dropzone
            noClick
            ref={ref}
            onDrop={(acceptedFiles) => {
              acceptedFiles.forEach((file) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onabort = () => console.log('file reading was aborted');
                reader.onerror = () => console.log('file reading has failed');
                reader.onload = () => {
                  onChange(reader.result)
                };
              });
            }}
          >
            {({ getRootProps, getInputProps, open, isDragActive, acceptedFiles }) => (
              <div>
                <div
                  style={{
                    borderStyle: 'dashed',
                    backgroundColor: isDragActive ? `#808080` : 'transparent',
                  }}
                  {...getRootProps()}
                >
                  <input
                    {...getInputProps({
                      id: 'spreadsheet',
                      // onChange,
                      onBlur,
                    })}
                    ref={ref}
                  />

                  <p>
                    <button type="button" onClick={open}>
                      Choose a file
                    </button>{' '}
                    or drag and drop
                  </p>

                  {acceptedFiles.length ? acceptedFiles[0].name : 'No file selected.'}

                  <div>
                    {fieldState.error && <span role="alert">{fieldState.error.message}</span>}
                  </div>
                </div>
              </div>
            )}
          </Dropzone>
        </Box>
      )}
    />
  );
}
