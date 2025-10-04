import { Link } from 'react-router-dom';

import { type Person } from '../../types/Person';

type Props = {
  slug: Person['slug'];
  children: React.ReactNode;
  classNames?: string;
};

export const PersonLink: React.FC<Props> = ({ slug, children, classNames }) => {
  return (
    <Link to={slug} className={classNames}>
      {children}
    </Link>
  );
};
