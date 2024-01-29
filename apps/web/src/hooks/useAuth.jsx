import { SessionContext } from '@/provider/SessionProvider';
import { useContext } from 'react';

export default function useAuth() {
  return useContext(SessionContext);
}
