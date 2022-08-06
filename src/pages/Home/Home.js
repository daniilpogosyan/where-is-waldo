import {
  useEffect,
  useState
 } from 'react';
import { getIcons } from '../../data/firestore';


import IconsList from './components/IconsList';


export default function Home(props) {
  const [icons, setIcons] = useState(null);

  useEffect(() => {
    getIcons()
    .then((icons) => {
      setIcons(icons);
    })
  }, []);

  return (
    <div>
      <IconsList icons={icons} />
    </div>
  )
}
