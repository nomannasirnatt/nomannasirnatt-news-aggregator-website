import { FC } from 'react';
import { Link } from '@/navigation';

const Menu: FC = () => {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
    </ul>
  );
};

export default Menu;
