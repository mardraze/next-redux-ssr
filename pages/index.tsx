import {selectNick } from '@/lib/features/me/meSlice'
import { getGlobalServerSideProps } from '@/lib/serverSideProps';
import { useSelector } from 'react-redux';

export const getServerSideProps = getGlobalServerSideProps;

export default function Page() {

  const nick = useSelector(selectNick);

  return (
    <main>
      <div>Hello {nick}</div>
    </main>
  )
}

