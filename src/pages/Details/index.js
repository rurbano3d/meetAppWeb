import React from 'react';
import { MdEdit, MdDeleteForever, MdRoom, MdEvent } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Container, EditButton, CancelButton } from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function Details() {
  const { meetup } = history.location.state;

  function handleEdit(data) {
    history.push('/meetup', { data });
  }

  async function handleCancel(id) {
    console.tron.log(id);
    try {
      await api.delete(`meetups/${id}`);
      toast.success('Meetup cancelado com sucesso!');
      history.push('/dashboard');
    } catch (err) {
      let error = '';
      switch (err.response.data.error) {
        case 'User not authorized.':
          error = 'Sem autorização!';
          break;

        case "Can't delete past meetups.":
          error = 'não pode cancelar meetups passados!';
          break;
        default:
          error = 'contate o suporte!';
      }

      toast.error(`Não foi possível cancelar o seu meetup, ${error}`);
      toast.error('Erro ao cancelar o Meetup!');
    }
  }
  return (
    <Container>
      <header>
        <strong>{meetup.title}</strong>
        <aside>
          <EditButton type="button" onClick={() => handleEdit(meetup)}>
            <MdEdit />
            Editar
          </EditButton>
          <CancelButton type="button" onClick={() => handleCancel(meetup.id)}>
            <MdDeleteForever />
            Cancelar
          </CancelButton>
        </aside>
      </header>
      <div>
        <img src={meetup.File.url} alt={meetup.title} />
        <p>{meetup.description}</p>
        <div>
          <MdEvent size={16} />
          <span> {meetup.formatedDate}</span>
          <MdRoom size={16} />
          <span> {meetup.location}</span>
        </div>
      </div>
    </Container>
  );
}
