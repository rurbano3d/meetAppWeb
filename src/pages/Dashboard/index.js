import React, { useState, useEffect } from 'react';
import { MdChevronRight, MdAddCircleOutline } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Container, Item } from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function Dashboard() {
  const [meetUps, setMeetUps] = useState([]);

  useEffect(() => {
    async function loadMeetUps() {
      const response = await api.get('organizing');

      const data = response.data.map(meetUp => ({
        ...meetUp,
        formatedDate: format(parseISO(meetUp.date), "d 'de' MMMM', às' HH:mm", {
          locale: pt,
        }),
      }));

      setMeetUps(data);
    }
    loadMeetUps();
  }, []);

  function handleNew() {
    history.push('/meetup');
  }

  function handleDetails(meetup) {
    history.push('/details', { meetup });
  }

  return (
    <Container>
      <header>
        <strong>Meus meetups</strong>
        <button type="button" onClick={handleNew}>
          <div>
            <MdAddCircleOutline />
            Novo meetup
          </div>
        </button>
      </header>

      <ul>
        {meetUps.map(meetup => (
          <Item key={meetup.id}>
            <strong>{meetup.title}</strong>
            <div>
              <span>{meetup.formatedDate}</span>
              <MdChevronRight size={26} onClick={() => handleDetails(meetup)} />
            </div>
          </Item>
        ))}
      </ul>
    </Container>
  );
}
