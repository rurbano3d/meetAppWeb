import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import ImageInput from '~/components/ImageInput';
import DateTimePickerInput from '~/components/DateTimePickerInput';

import { Container } from './styles';

import history from '~/services/history';
import api from '~/services/api';

const schema = Yup.object().shape({
  banner_id: Yup.number().required('A Imagem do Banner é obrigatória'),
  title: Yup.string().required('O título é obrigatório'),
  description: Yup.string().required('A descrição é obrigatória'),
  location: Yup.string().required('A localização é obrigatória'),
  date: Yup.date()
    .min(new Date(), 'Não é possível selecionar datas passadas')
    .required('A Data do Meetup é obrigatória')
    .typeError('Informe uma Data válida'),
});

export default function Meetup() {
  const [meetup, setMeetup] = useState({});
  const [banner, setBanner] = useState({});
  const response = history.location.state;

  useEffect(() => {
    if (response) {
      setMeetup(response.meetup);
      setBanner(response.meetup.File);
    }
  }, []);// eslint-disable-line



  async function handleSubmit(data) {
    if (meetup.id) {
      try {
        await api.put(`meetups/${meetup.id}`, data);
        toast.success('Editado com sucesso!');
        history.push('/');
      } catch (err) {
        toast.error('Não foi possível editar o seu meetup!');
      }
    } else {
      try {
        await api.post('meetups', data);
        toast.success('Salvo com sucesso!');
        history.push('/');
      } catch (err) {
        toast.error('Não foi possível salvar o seu meetup!');
      }
    }
  }

  return (
    <Container>
      <Form schema={schema} initialData={meetup} onSubmit={handleSubmit}>
        <ImageInput name="banner_id" imageFromData={banner} />
        <Input name="title" placeholder="Título do Meetup" />
        <Input multiline name="description" placeholder="Descrição completa" />
        <DateTimePickerInput
          name="date"
          placeholder="Data do meetup"
          value={meetup.date}
        />
        <Input name="location" placeholder="Localização" />
        <button type="submit">Salvar meetup</button>
      </Form>
    </Container>
  );
}
