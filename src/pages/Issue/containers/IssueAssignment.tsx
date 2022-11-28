import { FC, useState } from 'react';
import { GoGear } from 'react-icons/go';
import { Issue } from 'enities/Issue.entity';
import { User } from 'enities/User.entity';
import { useUsers } from 'hooks/UseUsers/useUsers';

type TProps = {
  onClick: (id: User['id']) => void;
  user: Issue['assignee'];
};

export const IssueAssignment: FC<TProps> = ({ onClick, user }) => {
  const { data } = useUsers();
  const [open, setOpen] = useState<boolean>(false);

  const handleSelect = (id: User['id']) => () => {
    setOpen(!open);
    onClick(id);
  };

  const renderUser = () => {
    if (!user) {
      return <div>No assigment</div>;
    }

    return (
      <div>
        <img src={user.profilePictureUrl} alt='User img' />
        {user.name}
      </div>
    );
  };

  return (
    <div className='issue-options'>
      <div>
        <span>Assigment</span>
        {renderUser()}
      </div>
      <GoGear onClick={() => setOpen(!open)} />
      {open && data?.size && (
        <div className='picker-menu'>
          {Array.from(data?.values() || []).map((user) => (
            <div key={user.id} onClick={handleSelect(user.id)}>
              <img src={user.profilePictureUrl} alt='User img' />
              {user.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
