import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import { MdAddAPhoto } from 'react-icons/md';
import api from '~/services/api';

import { Container } from './styles';

export default function ImageInput({ name }) {
  const { defaultValue, registerField } = useField('File');
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const ref = useRef();
  console.tron.log(file);
  useEffect(() => {
    if (ref.current) {
      registerField({
        name,
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  },[ref.current]);// eslint-disable-line



  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="image">
        {preview ? (
          <img src={preview} alt="" />
        ) : (
          <div>
            <div>
              <MdAddAPhoto size={40} color="#999" />
              <strong>Selecionar Imagem</strong>
            </div>
          </div>
        )}
        <input
          type="file"
          id="image"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
ImageInput.propTypes = {
  name: PropTypes.string.isRequired,
};
