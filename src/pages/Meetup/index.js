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
      setMeetup(response.data);
      setBanner(response.data.File);
    }
  }, []);// eslint-disable-line



  async function handleSubmit(data) {
    if (meetup.id) {
      try {
        await api.put(`meetups/${meetup.id}`, data);
        toast.success('Editado com sucesso!');
        history.push('/');
      } catch (err) {
        let error = '';
        switch (err.response.data.error) {
          case 'Validation fails':
            error = 'Dados incorretos!';
            break;
          case 'User not authorized.':
            error = 'Sem autorização!';
            break;
          case 'Meetup date invalid':
            error = 'Data inválida!';
            break;
          case "Can't update past meetups.":
            error = 'não pode atualizar meetups passados!';
            break;
          default:
            error = 'contate o suporte!';
        }

        toast.error(`Não foi possível editar o seu meetup, ${error}`);
      }
    } else {
      try {
        await api.post('meetups', data);
        toast.success('Salvo com sucesso!');
        history.push('/');
      } catch (err) {
        let error = '';
        switch (err.response.data.error) {
          case 'Validation fails':
            error = 'Dados incorretos!';
            break;
          case 'Past dates are not permitted.':
            error = 'não é permitido salvar com datas passadas!';
            break;

          default:
            error = 'contate o suporte!';
        }

        toast.error(`Não foi possível salvar o seu meetup, ${error}`);
      }
    }
  }

  return (
    <Container>
      <Form schema={schema} initialData={meetup} onSubmit={handleSubmit}>
        <ImageInput name="banner_id" />
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
