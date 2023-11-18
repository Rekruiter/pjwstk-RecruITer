import { useContext } from 'react';
import AuthContext from '../../context/auth-context';

const UserPanelPage = () => {
  const { name } = useContext(AuthContext);

  return (
    <div className="flex-grow bg-light flex flex-col p-6 gap-10">
      <h3 className="text-3xl text-dark">Hello {name}</h3>
      <div className="min-h-[10rem] max-h-[20rem] bg-light_blue rounded-lg p-2">
        <p></p>
      </div>
    </div>
  );
};

export default UserPanelPage;
